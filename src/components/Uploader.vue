<!-- 图片上传组件 -->
<template>
  <div class="file-upload">
    <div class="file-upload-container" @click="triggerUpload" v-bind="$attrs">
      <slot name="uploading" v-if="fileStatus == 'loading'">正在上传...</slot>
      <slot name="uploaded" v-else-if="fileStatus == 'success'" :uploadedData="uploadedData">上传成功</slot>
      <slot name="default" v-else>上传封面图</slot>
    </div>
    <input type="file" accept="image/png, image/jpeg" @change="handleFileChange" class="file-input d-none" ref="fileInput" />
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import axios from 'axios'
import { ref, PropType, watch } from 'vue'
type UpLoadStatus = 'ready' | 'loading' | 'success' | 'fail'
type CheckFunction = (file: File) => boolean
const props = defineProps({
  action: {
    type: String,
    required: true
  },
  beforeUpdate: {
    type: Function as PropType<CheckFunction>,
    required:true
  },
  uploaded: {
    type: Object
  }
})

const emit = defineEmits(['file-uploaded-success','file-uploaded-error'])
const fileInput = ref<null | HTMLInputElement>(null)   // 定义ref的泛型
const fileStatus = ref<UpLoadStatus>('ready')
const triggerUpload = () => {
  console.log(fileInput)
  if(fileInput.value) {
    fileInput.value.click()
  }
}
const uploadedData = ref(props.uploaded)
// 关于watch监听不是响应式对象的编写方式
watch(() => props.uploaded, (newValue) => {
  if(newValue) {
    fileStatus.value = 'success'
    uploadedData.value = newValue
  }
})
const handleFileChange = (e: Event) => {
  const currentTarget = e.target as HTMLInputElement
  if(currentTarget.files) {
    const files = Array.from(currentTarget.files)
    if(!props.beforeUpdate(files[0])) {
      return false
    }
    fileStatus.value = 'loading'
    // currentTarget.files这边的currentTarget.files不是一个数组，是一个伪数组，这边使用该方法将其转化为数组
    const formData = new FormData()
    formData.append('file', files[0])
    axios.post(props.action, formData, {
      headers: {
        "Content-Type": 'multipart/form-data'
      }
    }).then(resp => {
      console.log(resp)
      uploadedData.value = resp.data
      fileStatus.value = 'success'
      emit('file-uploaded-success', resp.data)
    }).catch(() => {
      fileStatus.value = 'fail'
    }).finally(() => {
      if(fileInput.value) {
        fileInput.value.value = ''
      }
    })
  }
}
</script>

<style scoped>
</style>