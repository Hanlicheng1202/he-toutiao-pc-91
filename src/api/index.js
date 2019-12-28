import axios from 'axios'
import store from '@/store'
import router from '../router'
import JsonBiging from 'json-bigint'
// 配置默认配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 这里的代码只会执行一次  所以不能在这里配置
axios.defaults.transformResponse = [function (data) {
  return JsonBiging.parse(data)
}]
// axios.defaults.headers = `Bearer ${store.get().token}`
// 把axios默认的转json对象的方式改成 json-bigint 的方式

// 请求拦截器
axios.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${store.get().token}`
  return config
}, error => Promise.reject(error))
// 响应拦截器
axios.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response.status === 401) {
    router.push('/login')
  }
  return Promise.reject(error)
})
export default axios
