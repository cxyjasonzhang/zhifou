<!-- 创建文章 -->
<template>
  <!-- <div class="container create-con"> -->
    <ValidateForm @form-submit="onFormSubmit">
      <h3>新建文章</h3>
      <div class="upDate-pic">上传封面图</div>
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
        <button class="btn btn-primary btn-larger">发表文章</button>
      </template>
  </ValidateForm>
  <!-- </div> -->
</template>

<script setup lang="ts">
import ValidateForm from '../components/ValidateForm.vue'
// import { useRouter } from 'vue-router';
import  ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
// import { useMainStore } from '../store'
// import { PostProps } from '../test'
import { ref, onMounted } from 'vue'

const titleRules: RulesProp = [
  {type: 'required', message: '文章标题不能为空！'}
]

const contentRules: RulesProp = [
  {type: 'required', message: '文章详情不能为空！'}
]
onMounted(() => {
  console.log(111)
})
// const mainStore = useMainStore()
// const router = useRouter()
const titleVal = ref('')
const contentVal = ref('')
const onFormSubmit = (result: boolean) => {
  console.log(titleVal, contentVal);
  if(result) {
    const { columnId } = mainStore.user
    if(columnId) {
      const newPost: PostProps = {
        id: new Date().getTime(),
        title: titleVal.value,
        content: contentVal.value,
        columnId,
        createAt: new Date().toLocaleDateString()
      }
      mainStore.createPost(newPost)
      router.push({ name: 'column', params: { id: columnId }})
    }
  }
}
</script>

<style lang="scss" scoped>

  .upDate-pic {
    margin: 20px 0;
    text-align: center;
    height: 200px;
    line-height: 200px;
    font-size: 32px;
    color: #67757d;
    background-color: #f8f9fa;
    cursor: pointer;
  }

</style>