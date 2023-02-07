<!-- 注册页面 -->
<template>
  <ValidateForm @form-submit="formSubmit">
    <template #title>
      <h3 class="mb-5 title">注册新用户</h3>
    </template>
    <div class="form-group mb-4">
      <label for="email">邮箱地址</label>
      <ValidateInput type="text" :rules="emailRules" 
        v-model="formData.email" id="email" 
        placeholder="请输入邮箱地址"
        ref="inputRef"
      ></ValidateInput>
    </div>
    <div class="form-group mb-4">
      <label for="nickName">昵称</label>
      <ValidateInput type="text" :rules="nickNameRules" 
        v-model="formData.nickName" id="nickName" 
        placeholder="请输入昵称"
        ref="inputRef"
      ></ValidateInput>
    </div>

    <div class="form-group mb-4">
      <label for="password">密码</label>
      <ValidateInput type="password" :rules="passwordRules"
        v-model="formData.password" 
        placeholder="请输入密码"
        id="password"
      ></ValidateInput>
    </div>
    <div class="form-group mb-4">
      <label for="password">重复密码</label>
      <ValidateInput type="password" :rules="repeatPasswordRules"
        v-model="formData.repeatPassword" 
        placeholder="请输入密码"
        id="password"
      ></ValidateInput>
    </div>
    <div>
      <a href="./Login">已有账号，去登录</a>
    </div>
    <template #submit>
      <button type="submit" class="btn btn-primary mt-2 w-100">注册新用户</button>
    </template>
  </ValidateForm>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import ValidateForm from '../components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import { useMainStore } from '../store'
import { useRouter } from 'vue-router'
import createMessage from '../components/createMessage'
export default defineComponent ({
  components:{
    ValidateForm,
    ValidateInput
  },
  setup() {
    const mainStore = useMainStore()
    const router = useRouter()
    const formData = reactive({
      email: '',
      nickName: '',
      password: '',
      repeatPassword: ''
    })
    // 验证规则
    const emailRules: RulesProp = [
      { type: 'required', message: '邮箱地址不能为空！'},
      { type: 'email', message: '请输入正确的邮箱地址！'}
    ]
    const nickNameRules: RulesProp = [
      { type: 'required', message: '昵称不能为空!'}
    ]
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空！' }
    ]
    const repeatPasswordRules: RulesProp = [
      { type:'required', message: '请再次输入密码！' },
      { type: 'custom', 
      validator: () => formData.password === formData.repeatPassword,
      message: '两次输入的密码不相同！'}
    ]
    const formSubmit = (result: boolean) => {
      if(result) {
        const payload = {
          email: formData.email,
          nickName: formData.nickName,
          password: formData.password
        }
        mainStore.signup(payload).then(res => {
          console.log(res)
          createMessage('注册成功 正在跳转到登录页', 'success')
          setTimeout(() => {
            router.push('/login')
          }, 1000)
        }).catch(err => {
          console.log(err)
        })
      }
    }
    return {
      formData,
      emailRules,
      nickNameRules,
      passwordRules,
      repeatPasswordRules,
      formSubmit
    }
  }
})
</script>

<style scoped>

</style>