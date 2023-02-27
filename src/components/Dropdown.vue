<template>
  <div class="dropdown" ref="dropdownRef">
  <a style="text-decoration: none;" class="btn btn-outline-light dropdown-toggle my-2" href="#" @click.prevent="openModal">
    你好，{{title}}
  </a>
  <ul class="dropdown-menu" style="display: block;" v-show="isOpen">
    <dropdown-item><router-link to="/create" class="dropdown-item" href="#">新建文章</router-link></dropdown-item>
    <dropdown-item><router-link :to="`/column/${column}`" class="dropdown-item">我的专栏</router-link></dropdown-item>
    <dropdown-item><router-link class="dropdown-item" to="/edit">编辑资料</router-link></dropdown-item>
    <dropdown-item><a class="dropdown-item" @click.prevent="logout">退出登录</a></dropdown-item>
  </ul>
</div>
</template>

<script lang="ts">
import { defineComponent, ref, watch} from 'vue'
import { useMainStore } from '../store'
import { useRouter } from 'vue-router'
import DropdownItem from './DropdownItem.vue'
import useClickOutside from '../hooks/useClickOutside'
import createMessage from './createMessage'

export default defineComponent( {
  name: 'Dropdown',
  components:{
    DropdownItem
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup () {
    const router = useRouter()
    const mainStore = useMainStore()
    const column = mainStore.user.column
    const dropdownRef = ref<null | HTMLElement>(null)
    let isOpen = ref(false)
    const isClickOutside = useClickOutside(dropdownRef)
    watch( isClickOutside,() => {
      if(isOpen.value && isClickOutside.value) {
        isOpen.value = false
      }
    })
    const openModal = () => {
      isOpen.value = !isOpen.value
    }
    const closeModal = () => {
      isOpen.value = false
    }
    const logout = () => {
      localStorage.setItem('token', '')
      mainStore.logout()
      createMessage('退出登录成功，欢迎下次登录！', 'success', 1500)
      router.push('/')
    }
    return {
      isOpen,
      openModal,
      closeModal,
      logout,
      // 返回和 ref 同名的响应式对象，就可以拿到对应的 dom 节点
      dropdownRef,
      column
    }
  }
})
</script>

<style lang="scss" scoped>

</style>