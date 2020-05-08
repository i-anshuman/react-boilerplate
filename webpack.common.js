const path = require('path');

module.exports = {
  devtool: "source-map",
  entry: {
    main: path.resolve(__dirname, "src/"),
    readme: path.resolve(__dirname, "src/readme/"),
    // more entry points here
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel-loader"
      }
    ]
  }
};
