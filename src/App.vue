<template>
  <GlobalHeader :user="user"></GlobalHeader>
  <router-view></router-view>
  <loader v-if="isLoading" text="拼命加载中..."  background="rgba(0, 0, 0, 0.8)"></loader>
  <GlobalFooter></GlobalFooter>
</template>


<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'
import { storeToRefs } from 'pinia'
import GlobalHeader from './components/GlobalHeader.vue'
import GlobalFooter from './components/GlobalFooter.vue'
import Loader from './components/Loader.vue'
import { onMounted, watch } from 'vue'
import { useMainStore } from './store'
import { axios }  from './utils/http'
import createMessage from './components/createMessage'
const mainStore = useMainStore()
const { isLoading, user, token, error } = storeToRefs(mainStore)
watch(() => error?.value?.status, () => {
  if(error?.value) {
    const { status, message } = error.value
    if (status && message) {
      createMessage(message, 'error')
    }
  }
})
onMounted(() => {
  if(!user.value.isLogin && token.value) {
    axios.defaults.headers.common.Authorization = `Bearer ${token.value}`
    mainStore.fetchCurrentUser().then(res => {
      mainStore.user = { isLogin: true, ...res.data.data }
    })
    .catch(err => {
      console.log(err);
    })
  }
})
</script>

<style scoped>
</style>
