const path = require('path')
const base = require('./webpack.base.conf')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const config = merge(base, {
  context: path.resolve(__dirname, '../'),
  entry: './src/waterFall',
  output: {
    path: path.resolve(__dirname, '../', 'lib'),
    filename: 'kuan-vue-waterfall.min.js',
    library: 'waterfall',
    libraryTarget: 'umd'
  },
  plugins: [
    new CleanWebpackPlugin(['lib'], {root: path.resolve(__dirname, '..')})
    // ,
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: '"production"'
    //   }
    // })
  ]
})

module.exports = config
