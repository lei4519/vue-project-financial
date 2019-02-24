const path = require('path')
const resolve = file => path.resolve(__dirname, file)
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
let isDev = process.env.NODE_ENV === 'development'
const HtmlWebpackPlugin = require('html-webpack-plugin')
let config = {}
const entry = [
  resolve('../src/viewport.js'),
  resolve('../src/client-entry.js')
]
let defaultPlugin = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': isDev ? '"development"' : '"production"',
    'process.env.VUE_ENV': '"client"'
  }),
  new VueSSRClientPlugin()
]

if (isDev) {
  config = merge(base, {
    entry,
    output: {
      path: resolve('../dist'),
      publicPath: '/',
      filename: '[name].[hash].js'
    },
    devServer: {
      historyApiFallback: true,
      clientLogLevel: "error",
      hot: true,
      open: true,
      port: 3000,
      overlay: true
    },
    plugins: defaultPlugin.concat([
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: resolve('../src/index.template.html')
      })
    ])
  })
} else {
  config = merge(base, {
    entry,
    plugins: defaultPlugin,
    optimization: {
      splitChunks: {
        chunks: 'initial',
        cacheGroups: {
          verdor: {
            name: 'vendor',
            test: function (module) {
              return (
                /node_modules/.test(module.context) &&
                !/\.css$/.test(module.request)
              )
            }
          }
        }
      },
      runtimeChunk: true
    }
  })
}

module.exports = config