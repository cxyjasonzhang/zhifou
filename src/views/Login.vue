<template>
  <ValidateForm @form-submit="formSubmit">
    <template #title>
      <h3 class="mb-5 title">登录到知乎</h3>
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
      <label for="password">密码</label>
      <ValidateInput type="password" :rules="passwordRules"
      v-model="formData.password" 
      placeholder="请输入密码"
      id="password"
    ></ValidateInput>
    </div>
    <template #submit>
      <button type="submit" class="btn btn-primary mt-2 w-100">登录</button>
    </template>
  </ValidateForm>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useMainStore } from '../store'
import ValidateForm from '../components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
export default defineComponent ({
  components:{
    ValidateForm,
    ValidateInput
  },
  setup () {
    const mainStore = useMainStore()
    // const router = useRouter()
    // 跟用户输入的数据进行双向绑定
    const formData = reactive({
      email: '',
      password: ''
    })
    // 邮箱验证规则
    const emailRules: RulesProp = [
      {type: 'required', message: '电子邮箱地址不能为空！'},
      {type: 'email', message: '请输入正确的电子邮箱地址！'},
    ]
    // 密码验证规则
    const passwordRules: RulesProp = [
      {type: 'required', message: '密码不能为空！'},
      {type: 'range', message: '密码长度必须为6-16个字符！'}
    ]
    const formSubmit = (isValid: boolean) => {
      if(isValid) {
        mainStore.login(formData)
      }
    }
    return {
      formData,
      emailRules,
      passwordRules,
      formSubmit
    }
  }
})
</script>

<style lang="scss" scoped>

</style>