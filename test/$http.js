import { createApi } from 'kuan-request'

export default createApi({
  // 默认配置
  createOptions: {
    baseURL: 'https://www.luzhongkuan.cn',
    withCredentials: false,
  },
  // 错误处理
  handleError: (status, msg, error) => {
    console.log(status, msg, error)
  },
})
