'use strict'
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

module.exports = {
  loaders: {
    css: ['vue-style-loader', cssLoader, postcssLoader],
    sass: ['vue-style-loader', cssLoader, postcssLoader, 'sass-loader']
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
