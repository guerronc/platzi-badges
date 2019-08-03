const path = require("path");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const addAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
  entry: {
    add: path.resolve(__dirname, "src/index.js")
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js",
    publicPath: 'http://localhost:3001/',
    chunkFilename: 'js/[id].[chunkhash].js'
  },
  module: {
    rules: [
      {
        //que tipo de archivo quiero que interprete
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCSSExtractPlugin.loader
          },
          "css-loader"
        ]
      },
      {
        test: /\.jpg|png|gif|woff|eot|ttf|svg|mp4|webm$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1000,
          }
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname,'public/index.html')
    }),
    new MiniCSSExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: 'css/[id].css'
    }),
    new webpack.DllReferencePlugin({
      manifest: require('./modules-manifest.json')
    }),
    new addAssetHtmlPlugin({
      filepath: path.resolve(__dirname,'dist/js/*.dll.js'),
      outputPath: 'js',
      publicPath: 'http://localhost:3001/js'
    })
  ]
};
