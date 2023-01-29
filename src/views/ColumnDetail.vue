<template>
  <div class="w-690">
    <div class="d-flex align-items-center pb-3 border-bottom border-secondary">
      <div class="avatar">
        <img :src="column?.avatar" width="150" height="150" alt="">
      </div>
      <div class="ml-4">
        <h2>{{column?.title}}</h2>
        <p>{{column?.description}}</p>
      </div>
    </div>
    <post-list :list="list"></post-list>
  </div>
</template>

<script lang="ts">
import defaultImg from '../assets/image/defaultImg.png'
import { defineComponent, onMounted } from 'vue';
import { useMainStore } from '../store'
import { useRoute } from 'vue-router'
import PostList from '../components/PostList.vue'
export default defineComponent({
  components:{
    PostList
  },

  setup () {
    onMounted(() => {
      console.log(mainStore.columns)
    })
    const route = useRoute()
    const mainStore = useMainStore()
    // 转为数值类型
    // const currentId = Number(route.params.id)
    const currentId = +route.params.id
    const column = mainStore.getColumnById(currentId)
    const list = mainStore.getPostById(currentId)
    if(column?.avatar === '') {
      column.avatar = defaultImg
    }
    return {
      column,
      list
    }
  }
})
</script>

<style lang="scss" scoped>
.w-690 {
  width: 690px;
  margin: 0 auto;
  padding-bottom: 20px;
}
.avatar {
  margin-right: 40px;
}
</style>