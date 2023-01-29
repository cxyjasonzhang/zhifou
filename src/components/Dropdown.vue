<template>
  <div class="dropdown" ref="dropdownRef">
  <a style="text-decoration: none;" class="btn btn-outline-light dropdown-toggle my-2" href="#" @click="openModal">
    你好，{{title}}
  </a>
  <ul class="dropdown-menu" style="display: block;" v-show="isOpen">
    <dropdown-item :disabled="true"><a class="dropdown-item" href="#">新建文章</a></dropdown-item>
    <dropdown-item><a class="dropdown-item" href="#">编辑资料</a></dropdown-item>
  </ul>
</div>
</template>

<script lang="ts">

import { defineComponent, ref, watch} from 'vue';
import DropdownItem from './DropdownItem.vue';
import useClickOutside from '../hooks/useClickOutside';

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
    return {
      isOpen,
      openModal,
      closeModal,
      // 返回和 ref 同名的响应式对象，就可以拿到对应的 dom 节点
      dropdownRef
    }
  }
})
</script>

<style lang="scss" scoped>

</style>