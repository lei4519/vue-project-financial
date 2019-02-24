const path = require('path')
const resolve = file => path.resolve(__dirname, file)
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(base, {
  target: 'node',
  devtool: '#source-map',
  entry: resolve('../src/server-entry.js'),
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  externals: nodeExternals({
    whitelist: [/\.css$/, /.scss$/]
  }),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueSSRServerPlugin()
  ]
})
