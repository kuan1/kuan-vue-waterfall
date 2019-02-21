import { createApi } from 'kuan-request'

export default createApi({
  // 默认配置
  createOptions: {
    baseURL: '//api.luzhongkuan.cn',
    // baseURL: isDev ? 'http://localhost:8002' : '//api.luzhongkuan.cn',
    withCredentials: true
  },
  // 错误处理
  handleError: (status, msg, error) => {
    console.log(status, msg, error)
  }
})
