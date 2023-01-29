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
import { storeToRefs } from 'pinia'
import useLoadMore from '../hooks/useLoadMore'
import { defineComponent, onMounted } from 'vue'
import { useMainStore } from '../store'
export default defineComponent({
  components:{
    ColumnList
  },
  setup () {
    onMounted(() => {
      console.log(222);
      const params = {
        currentPage: 1,
        pageSize: 3
      }
      mainStore.fetchColumns(params).then(res => {
        // 先将原先的数据取出来
        const { data } = mainStore.columns
        const { list, count, currentPage } = res.data.data
        console.log('count',count);
        
        mainStore.columns = {
          data: { ...data, ...arrToObj(list)},
          total: count,
          currentPage: currentPage * 1
        }
      })
    })
    console.log(111);
    const mainStore = useMainStore()
    // const { columns } = storeToRefs(mainStore)
    const { loadMorePage, isLastPage } = useLoadMore(
        {
          pageSize: 3,
          currentPage: mainStore.columns.currentPage ? mainStore.columns.currentPage + 1 : 2
        }
    )
    console.log(isLastPage,'isLastPage')
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