<template>
  <template v-for="item in posts" :key="item._id">
    <div class="card mt-3 p-4">
      <div class="card-body p-0">
        <h3 class="card-title">{{item.title}}</h3>
        <div class="card-body d-flex p-0 mb-3 align-items-center">
          <!-- <div style="margin-right: 15px;" v-if="typeof(item.image) == 'string'">
            <img :src="item.image">
          </div>
          <div style="margin-right: 15px;" v-else>
            <img :src="item.image?.fitUrl">
          </div> -->
          <div style="margin-right: 15px;" v-if="item.image">
            <img :src="typeof(item.image) == 'string' ? item.image : item.image.fitUrl">
          </div>
          <p :class="{'col-8': item.image}" class="text-muted">{{ item.excerpt }}</p>
        </div>
        <span class="card-link">{{item.createdAt}}</span>
      </div>
    </div>
  </template> 
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { PostProps, ImageProps} from '../store/type';
import { generateFitUrl } from '../utils/helper';
export default defineComponent({
  name: 'PostList',
  props:{
    list:{
      required: true,
      type: Array as PropType<PostProps[]>
    }
  },
  setup (props) {
    const posts = computed(() => {
      return props.list.map(post => {
        generateFitUrl(post.image as ImageProps, 200, 110, ['m_fill'])
        return post
      })
    })
    console.log(posts.value)
    return {
      posts
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