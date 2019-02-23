const path = require('path')
const resolve = file => path.resolve(__dirname, file)
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const merge = require('webpack-merge')

const isProd = process.env.NODE_ENV === 'production'

let config = {
  mode: isProd ? 'production' : 'development',
  devtool: isProd
    ? false
    : '#cheap-module-source-map',
  output: {
    path: resolve('../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
  performance: {
    hints: false
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      { test: /\.vue$/, loader: "vue-loader" },
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  resolve: {
    modules:[path.resolve(__dirname, '../node_modules')],
    extensions: [".vue", ".js", ".scss"],
    alias: {
      vue: path.resolve(__dirname, '../node_modules/vue/dist/vue.esm.js'),
      core: path.resolve(__dirname, '../src/core'),
      style: path.resolve(__dirname, '../src/style'),
      components: path.resolve(__dirname, '../src/components'),
      views: path.resolve(__dirname, '../src/views'),
      common: path.resolve(__dirname, '../src/common')
    }
  }
}

if (isProd) {
  config = merge(config, {
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {warnings: false}
          }
        })
      ]
    },
    plugins: [
      new webpack.optimize.ModuleConcatenationPlugin(),
      new MiniCssExtractPlugin({
        filename: "[name]-[hash:8].css"
      })
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          oneOf: [
            {
              resourceQuery: /module/,
              use: [
                MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: {
                    modules: true,
                    localIdentName: '[path][name]---[local]---[hash:base64:5]'
                  }
                },
                {
                  loader: 'px2rem-loader',
                  options: {
                    remUnit: 40,
                    remPrecision: 8
                  }
                }
              ]
            },
            {
              use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                {
                  loader: 'px2rem-loader',
                  options: {
                    remUnit: 40,
                    remPrecision: 8
                  }
                }
              ]
            }
          ]
        },
        { 
          test: /\.scss$/, 
          oneOf: [
            {
              resourceQuery: /module/,
              use: [
                MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: {
                    modules: true,
                    localIdentName: '[path][name]---[local]---[hash:base64:5]'
                  }
                },
                {
                  loader: 'px2rem-loader',
                  options: {
                    remUnit: 40,
                    remPrecision: 8
                  }
                },
                'sass-loader'
              ]
            },
            {
              use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                {
                  loader: 'px2rem-loader',
                  options: {
                    remUnit: 40,
                    remPrecision: 8
                  }
                },
                'sass-loader'
              ]
            }
          ]
        }
      ]
    }
  })
} else {
  config = merge(config, {
    plugins: [
      new FriendlyErrorsPlugin()
    ],
    module: { 
      rules: [
        {
          test: /\.css$/,
          oneOf: [
            {
              resourceQuery: /module/,
              use: [
                'vue-style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    modules: true,
                    localIdentName: '[path][name]---[local]---[hash:base64:5]'
                  }
                },
                {
                  loader: 'px2rem-loader',
                  options: {
                    remUnit: 40,
                    remPrecision: 8
                  }
                }
              ]
            },
            {
              use: [
                'vue-style-loader',
                'css-loader',
                {
                  loader: 'px2rem-loader',
                  options: {
                    remUnit: 40,
                    remPrecision: 8
                  }
                }
              ]
            }
          ]
        },
        { 
          test: /\.scss$/, 
          oneOf: [
            {
              resourceQuery: /module/,
              use: [
                'vue-style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    modules: true,
                    localIdentName: '[path][name]---[local]---[hash:base64:5]'
                  }
                },
                {
                  loader: 'px2rem-loader',
                  options: {
                    remUnit: 40,
                    remPrecision: 8
                  }
                },
                'sass-loader'
              ]
            },
            {
              use: [
                'vue-style-loader',
                'css-loader',
                {
                  loader: 'px2rem-loader',
                  options: {
                    remUnit: 40,
                    remPrecision: 8
                  }
                },
                'sass-loader'
              ]
            }
          ]
        }
      ]
    }
  })
}

module.exports = config