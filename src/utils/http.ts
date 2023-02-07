import { useMainStore } from '../store'
import axios, { AxiosRequestConfig } from 'axios'

// 这里采用代理实现完成
// axios.defaults.baseURL = 'http://localhost:7001/api/'
// axios.defaults.baseURL = 'http://api.imooc.com/'
// const mainStore = useMainStore()   这边会出现   mainStore 未初始化的情况

// interceptors 发送请求的拦截器
axios.interceptors.request.use(config => {
  useMainStore().setLoading(true)
  useMainStore().setError({ status: false, message: ''})
  return config
})

// interceptors 响应的拦截器
axios.interceptors.response.use(resp => {
  // store.commit('setLoading', false)
  // let timer: any = null
  // let timer: NodeJS.Timer | null = null
  // window.setTimeout(() => {
  useMainStore().setLoading(false)
  // }, 2000)
  return resp
}, e => {
  const { error } = e.response.data
  useMainStore().setLoading(false)
  useMainStore().setError({ status: true, message: error })
  return Promise.reject(error)
})

// http://api.imooc.com/api/columns?currentPage=1&pageSize=5 icode={codeName}

// 测试发送
// axios.get('/api/columns?currentPage=1&pageSize=5').then(res => {
//   console.log(res)
// })

export { axios, type AxiosRequestConfig }
