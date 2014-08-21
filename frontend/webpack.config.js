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
      { test: /\.css$/, loader: "style!css" },
      { test: /\.less$/, loader: "style!css!less" },
      { test: /\.jsx$/, loaders: ["react-hot", "jsx"] },
      { test: /\.json$/, loader: "json" },
      { test: /\.woff$/,   loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.ttf$/,    loader: "file-loader" },
      { test: /\.eot$/,    loader: "file-loader" },
      { test: /\.svg$/,    loader: "file-loader" }
    ]
  }
};
