import { ref, computed } from 'vue'
import { useMainStore } from '../store'
import { arrToObj } from '../utils/helper';

export interface LoadParams {
  columnId?: string;
  currentPage: number;
  pageSize: number;
}

const useLoadMore = (actionName: string, params: LoadParams = { currentPage: 1, pageSize: 5 } ) => {
  const mainStore = useMainStore()
  const { currentPage: current, pageSize, columnId} = params
  const currentPage = ref(current)
  const requestParams = computed(() => ({
    currentPage: currentPage.value,
    pageSize: pageSize,
    columnId: columnId
  }))

  const loadMorePage = () => {
    if(actionName === 'fetchColumn') {
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
          currentPage: currentPage.value
        }  
      })
    }
  }

  const isLastPage = computed(() => {
    if(actionName === 'fetchColumn') {
      return Math.ceil(mainStore.columns.total / pageSize) < currentPage.value
    } else {
      return false
    }
  })

  return {
    loadMorePage,
    isLastPage
  }
}

export default useLoadMore