const path   = require('path');
const merge  = require('webpack-merge');
const common = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-source-map',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'public/index.html'),
      chunks: [ 'main' ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader', 
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]--[hash:base64:5]'
              }
            }
          }
        ]
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]--[hash:base64:5]'
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(ico|svg|png|gif|jpe?g)$/,
        use: [ 'file-loader' ]
      }
    ]
  },
  stats: 'errors-warnings',
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    clientLogLevel: 'trace',
    watchContentBase: true,
    hot: true,
    publicPath: '/',
    port: 9000,
    overlay: {
      warnings: false,
      errors: true
    }
  }
});
