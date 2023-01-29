import { defineStore } from 'pinia'
// import { testPosts, ColumProps, PostProps } from '../test'
import { GlobalDataProps, GlobalErrorProps } from './type'
import { objToArr } from '../utils/helper'
import { axios } from '../utils/http'
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
    getColumns: (state) => {
      return objToArr(state.columns.data)
    }
    // getColumnById: (state) => (id: number) => {
    //   return state.columns.data.find(c => c._id === id)
    // },
    // getPostById: (state) => (id: number) => {
    //   return state.posts.data.filter(p => p.columnId === id)
    // }
  },

  /**
   * 类似于组件中的methods   封装业务逻辑 修改state
   */
  actions: {
    // 登录接口 --- payload为传过来的登录账号与密码
    login(payload: any) {
      return axios('/api/user/login',{method: 'post', data: payload})
      .then(res => {
        if(res.data.code === 0) {
          const { token } = res.data.data
          // 存储token
          this.token = token
          // 存到localStorage中
          localStorage.setItem('token', token)
          // 将token添加到请求头
          axios.defaults.headers.common.Authorization = `Bearer ${token}`
          return this.fetchCurrentUser()
        }
      })
      .catch(err => {
        console.log(err,'loginErr')
      })
    },
    // 注册
    signup(payload: any) {
      return axios('/api/users', { method: 'post', data: payload })
    },
    // 创建文章
    // createPost(newPost: PostProps) {
    //   this.posts.push(newPost)
    // },
    // 获取用户信息
    async fetchCurrentUser() {
      return await axios('/api/user/current', { method: 'get' })
      // .then(res => {
      //   this.user = { isLogin: true, ...res.data.data }
      //   router.push('/')
      // })
      // .catch(err => {
      //   console.log(err);
      // })
    },
    // 请求首页专栏列表
    fetchColumns(params: any) {
      const { currentPage = 1, pageSize = 3 } = params
        return axios(`/api/columns?currentPage=${currentPage}&pageSize=${pageSize}`,{method: 'get'})
      // .then(res => {
      //   // 先将原先的数据取出来
      //   const { data } = this.columns
      //   console.log(res.data.data.list)
      //   const { list, count, currentPage } = res.data.data
      //   this.columns = {
      //     data: { ...data, ...arrToObj(list)},
      //     total: count,
      //     currentPage: currentPage * 1
      //   }
      // })
    },
    // 获取专栏内的文章
    // 设置出错提示
    setError(e: GlobalErrorProps) {
      this.error = e
    },
    // 设置加载
    setLoading(status: boolean) {
      this.isLoading = status
      console.log('调用了，此时loading为', status)
    }
  }
})



