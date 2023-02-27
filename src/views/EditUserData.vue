<!-- 编辑用户信息和专栏信息 -->
<template>
  <div class="edit-container">
    <ul class="tab-bar" @click="changeTab">
      <li :class="{active:tabSelected == 1}" :data-index="1">更新个人资料</li>
      <li :class="{active:tabSelected == 2}" :data-index="2">更新专栏资料</li>
    </ul>
    <div>
      <h2>{{ tabSelected == 1 ? '编辑个人资料' : '编辑专栏资料' }}</h2>
      <Uploader 
        action="/api/upload"
        class="circle position-relative d-flex justify-content-center file-upload-height"
        :beforeUpdate="beforeUpload" 
        :uploaded="uploadedData" 
        @file-uploaded-success="onFileUploadSuccess">
        <template #uploaded="uploadedProps">
          <img class="circle" width="200" height="200" :src="uploadedProps.uploadedData?.data.url" alt="">
          <h3>点击重新上传</h3>
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
      <validate-form @form-submit="submitChange">
        <div class="mb-4">
          <label for="form-label">昵称：</label>
          <validate-input
            type="text"
            tag="input"
            placeholder="请输入昵称"
            :rules="nickNameRules"
            v-model="userData.nickName"
          ></validate-input>
        </div>
        <div class="mb-4">
          <label for="form-label">简介：</label>
          <validate-input
            type="text"
            tag="textarea"
            placeholder="请输入简介"
            :rules="descriptionRules"
            v-model="userData.description"
            rows="5"
          ></validate-input>
        </div>
        <template #submit>
          <button type="button" class="btn btn-primary">提交修改</button>
        </template>
      </validate-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useMainStore } from '../store'
import Uploader from '../components/Uploader.vue'
import ValidateForm from '../components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import createMessage from '../components/createMessage'
import { beforeUploadCheck } from '../utils/helper'
import { ResponseType, ImageProps, ChangeUserDataPayloadProps, ChangeColumnDataPayloadProps, ColumnProps } from '../store/type'
import { generateFitUrl } from '../utils/helper'
import { useRouter } from 'vue-router'
const mainStore = useMainStore()
const router = useRouter()
const nickNameRules: RulesProp = [{
  type: 'required',
  message: '昵称必填！'
}]
const descriptionRules: RulesProp = [{
  type: 'required',
  message: '简介必填！'
}]
let imageId = ''
// 用户数据
const userData = ref({
  nickName: mainStore.user.nickName,
  description: mainStore.user.description
})
const tabSelected = ref<number>(1)
const uploadedData = ref()
const changeTab = (e: MouseEvent) => {
  imageId = ''
  if(e.target && e.target instanceof HTMLElement && e.target.dataset.index) {
    if(tabSelected.value === +e.target.dataset.index) return 
    tabSelected.value = +e.target.dataset.index
  }
  if(tabSelected.value == 1) {
    const { nickName, description, avatar } = mainStore.user
    userData.value.description = description
    userData.value.nickName = nickName
    if(avatar) {
      generateFitUrl(avatar, 200, 200, ['m_fill'])
      uploadedData.value = { data: { url: avatar.fitUrl } }
    }
  } else {
    const columnId = mainStore.user.column
    const columnData = mainStore.getColumnById(columnId as string)
    if(columnData) {
      const { title, description, avatar } = columnData
        userData.value.nickName = title
        userData.value.description = description
      if(avatar) {
        generateFitUrl(avatar, 200, 200, ['m_fill'])
        uploadedData.value = { data: { url: avatar.fitUrl } }
      }
    } else {
      mainStore.fetchColumn(columnId)?.then(res => {
        const { data } = res.data
        mainStore.columns.data[data._id] = data
        userData.value.nickName = data.title
        userData.value.description = data.description
        const avatar = data.avatar
        generateFitUrl(avatar, 200, 200, ['m_fill'])
        uploadedData.value = { data: { url: avatar.fitUrl } }
      })
    }
  }
}
const beforeUpload = (file: File) => {
  const result = beforeUploadCheck(file, {format: ['image/jpeg', 'image/png'], size: 1})
  const { passed, error } = result
  if(error === 'format') {
    createMessage('图片格式必须为jpg或png格式！', 'error')
  } else if(error === 'size') {
    createMessage('图片不能超过1Mb！', 'error')
  }
  return passed
}
onMounted(() => {
  if(mainStore.user.avatar && mainStore.user.avatar.url) {
    const { nickName, description, avatar } = mainStore.user
    userData.value.description = description
    userData.value.nickName = nickName
    generateFitUrl(avatar, 200, 200, ['m_fill'])
    uploadedData.value = { data: { url: avatar.fitUrl } }
  }
})
// 图片在子组件上传成功后将编号返回
const onFileUploadSuccess = (rawData: ResponseType<ImageProps>) => {
  console.log('触发emit成功')
  if(rawData.data._id) {
    imageId = rawData.data._id
  }
}
const submitChange = (result: boolean) => {
  if(result) {
    // 更新个人信息
    if(tabSelected.value == 1) {
      const postData: ChangeUserDataPayloadProps = { _id:'' }
      postData._id = mainStore.user._id as string
      postData.nickName = userData.value.nickName
      postData.description = userData.value.description
      if(imageId) {
        postData.avatar = imageId
      }
      mainStore.changeUserData(postData).then(res => {
        const { nickName, description, avatar } = res.data.data
        mainStore.user.nickName = nickName
        mainStore.user.description = description
        if(imageId) {
          mainStore.user.avatar = avatar
        }
        createMessage('修改成功，2秒后跳转到首页！','success', 2000)
        setTimeout(() => {
          router.push('/')
        }, 2000)
      })
    } else { // 更新专栏信息
      const postData: ChangeColumnDataPayloadProps = {}
      postData.title = userData.value.nickName
      postData.description = userData.value.description
      if(imageId) {
        postData.avatar = imageId
      }
      mainStore.changeColumnData(postData).then(res => {
        const { _id, title, description, avatar } = res.data.data as ColumnProps
        mainStore.columns.data[_id].title = title
        mainStore.columns.data[_id].description = description
        if(imageId) {
          mainStore.columns.data[_id].avatar = { ...avatar }
        }
        createMessage('修改成功，2秒后跳转到首页！','success', 2000)
        setTimeout(() => {
          router.push('/')
        }, 2000)
      })
      console.log(111)
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-container {
  width: 720px;
  margin: 25px auto;
  height: 725px;
  .tab-bar {
    height: 30px;
    border-bottom: 1px solid #ccc;
    padding: 0;
    li {
      float: left;
      padding: 4px 10px 0 10px;
      background-color: #fff;
    }
  }
}
.active {
  border: 1px solid #ccc;
  height: 30px;
  border-bottom: none;
  color: #056de8;
}

.file-upload-container {
  .circle {
    border-radius: 200px;
    border: 1px solid #efefef;
    cursor: pointer;
  }
  h3 {
    position: absolute;
    font-size: 22px;
    top: 90px;
    left: 294px;
    opacity: 0; 
    cursor: pointer;
    &:hover {
      opacity: .9;
    }
  }
}


</style>