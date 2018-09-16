const path = require('path')
const base = require('./webpack.base.conf')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const libName = 'kuan-vue-waterfall'

const resolve = (dir) => path.resolve(__dirname, '..', dir)

const config = merge(base, {
  entry: resolve('src/waterFall'),
  output: {
    path: resolve('lib'),
    filename: `${libName}.js`,
    library: libName,
    libraryTarget: 'commonjs2'
  },
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin(),
      new UglifyJsPlugin({
        uglifyOptions: {
          parallel: true,
          warnings: false,
          compress: {
            drop_console: true,
          }
        }
      })
    ]
  },
  externals: [nodeExternals()],
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${libName}.css`,
    }),
    new CleanWebpackPlugin(['lib'], {root: path.resolve(__dirname, '..')})
    // ,
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: '"production"',
    // process.env.npm_package_name
    //   }
    // })
  ]
})

module.exports = config
