import { defineStore } from 'pinia'

// 1.定义并导出容器   参数1是容器的参数（必须唯一）

export const useMainStore = defineStore('main', {
  /**
   * 类似于组件中的data   用于存储全局状态的
   * state 必须是函数：这样是为了在服务端渲染的时候避免交叉请求导致数据状态污染
   */
  state: () => {
    return {
      count: 100,
      foo: 'joke',
      arr: [1,2,3]
    }
  },

  /**
   * 类似于组件中的computed   用于封装计算属性 有缓存的功能
   */
  getters: {
    countPLus(state) {
      console.log('调用');
      return state.count + 10
    },
    countP: (state) => state.count * 2,
    // 如果在getters中使用了this则必须手动指定返回值的类型，否则类型推导不出来
    count10(): number {
      return this.count + 10
    }
  },

  /**
   * 类似于组件中的methods   封装业务逻辑 修改state
   */
  actions: {
    // 不能使用箭头函数定义action，因为箭头函数绑定外部this
    changeState (num: number) {
      this.count += num
      this.foo = 'changeJoke'
      this.arr.push(666)

      // 修改多个数据也可以用  this.$patch(state => {})
    }
  }
})
