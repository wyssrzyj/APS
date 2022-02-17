/* eslint-disable */
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
require('@babel/polyfill')
const getCSSModuleLocalIdent = require('./getCSSModuleLocalIdent.js')

const cssRegex = /\.css$/
const cssModuleRegex = /\.module\.css$/
const lessRegex = /\.less$/
const lessModuleRegex = /\.module\.less$/

const config = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  target: 'web',
  module: {
    rules: [
      {
        test: cssRegex,
        exclude: cssModuleRegex,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: cssModuleRegex,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: {
                // localIdentName: '[name]_[local]_[hash:base64:5]',
                getLocalIdent: getCSSModuleLocalIdent
              }
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: lessRegex,
        exclude: lessModuleRegex,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 3,
              sourceMap: true
            }
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {
        test: lessModuleRegex,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 3,
              sourceMap: true,
              modules: {
                // localIdentName: '[name]_[local]_[hash:base64:5]',
                getLocalIdent: getCSSModuleLocalIdent
              }
            }
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [],
  optimization: {
    usedExports: true
  }
})

module.exports = config
