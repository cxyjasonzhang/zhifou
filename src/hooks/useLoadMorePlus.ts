import { ref, computed, ComputedRef } from 'vue'
import { useMainStore } from '../store'
import { arrToObj } from '../utils/helper';

export interface LoadParams {
  columnId?: string;
  currentPage: number;
  pageSize: number;
}

const useLoadMore = (actionName: string, total: ComputedRef<number>, params: LoadParams = { currentPage: 1, pageSize: 5 } ) => {
  const mainStore = useMainStore()
  const { currentPage: current, pageSize, columnId} = params
  const currentPage = ref(current)
  const requestParams = computed(() => ({
    currentPage: currentPage.value,
    pageSize: pageSize,
    columnId: columnId
  }))

  const loadMorePage = () => {
    if(actionName === 'fetchColumns') {
      mainStore.fetchColumns(requestParams.value)
      .then(res => {
        currentPage.value++
        // mainStore.columns.currentPage++
        // 先将原先的数据取出来
        const { data } = mainStore.columns
        const { list, count } = res.data.data
        mainStore.columns = {
          data: { ...data, ...arrToObj(list)},
          total: count,
          currentPage: currentPage.value,
          isLoaded: true
        }
      })
    } else if(actionName === 'fetchColumnsPosts') {
        mainStore.fetchColumnsPosts(requestParams.value)
        .then(res => {
          currentPage.value++
          const { data } = mainStore.posts
          const { list, count } = res.data.data
          mainStore.posts.data = {...data, ...arrToObj(list)}
          mainStore.posts.loadedColumns[columnId as string] = {
            columnId: columnId,
            total: count,
            currentPage: currentPage.value
          }
        }).catch(err => {
          console.log(err)
        })
    }
  }

  const isLastPage = computed(() => {
    console.log(total.value, pageSize, currentPage.value, 'total')
    if(actionName === 'fetchColumns') {
      return Math.ceil(total.value / pageSize) < currentPage.value
    } else {
      return Math.ceil(total.value / pageSize) < currentPage.value
    }
  })

  return {
    loadMorePage,
    isLastPage
  }
}

export default useLoadMore