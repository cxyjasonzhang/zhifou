<template>
  <div class="w-690">
    <div class="d-flex align-items-center pb-3 border-bottom border-secondary" v-if="column">
      <div class="avatar">
        <img :src="column.avatar && column.avatar.url" width="150" height="150" :alt="column.title">
      </div>
      <div class="ml-4">
        <h2>{{column?.title}}</h2>
        <p>{{column?.description}}</p>
      </div>
    </div>
    <post-list :list="list"></post-list>
    <div class="text-center mt-3" v-if="!isLastPage">
      <button type="button" class="btn btn-outline-primary w-25" @click="loadMorePage">加载更多</button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, watch } from 'vue'
import { ColumnProps } from '../store/type'
import { useMainStore } from '../store'
import { useRoute } from 'vue-router'
import PostList from '../components/PostList.vue'
import { addColumnAvatar } from '../utils/helper'
import useLoadMore from '../hooks/useLoadMorePlus'
type ColumnIdProp = string | undefined
export default defineComponent({
  components:{
    PostList
  },

  setup () {
    const mainStore = useMainStore()
    const router = useRoute()
    const columnId = router.params.id as ColumnIdProp
    const loaded = reactive({
      currentPage: 1,
      total: 0
    })
    const total = computed(() => loaded.total)
    const params = {
      currentPage: loaded.currentPage ? loaded.currentPage + 1 : 1,
      pageSize: 3,
      columnId
    }
    watch(mainStore.posts.loadedColumns, () => {
      const { currentPage, total } = mainStore.getLoadedPost(columnId as string)
      loaded.currentPage = currentPage as number
      loaded.total = total as number
    })
    onMounted(() => {
      mainStore.fetchColumnsPosts(params).then(res => {
        console.log(res, '***')
        const {columnId } = params
        const { data } = mainStore.posts
        const { list, count, currentPage } = res.data.data
        mainStore.posts.data = {...data, ...list}
        mainStore.posts.loadedColumns[columnId as any] = {
          columnId: columnId,
          total: count,
          currentPage: currentPage * 1
        }
      }).catch(err => {
        console.log(111,err)
      })
      mainStore.fetchColumn(columnId)
    })
    // 计算属性的使用
    const column = computed(() => {
      const currentColumn = mainStore.getColumnById(columnId as string) as ColumnProps | undefined
      if(currentColumn) {
        addColumnAvatar(currentColumn, 100, 100)
      }
      return currentColumn
    })
    // 使用computed 当数据发生改变时 重新计算数据(没加计算属性实现不了响应式)
    const list = computed(() => {
      return mainStore.getPostByCid(columnId as string)
    })
    const { loadMorePage, isLastPage } = useLoadMore('fetchColumnsPosts', total, params)
    return {
      column,
      list,
      isLastPage,
      loadMorePage
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