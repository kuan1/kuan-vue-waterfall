const path = require('path')

const isDev = process.env.NODE_ENV === 'development'

const resolve = (dir) => path.resolve(__dirname, dir)

const testEntry = path.resolve(__dirname, 'test/index.js')
const srcEntry = path.resolve(__dirname, 'src/index.js')

const demoConfig = {
  publicPath: isDev ? '/' : `/kuan-vue-waterfall/demo/`, // public path
  outputDir: resolve('demo'), // 输入地址
  devServer: {
    proxy: 'https://www.luzhongkuan.cn',
    disableHostCheck: true,
  },
  configureWebpack: {
    entry: {
      app: testEntry,
    },
  },
  chainWebpack(config) {
    config.resolve.alias.set('kuan-vue-waterfall', path.resolve(__dirname, 'src'))
  }
}

const libConfig = {
  outputDir: resolve('lib'), // 输入地址
  css: {
    extract: false,
  },
  configureWebpack: {
    externals: {
      vue: { commonjs: 'vue', commonjs2: 'vue', root: 'Vue' },
    },
    entry: {
      app: srcEntry,
    },
  },
  productionSourceMap: false,
}

const testConfig = {
  publicPath: '/', // public path
  configureWebpack: {
    entry: {
      app: testEntry,
    },
  },
  chainWebpack(config) {
    config.resolve.alias.set('kuan-vue-waterfall', path.resolve(__dirname, 'src'))
  }
}

const configMap = {
  test: testConfig,
  demo: demoConfig
}

const config = configMap[process.env.BUILD_TARGET] || libConfig

module.exports = config
