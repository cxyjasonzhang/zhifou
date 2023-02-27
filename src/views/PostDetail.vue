<!-- 文章详情页 -->
<template>
  <div class="post-container" v-if="currentPost">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/">首页</router-link></li>
        <li class="breadcrumb-item"><router-link :to="`/column/${currentPost.column}`">专栏列表</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">{{ currentPost.title }}</li>
      </ol>
    </nav>
    <article>
      <div class="img my-4" v-if="currentImageUrl">
        <img :src="currentImageUrl" alt:="currentPost.title">
      </div>
      <h2 class="mb-4">{{ currentPost.title }}</h2>
      <div class="user-profile-component align-items-center mb-5 row border-top border-bottom">
        <div class="d-flex align-items-center col" v-if="typeof currentPost.author === 'object'">
          <div v-if="currentPost.author.avatar">
            <img class="rounded-circle img-thumbnail img-avatar" :src="currentPost.author.avatar.url" alt="">
          </div>
          <div class="ml-1">
            <h6>{{ currentPost.author.nickName }}</h6>
            <span class="text-truncate text-muted d-block">{{ currentPost.author.description }}</span>
          </div>
        </div>
        <span class="col text-truncate text-muted d-block">发表于：{{ currentPost.createdAt }}</span>
      </div>
      <div class="mb-5" v-html="currentHTML"></div>
    </article>
    <div class="edit-area btn-group mb-5" v-if="showEditArea">
      <router-link :to="{ name:'create', query: { id: currentPost._id }}" type="button" class="btn btn-success">编辑</router-link>
      <button type="button" class="btn btn-danger" @click.prevent="isShow = true">删除</button>
    </div>
    <modal v-if="isShow" :visible="isShow" title="删除文章" 
      @modal-on-close="isShow = false" 
      @modal-on-confirm="deletePostByPid">
      确定删除这篇文章吗？
    </modal>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMainStore } from '../store/index'
import { ImageProps, PostProps, UserProps } from '../store/type'
import createMessage from '../components/createMessage'
import  MarkdownIt  from 'markdown-it'
import Modal from '../base/Modal.vue'
const md = new MarkdownIt()
const route = useRoute()
const router = useRouter()
const mainStore = useMainStore()
const { postId } = route.params
const isShow = ref(false) // 点击删除显示弹出框
onMounted(() =>{
  if(!currentPost.value || !currentPost.value.content) {
    mainStore.fetchPostById(postId as string).then(res => {
        const { data } =  res.data
        mainStore.posts.data[data._id] = data
      }).catch(err => {
        console.log(err)
      })
  }
})
const currentPost = computed<PostProps>(() => mainStore.getCurrentPost(postId as string))

const currentHTML = computed(() => {
  const { content, isHTML } = currentPost.value
  if(currentPost.value && content) {
    // 不是html就将markdown转html
    return isHTML ? content : md.render(content)
  } else {
    return null
  }
})
// 判断当前文章的用户是否登录用户一致
const showEditArea = computed(() => {
  const { isLogin, _id } = mainStore.user
  if(currentPost.value && currentPost.value.author && isLogin) {
    const postAuthor = currentPost.value.author as UserProps  // 类型断言
    return postAuthor._id === _id
  } else {
    return false
  }
})
const currentImageUrl = computed(() => {
  if(currentPost.value.image) {
    const { image } = currentPost.value
    return (image as ImageProps).url + '?x-oss-process=image/resize,w_850'
  } else {
    return null
  }
})
const deletePostByPid = () => {
  isShow.value = false
  mainStore.deletePostByPid(postId as string).then(res => {
    createMessage('删除成功，2秒后跳转到专栏首页', 'success', 2000)
    setTimeout(() => {
      router.push(`/column/${mainStore.user.column}`)
    }, 2000)
  })
}
</script>

<style lang="scss" scoped>
.post-container {
  width: 690px;
  margin: 0 auto;
  min-height: 749px;
}
.img-avatar {
    height: 43px;
    width:43px;
    margin-right: 20px;
  }
.img {
  width: 690px;
  height: 300px;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
}

.user-profile-component{
  display: flex;
  padding: 15px 0;
}
</style>