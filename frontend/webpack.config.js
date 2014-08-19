var webpack = require("webpack");

module.exports = {
  entry: [
    "webpack-dev-server/client?http://localhost:8089",
    "webpack/hot/dev-server",
    "./app/app.jsx"
  ],
  // Hot Module Replacement not working https://github.com/webpack/webpack/issues/406
  output: {
    path: __dirname + "/app",
    filename: "bundle.js"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.less$/, loader: "style!css!less" },
      { test: /\.jsx$/, loaders: ["react-hot", "jsx"] },
      { test: /\.json$/, loader: "json" }
    ]
  }
};
