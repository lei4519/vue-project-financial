const fs = require('fs')
const path = require('path')
const {createBundleRenderer} = require('vue-server-renderer')
const LRU = require('lru-cache')
const resolve = file => path.resolve(__dirname, file)
const serverRender = require('./server-render')
const templatePath = resolve('../../src/index.template.html')

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

const bundle = require('../../dist/vue-ssr-server-bundle.json')
const template = fs.readFileSync(templatePath, 'utf-8')
const clientManifest = require('../../dist/vue-ssr-client-manifest.json')
const renderer = createRenderer(bundle, {
  template,
  clientManifest
})

module.exports = (req, res) => {
  serverRender(req, res, renderer)
}
