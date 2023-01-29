<template>
    <!-- <ColumnList :list="columnList"></ColumnList> -->
    <h2>{{mainStore.count}}</h2>
    <h2>{{mainStore.foo}}</h2>
    <h2>{{mainStore.arr}}</h2>
    <h2>{{mainStore.countPLus}}</h2>
    <h2>{{mainStore.countPLus}}</h2>
    <h3>{{ mainStore.countP }}</h3>
    <hr>
    <h2>{{count}}</h2>
    <button @click="add">增加</button>
</template>

<script lang="ts">
// import ColumnList, { ColumnProps } from '../components/ColumnList.vue';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue'
import { useMainStore } from '../store/index copy'
export default defineComponent({
  components:{
    // ColumnList
  },
  setup () {
    // useMainStore是一个函数 调用得到容器实例
    const mainStore = useMainStore()
    console.log(mainStore);
    
  //   let columnList: ColumnProps[]  = reactive([{
  //   id: 1,
  //   title: 'test1的专栏',
  //   description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧',
  //   avatar: ''
  // },{
  //   id: 2,
  //   title: 'test2的专栏',
  //   description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
  //   avatar: ''
  // },{
  //   id: 3,
  //   title: 'test3的专栏',
  //   description: '这是的test3专栏，有一段非常有意思的简介，可以更新一下欧',
  //   avatar: 'https://ts1.cn.mm.bing.net/th/id/R-C.d8768f20526dbe935df75a72583691c7?rik=tOmn7hUsfJUB3w&riu=http%3a%2f%2fimg.crcz.com%2fallimg%2f201912%2f24%2f1577202207380271.jpg&ehk=mH8mhcNRaVsEjjxtJ86Qpg5a8ZZe5%2bcv1cxcVYMGuVw%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1'
  // },{
  //   id: 4,
  //   title: 'test4的专栏',
  //   description: '这是的test4专栏，有一段非常有意思的简介，可以更新一下欧',
  //   avatar: 'https://ts1.cn.mm.bing.net/th/id/R-C.d8768f20526dbe935df75a72583691c7?rik=tOmn7hUsfJUB3w&riu=http%3a%2f%2fimg.crcz.com%2fallimg%2f201912%2f24%2f1577202207380271.jpg&ehk=mH8mhcNRaVsEjjxtJ86Qpg5a8ZZe5%2bcv1cxcVYMGuVw%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1'
  // }])
  // pinia其实是将state数据做了reactive处理 --- 类似的这种数据的结构也将失去响应式 需要通过调用toRefs才能获得响应式
  const { count } = storeToRefs(mainStore)
  const add = () => {
    // 第一种：数据修改方法   最简单的
    // mainStore.count++

    // 第二种数据修改方法 同时对多个数据进行修改  ---- 内部有做处理，有性能优化的效果
    // mainStore.$patch({
    //   count: mainStore.count + 1,
    //   foo: 'jokevue'
    // })

    // 第三种数据修改方法 同时对多个数据进行修改  ---- 内部有做处理，有性能优化的效果
    // mainStore.$patch(state => {
    //   state.count++
    //   state.foo = 'cdjoke'
    //   state.arr.push(4)
    // })

    // 第四种 通过actions
    mainStore.changeState(10)

    // $patch 与 普通多次修改的区别是？  普通多次修改是每修改一个数据就触发一次视图更新，而批量修改是所有数据修改完毕再触发视图更新
  }
    return {
      // columnList,
      mainStore,
      count,
      add
    }
  }
})
</script>

<style lang="scss" scoped>

</style>