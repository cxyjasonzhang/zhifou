<!-- 创建文章 -->
<template>
  <div class="create-post-page container-form">
    <h3>{{  isEditArticle ? '修改文章' : '新建文章' }}</h3>
    <Uploader
      action="/api/upload"
      class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
      :beforeUpdate="beforeUpload"
      :uploaded="uploadedData"
      @file-uploaded-success="onFileUploadSuccess"
    >
      <template #uploaded="uploadedProps">
        <div class="uploaded-area">
          <img :src="uploadedProps.uploadedData.data.url" alt="">
          <h3>点击重新上传</h3>
        </div>
      </template>
      <template #default>
        点击上传
      </template>
      <template #uploading>
        <div class="d-flex">
          <div class="spinner-border text-secondary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <h2>正在上传</h2>
        </div>
      </template>
    </Uploader>
    <ValidateForm @form-submit="onFormSubmit">
      <div class="mb-4">
        <label for="form-label">文章标题：</label>
        <ValidateInput
          type="text"
          tag="input"
          placeholder="请输入文章标题"
          :rules="titleRules"
          v-model="titleVal"
        ></ValidateInput>
      </div>
      <div class="mb-4">
        <label for="form-label">文章详情：</label>
        <ValidateInput
          rows="10"
          type="text"
          tag="textarea"
          placeholder="请输入文章详情"
          :rules="contentRules"
          v-model="contentVal"
        ></ValidateInput>
      </div>
      <template #submit>
        <button class="btn btn-primary btn-larger">{{ isEditArticle ? '更新文章' : '发表文章' }}</button>
      </template>
    </ValidateForm>
  </div>
</template>

<script setup lang="ts">
import ValidateForm from '../components/ValidateForm.vue'
import  ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import Uploader from '@/components/Uploader.vue'
import { beforeUploadCheck } from '../utils/helper'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import createMessage from '../components/createMessage'
import { ResponseType, ImageProps, PostProps } from '../store/type'
import { useMainStore } from '../store'
const titleRules: RulesProp = [
  {type: 'required', message: '文章标题不能为空！'}
]
const contentRules: RulesProp = [
  {type: 'required', message: '文章详情不能为空！'}
]
const route = useRoute()
const mainStore = useMainStore()
const router = useRouter()
const titleVal = ref('')
const contentVal = ref('')
const uploadedData = ref()
let imageId = ''
const postId = route.query.id
const isEditArticle = !!postId // 两个非将其转成布尔值
onMounted(async() => {
  if(postId) {
    const currentPost = await mainStore.fetchPostById(postId as string)
    const { title, image, content } = currentPost.data
    titleVal.value = title
    contentVal.value = content || ''
    if(image) {
      uploadedData.value = { data: image }
    }
  }
})

const beforeUpload = (file: File) => {
  const result = beforeUploadCheck(file, {format: ['image/jpeg', 'image/png'], size: 1})
  const { passed, error } = result
  if(error === 'format') {
    createMessage('图片格式必须为jpg或png类型!', 'error')
  } 
  if(error === 'size') {
    createMessage('图片大小不能超过1Mb!', 'error')
  }
  return passed
}
// 在图片组件那边上传图片（调用上传图片接口）会返回图片链接，和编号（此编号在请求创建文章接口时要带上）
const onFileUploadSuccess = (rawData: ResponseType<ImageProps>) => {
  if(rawData.data._id) {
    imageId = rawData.data._id
  }
}
// result ==> 表单验证通过返回true
const onFormSubmit = (result: boolean) => {
  const { column, _id } = mainStore.user
  if(result) {
    if(!isEditArticle) {
      const postData: PostProps = {
        title: titleVal.value,
        content: contentVal.value,
        image: imageId,
        column: column as string, // 将column视为一个字符串，不然会报错
        author: _id
      }
      mainStore.createPost(postData).then(res => {
        createMessage('发表成功,2秒后跳转到文章！','success', 2000)
        setTimeout(() => {
          router.push({name: 'column', params: {id: column}})
        },2000)
      })
    } else {
      const postData = {
        title: titleVal.value,
        content: contentVal.value,
        image: imageId
      }
      mainStore.updatePostByPid(postId as string, postData).then(res => {
        console.log(res)
        const { data } = res.data
        mainStore.posts.data[data._id] = data  // 请求返回新文章的数据 替换掉原来的数据
        createMessage('更新成功,2秒后跳转到文章！','success', 2000)
        setTimeout(() => {
          router.push({name: 'column', params: {id: column}})
        },2000)
      })
    }

  }
}
</script>

<style lang="scss">
.container-form {
  max-width: 700px;
  margin: 0 auto;
}
.create-post-page .file-upload-container {
  height: 200px;
  cursor: pointer;
  overflow: hidden;
}
.create-post-page .file-upload-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.uploaded-area {
  position: relative;
}
.uploaded-area:hover h3 {
  display: block;
}
.uploaded-area h3 {
  display: none;
  position: absolute;
  color: #999;
  text-align: center;
  width: 100%;
  top: 50%;
}
</style>