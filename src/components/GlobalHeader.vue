<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <router-link class="navbar-brand" to="/">知否</router-link>
    <ul class="list-inline mb-0 w-20 d-flex" v-if="!user.isLogin">
      <li class="my-2 mx-1">
        <router-link class="btn btn-outline-light w-180" to="login">登录</router-link>
      </li>
      <li class="my-2 mx-1">
        <router-link class="btn btn-outline-light" to="/signup">注册</router-link>
      </li>
    </ul>
    <ul class="list-inline mb-0" v-else>
      <!-- 先进行判断 -->
      <li v-if="user.nickName">
        <Dropdown :title="user.nickName"></Dropdown>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Dropdown from './Dropdown.vue'
import { UserProps } from '../store/type'
export default defineComponent({
  name: 'GlobalHeader',
  props:{
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  components:{
    Dropdown
  },
  setup () {
    

    return {}
  }
})
</script>

<style lang="scss" scoped>

</style>