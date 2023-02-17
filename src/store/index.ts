import { defineStore } from 'pinia'
import { GlobalDataProps, GlobalErrorProps, PostProps } from './type'
import { objToArr } from '../utils/helper'
import { axios } from '../utils/http'
import router from '../router'
import createMessage from '../components/createMessage'
// export const pinia = createPinia()
// 1.定义并导出容器   参数1是容器的参数（必须唯一）

export const useMainStore = defineStore('main', {
  /**
   * 类似于组件中的data   用于存储全局状态的
   * state 必须是函数：这样是为了在服务端渲染的时候避免交叉请求导致数据状态污染
   */
  state: (): GlobalDataProps => {
    return {
      error: { status: false },
      token: localStorage.getItem('token') || '',
      columns: { data: {}, currentPage: 0, total: 0 },
      posts: { data: {}, loadedColumns: {} },
      isLoading: false,
      user: { isLogin: false }
    }
  },

  /**
   * 类似于组件中的computed   用于封装计算属性 有缓存的功能
   */
  getters: {
    // 将对象转为数组 然后返回
    getColumns: (state) => {
      return objToArr(state.columns.data)
    },
    // 之前将请求的专栏数组转为对象再存到column,key值为id值 方便取
    getColumnById: (state) => (id: string) => {
      return state.columns.data[id]
    },
    getPostByCid: (state) => (cid: string) => {
      return objToArr(state.posts.data).filter(item => item.column === cid)
    },
    getLoadedPost: (state) => (id: string) => {
      return state.posts.loadedColumns[id]
    }
  },

  /**
   * 类似于组件中的methods   封装业务逻辑 修改state
   */
  actions: {
    // 登录接口 --- payload为传过来的登录账号与密码
    login(payload: any) {
      axios('/api/user/login',{method: 'post', data: payload})
      .then(res => {
        if(res.data.code === 0) {
          const { token } = res.data.data
          // 存储token
          this.token = token
          // 存到localStorage中
          localStorage.setItem('token', token)
          // 将token添加到请求头
          axios.defaults.headers.common.Authorization = `Bearer ${token}`
          this.fetchCurrentUser()
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
    // 注册
    signup(payload: any) {
      return axios('/api/users', { method: 'post', data: payload })
    },
    // 创建文章
    createPost(payload: PostProps) {
      return axios('/api/posts', {method: 'post', data: payload})
    },
    // 根据id获取专栏信息
    fetchColumn(cid: any) {
      return axios(`/api/columns/${cid}`, { method: 'get' })
    },
    // 获取用户信息
    fetchCurrentUser() {
      axios('/api/user/current', { method: 'get' })
      .then(res => {
        this.user = { isLogin: true, ...res.data.data }
        if(router.currentRoute.value.path != '/') {
          createMessage('登录成功，两秒后跳转到首页！', 'success')
          setTimeout(() => {
            router.push('/')
          }, 2000)
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    // 请求首页专栏列表
    fetchColumns(params: any) {
      console.log(params,'ppp')
      const { currentPage = 1, pageSize = 3 } = params
        return axios(`/api/columns?currentPage=${currentPage}&pageSize=${pageSize}`,{method: 'get'})
    },
    // 获取特定用户的专栏文章列表
    fetchColumnsPosts(params: any) {
      const { currentPage = 1, pageSize = 3, columnId } = params
      return axios(`/api/columns/${columnId}/posts?currentPage=${currentPage}&pageSize=${pageSize}`)

    },
    // 设置出错提示
    setError(e: GlobalErrorProps) {
      this.error = e
    },
    // 设置加载
    setLoading(status: boolean) {
      this.isLoading = status
    }
  }
})



