<template>
  <ColumnList :list="mainStore.getColumns"></ColumnList>
  <div class="load_more">
    <button
      v-if="!isLastPage"
      @click="loadMorePage"
      class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25 load-more"
    >加载更多</button>
  </div>
</template>

<script lang="ts">
import ColumnList from '../components/ColumnList.vue'
import { arrToObj } from '../utils/helper'
import useLoadMorePlus from '../hooks/useLoadMorePlus.js'
import { computed, defineComponent } from 'vue'
import { useMainStore } from '../store'
export default defineComponent({
  components:{
    ColumnList
  },
  setup () {
    const mainStore = useMainStore()
    const params = {
      currentPage: 1,
      pageSize: 3
    }
    const total = computed(() => {
      return mainStore.columns.total
    })
    // 请求后将isLoaded 置为 true
    if(mainStore.columns.currentPage < params.currentPage) {
      mainStore.fetchColumns(params)
      .then(res => {
        // 先将原先的数据取出来
        const { data } = mainStore.columns
        const { list, count, currentPage } = res.data.data
        mainStore.columns = {
          data: { ...data, ...arrToObj(list)},
          total: count,
          isLoaded: true,
          currentPage: currentPage * 1
        }
      })
    }
    const { loadMorePage, isLastPage } = useLoadMorePlus(
      'fetchColumns',
      total,
      {
        pageSize: 3,
        currentPage: mainStore.columns.currentPage ? mainStore.columns.currentPage + 1 : 2
      }
    )
    return {
      mainStore,
      isLastPage,
      loadMorePage
    }
  }
})
</script>

<style lang="scss" scoped>
.load_more {
  text-align: center;
  padding-bottom: 150px;
}
</style>