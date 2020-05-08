const path   = require('path');
const merge  = require('webpack-merge');
const common = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "build")
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "src/index.html"),
      chunks: [ "main" ]
    }),
    new HtmlWebpackPlugin({
      filename: "readme/index.html",
      template: path.resolve(__dirname, "src/readme/index.html"),
      chunks: [ "readme" ] // more chunks can be added. Chunk name is same as keys in entrypoint.
    })
    // new HtmlWebpackPlugin for each html file.
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ "style-loader", "css-loader" ]
      },
      {
        test: /\.s[ac]ss$/,
        use: [ "style-loader", "css-loader", "sass-loader" ]
      },
      {
        test: /\.(svg|png|jpg|gif|jpeg)$/,
        use: ["file-loader"]
      }
    ]
  }
});
