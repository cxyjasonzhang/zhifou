<template>
  <template v-for="item in list" :key="item.id">
    <div class="card mt-3 p-4">
      <div class="card-body p-0">
        <h3 class="card-title">{{item.title}}</h3>
        <div class="card-body d-flex p-0 mb-3 align-items-center">
          <div style="margin-right: 15px;" v-if="item.image"><img :src="item.image" height="100" width="200"></div>
          <div>{{item.content}}</div>
        </div>
        <span class="card-link">{{item.createAt}}</span>
      </div>
    </div>
  </template> 
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { PostProps } from '../test';
export default defineComponent({
  props:{
    list:{
      type: Array as PropType<PostProps[]>
    }
  },
  setup (props) {
    console.log(props.list);
    return {
    }
  }
})
</script>

<style lang="scss" scoped>
.post-container {
  width: 70%;
  display: flex;
  margin: 0 auto;
}
</style>