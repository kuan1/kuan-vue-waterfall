'use strict'
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const cssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: false
  }
}
const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: false
  }
}

const styleLoader = process.env.NODE_ENV === 'production' ? 'vue-style-loader' : MiniCssExtractPlugin.loader

module.exports = {
  loaders: {
    css: [styleLoader, cssLoader, postcssLoader],
    sass: [styleLoader, cssLoader, postcssLoader, 'sass-loader']
  },
  cssSourceMap: false,
  cacheBusting: true,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
