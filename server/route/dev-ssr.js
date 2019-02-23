const fs = require('fs')
const path = require('path')
const MFS = require('memory-fs')
const {createBundleRenderer} = require('vue-server-renderer')
const LRU = require('lru-cache')
const webpack = require('webpack')
const chokidar = require('chokidar')
const clientConfig = require('./webpack.client.config')
const serverConfig = require('./webpack.server.config')
const resolve = file => path.resolve(__dirname, file)
const templatePath = resolve('../../src/index.template.html')
const serverRender = require('./server-render')

const readFile = (fs, file) => {
  try {
    return fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8')
  } catch (e) {
    throw e
  }
}

function devServer (app, cb) {
  let bundle
  let template
  let clientManifest

  let ready
  const readyPromise = new Promise(r => { ready = r })

  const update = () => {
    if (bundle && clientManifest) {
      ready()
      cb(bundle, {
        template,
        clientManifest
      })
    }
  }

  template = fs.readFileSync(templatePath, 'utf-8')
  chokidar.watch(templatePath).on('change', () => {
    template = fs.readFileSync(templatePath, 'utf-8')
    console.log('index.html template updated.')
    update()
  })

  clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app]
  clientConfig.output.filename = '[name].js'
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )

  const clientCompiler = webpack(clientConfig)
  const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    noInfo: true
  })
  app.use(devMiddleware)
  clientCompiler.plugin('done', stats => {
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(err => console.warn(err))
    if (stats.errors.length) return
    clientManifest = JSON.parse(readFile(
      devMiddleware.fileSystem,
      'vue-ssr-client-manifest.json'
    ))
    update()
  })

  app.use(require('webpack-hot-middleware')(clientCompiler, { heartbeat: 5000 }))

  const serverCompiler = webpack(serverConfig)
  const mfs = new MFS()
  serverCompiler.outputFileSystem = mfs
  serverCompiler.watch({}, (err, stats) => {
    if (err) throw err
    stats = stats.toJson()
    if (stats.errors.length) return

    bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'))
    update()
  })

  return readyPromise
}

const createRenderer = (bundle, options) => {
  return createBundleRenderer(bundle, Object.assign(options, {
    cache: new LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    basedir: resolve('./dist'),
    runInNewContext: false
  }))
}

let renderer
module.exports = async (app) => {
  let promise = devServer(app, (bundle, options) => {
    renderer = createRenderer(bundle, options)
  })
  return (req, res) => {
    promise.then(() => serverRender(req, res, renderer))
  }
}