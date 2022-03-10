/* eslint-disable */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
require('@babel/polyfill')
const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const webpack = require('webpack')
const ip = require('ip')
const Dotenv = require('dotenv-webpack')

const { NODE_ENV } = process.env

const port = 8005

const hosts = new Map()
hosts.set('development', 'http://192.168.69.88:8000')
hosts.set('test', 'http://8.136.225.110:8888/')
hosts.set('production', 'http://47.97.217.13:8888/')

module.exports = {
  entry: ['@babel/polyfill', path.resolve(__dirname, '../src/main.tsx')],
  // entry: {
  //   main: path.resolve(__dirname, '../src/index.tsx')
  // },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[chunkhash:6].bundle.js',
    publicPath: '/',
    assetModuleFilename: 'images/[hash:6][ext][query]'
  },
  plugins: [
    new Dotenv({
      ignorSub: true
    }),
    new friendlyErrorsWebpackPlugin(),
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: '初始项目',
      template: path.resolve(__dirname, '../index.html'),
      filename: 'index.html'
      // favicon: path.resolve(__dirname, '../src/assets/favicon.ico'),
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  ],
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader?cacheDirectory=true']
      },
      {
        test: /.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        exclude: /node_modules/,
        type: 'asset/resource'
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
        exclude: /node_modules/,
        type: 'asset/inline'
      }
    ]
  },
  performance: {
    maxEntrypointSize: 1000000
  },
  devServer: {
    publicPath: '/',
    writeToDisk: false, // 将打包目录写入到硬盘 false为内存
    historyApiFallback: true, // 404 重定向到index.html
    contentBase: path.resolve(__dirname, '../dist'), // 指定静态资源的根目录
    open: true, // 打开浏览器
    compress: true, // 压缩
    hot: true, // 热更新
    port: port, // 端口号
    host: 'dev.uchat.com.cn',
    allowedHosts: [
      'localhost',
      ip.address(),
      '0.0.0.0',
      '127.0.0.1',
      'dev.uchat.com.cn'
    ],
    proxy: {
      '/aps': hosts.get(NODE_ENV),
      '/baiduApi': {
        target: 'https://aip.baidubce.com', //访问地址
        changeOrigin: true,
        secure: false, //只有代理https 地址需要次选项
        pathRewrite: {
          '^/baiduApi': ''
        }
      }
      // '/api': 'http://192.168.83.108:8888'
    }
  },
  externals: {
    // react: "React",
    // "react-dom": "ReactDOM",
    // "react-router": "ReactRouter",
    // "react-router-dom": "ReactRouterDOM",
    // antd: "antd",
  },
  node: {},
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'], // 这几个后缀名的文件后缀可以省略不写
    alias: {
      '@': path.join(__dirname, '../src'), // 这样 @就表示根目录src这个路径
      process: 'process/browser'
    },
    fallback: {
      assert: require.resolve('assert/')
    }
  }
}
