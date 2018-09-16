const path = require('path');
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
  return path.join(__dirname, '../', dir);
}

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  module: {
    rules: [
      {test:/.vue$/, loader:'vue-loader', options: vueLoaderConfig},
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'images/[name].[ext]?[hash]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[ext]?[hash]',
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
  },
  plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        name: JSON.stringify(process.env.npm_package_name)
      }
    })
  ],
};
