import axios from 'axios'
import { storage, sessionStorage } from '@/utils/storage'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5000, // 设置超时时间
  headers: { 'Content-Type': 'application/json; charset=utf-8' }
})

// http请求拦截器
service.interceptors.request.use(
  config => {
    config.headers.Authorization = sessionStorage.get('token')
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
//http 200 状态码下的异常map
const erorrMap = {
  CMN00000: '成功',
  CMN00001: '输入参数为空',
  CMN00002: '输入参数校验失败'
}
// http响应拦截器
service.interceptors.response.use(
  res => {
    //可以根据后端的系统而相应的做调整
    let status = res.data.meta.status
    var statusArr = [200, 201]
    // 如果不包含此状态就是失败
    if (!statusArr.includes(status)) {
      return Promise.reject(res.data)
    } else {
      if (erorrMap[status]) {
        //erorrMap[code]
      } else {
        return Promise.resolve(res.data)
      }
    }
    return res.data
  },
  async error => {
    if (error.request) {
      if (error.request.status === 0) {
        //超时
      }
    } else if (error.response) {
      if (error.response.status === 400) {
        //请求参数有问题
      } else if (error.response.status === 404) {
        //未找到资源
      } else if (error.response.status === 401) {
        //请先登录
      } else if (error.response.status === 500) {
        //服务器异常
      }
    }
    return Promise.reject(error)
  }
)

export default service
