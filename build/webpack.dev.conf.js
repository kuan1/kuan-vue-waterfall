const path = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');

const common = require('./webpack.base.conf.js');

function resolve(dir) {
  return path.join(__dirname, '../', dir);
}

module.exports = merge(common, {
  mode: 'development',
  plugins: [
    new CopyWebpackPlugin([
      {
        from: resolve('static'),
        to: 'static',
        ignore: ['.*'],
      },
    ]),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: true,
      favicon: resolve('static/favicon.ico'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        minifyJS: true,
        minifyCSS: true,
      },
      chunksSortMode: 'dependency',
    })
  ],
  devServer: {
    // hot: true,
    // inline: true,
    // contentBase: [path.join(__dirname, '../public'),],
    port: process.env.PORT || 8088,
    publicPath: '/',
    host: '0.0.0.0',
    openPage: '',
    useLocalIp: true,
    historyApiFallback: false,
    noInfo: false,
    stats: 'minimal',
    open: true
  },
});
