const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./my/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "build")
  },
  devServer: {
    contentBase: "./build"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./my/index.html"
    })
  ]
}