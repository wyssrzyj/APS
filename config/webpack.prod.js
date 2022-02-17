/* eslint-disable */
const common = require('./webpack.common.js')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
require('@babel/polyfill')
const path = require('path')
const loaderUtils = require('loader-utils')
// const BundleAnalyzerPlugin =
//   require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const { getCSSModuleLocalIdent } = require('./getCSSModuleLocalIdent.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin') // 对js进行压缩
const webpackbar = require('webpackbar')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin') // 对CSS进行压缩
const CompressionPlugin = require('compression-webpack-plugin')
const HappyPack = require('happypack')

function getCSSModuleLocalIdent(context, localIdentName, localName, options) {
  // Use the filename or folder name, based on some uses the index.js / index.module.(css|scss|sass) project style
  const fileNameOrFolder = context.resourcePath.match(
    /index\.module\.(css|scss|sass|less)$/
  )
    ? '[folder]'
    : '[name]'
  // Create a hash based on a the file location and class name. Will be unique across a project, and close to globally unique.
  const hash = loaderUtils.getHashDigest(
    path.posix.relative(context.rootContext, context.resourcePath) + localName,
    'md5',
    'base64',
    5
  )
  // Use loaderUtils to find the file or folder name
  const className = loaderUtils.interpolateName(
    context,
    `${fileNameOrFolder}_${localName}__${hash}`,
    options
  )
  // remove the .module that appears in every classname when based on the file.
  return className.replace('.module_', '_')
}

const config = merge(common, {
  mode: 'production',
  stats: {
    children: true // false 不输出子模块的打包信息
  },
  // devtool: 'hidden-source-map',
  devtool: false,
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.module\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
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
        test: /\.less$/,
        exclude: /\.module\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
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
        test: /\.module\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
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
  plugins: [
    new CleanWebpackPlugin(),
    new webpackbar(), // 打包时美化进度条
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash:8].css', // 生成的文件名
      chunkFilename: 'css/[id].[hash].css',
      ignoreOrder: true
    }),
    // new BundleAnalyzerPlugin({
    //   analyzerMode: "disable", // 不启用展示打包报告的web服务器
    //   generateStatsFile: true // 生成报告文件
    // }),
    // new CompressionPlugin(),
    new HappyPack({
      //用id来标识 happypack处理那里类文件
      id: 'babelid',
      //配置 babel-loader
      loaders: [
        {
          loader: 'babel-loader'
        }
      ],
      verbose: true
    })
  ],
  optimization: {
    sideEffects: true, // 处理副作用 代码(检查package.json文件)
    usedExports: true, // 开启 tree-shaking
    concatenateModules: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true, // 多线程并行构建
        terserOptions: {
          // https://github.com/terser/terser#minify-options
          compress: {
            warnings: false, // 删除无用代码时是否给出警告
            drop_debugger: true // 删除所有的debugger
            // drop_console: true, // 删除所有的console.*
            // pure_funcs: ["console.log"], // 删除所有的console.log
          }
        }
      }),
      new CssMinimizerPlugin()
    ],
    moduleIds: 'deterministic',
    chunkIds: 'deterministic',
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '-',
      minSize: 0,
      minRemainingSize: 0,
      hidePathInfo: true,
      maxSize: 50000,
      minChunks: 2,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`
    }
  }
})

module.exports = config
