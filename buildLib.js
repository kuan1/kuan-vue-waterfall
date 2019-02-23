const path = require('path')
const { buildLib } = require('kuan-pack-vue')

buildLib({
  entry: path.resolve(__dirname, 'src'),
  distPath: path.resolve(__dirname, 'lib')
})
