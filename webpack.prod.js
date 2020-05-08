const path   = require('path');
const merge  = require('webpack-merge');
const common = require('./webpack.common');
const HtmlWebpackPlugin      = require('html-webpack-plugin');
const MiniCssExtractPlugin   = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserWebpackPlugin    = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "assets/js/[name].[contentHash:5].js",
    path: path.resolve(__dirname, "build")
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin()
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "assets/css/[name].[contentHash:5].css"
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "src/index.html"),
      hash: true,
      chunks: [ "main" ],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    new HtmlWebpackPlugin({
      filename: "readme/index.html",
      template: path.resolve(__dirname, "src/readme/index.html"),
      hash: true,
      chunks: [ "readme" ], // more chunks can be added. Chunk name is same as keys in entrypoint.
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    })
    // new HtmlWebpackPlugin for each html file.
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ MiniCssExtractPlugin.loader, "css-loader" ]
      },
      {
        test: /\.s[ac]ss$/,
        use: [ MiniCssExtractPlugin.loader, "css-loader", "sass-loader" ]
      },
      {
        test: /\.(svg|png|jpg|gif|jpeg)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash:5].[ext]",
            outputPath: "assets/images"
          }
        }
      }
    ]
  }
});
