<template>
  <template v-for="item in posts" :key="item._id">
    <div class="card mt-3 p-4" @click="goPostDetail(item._id)">
      <div class="card-body p-0">
        <h3 class="card-title title-hov">{{item.title}}</h3>
        <div class="card-body d-flex p-0 mb-3 align-items-center">
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
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'PostList',
  props:{
    list:{
      required: true,
      type: Array as PropType<PostProps[]>
    }
  },
  setup (props) {
    const router = useRouter()
    const posts = computed(() => {
      return props.list.map(post => {
        generateFitUrl(post.image as ImageProps, 200, 110, ['m_fill'])
        return post
      })
    })
    const goPostDetail = (postId: string | undefined) => {
      router.push(`/post/${postId}`)
    }
    console.log(posts.value)
    return {
      posts,
      goPostDetail
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
.title-hov:hover {
  color: rgb(65, 159, 213);
  cursor: pointer;
}
</style>