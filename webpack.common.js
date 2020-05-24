const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/')
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: 'public' }]
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [ 'html-loader' ]
      },
      { 
        test: /\.js(x)?$/, 
        exclude: /node_modules/, 
        use: [
          'babel-loader', 
          {
            loader: 'eslint-loader',
            options: {
              emitError: true,
              emitWarning: true,
              failOnError: true,
              failOnWarning: false
            }
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false,
    },
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`
    },
  }
};
