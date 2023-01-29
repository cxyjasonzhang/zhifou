<template>
  <div>
    <input
      v-if="tag !== 'textarea'"
      :value="inputRef.val" 
      class="form-control mt-2 position-relative" 
      :class="{'is-invalid': inputRef.error}" 
      @blur="validateInput"
      @input="updateValue"
      v-bind="$attrs"
    >
    <textarea
      v-else
      :value="inputRef.val" 
      class="form-control mt-2 position-relative" 
      :class="{'is-invalid': inputRef.error}" 
      @blur="validateInput"
      @input="updateValue"
      v-bind="$attrs"
    ></textarea>
    <div id="email" class="invalid-feedback position-absolute" style="display: block;width: 350px;" v-if="inputRef.error">{{inputRef.message}}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, onMounted } from 'vue';
import { emitter } from './ValidateForm.vue'
// 验证邮箱的正则
const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
interface RuleProp {
  type: 'required' | 'email' | 'range' | 'custom';
  message: string;
  validator?: () => boolean;
}
export type RulesProp = RuleProp[]
export type TagType = 'input' | 'textarea'
export default defineComponent({
  name:'ValidateInput',
  props: {
    rules: Array as PropType<RulesProp>,
    // vue3 自定义组件实现v-model
    modelValue: String,
    tag: {
      type: String as PropType<TagType>,
      default: 'input'
    }
  },
  // 不会将父组件在子组件上添加的属性加到子组件的根元素上如：class placeholder
  inheritAttrs: false,
  setup (props, context) {
    
    const inputRef = reactive({
      val: props.modelValue || '',
      error: false,
      message: ''
    })
    // 该事件类型为键盘事件 
    const updateValue = (e: Event) => {
      const targetValue = (e.target as HTMLInputElement).value
      inputRef.val = targetValue
      context.emit('update:modelValue', targetValue)
    }
    // 根据规则验证表单
    const validateInput = () => {
      if(props.rules) {
        const allPassed = props.rules.every(rule => {
          let passed = true
          inputRef.message = rule.message
          switch (rule.type) {
            case 'required':
              passed = (inputRef.val.trim() !== '')
              break;
            case 'email':
              passed = emailReg.test(inputRef.val)
              break;
            case 'range':
              passed = (inputRef.val.length >= 6 && inputRef.val.length <= 16)
              break;
            case 'custom':
              passed = passed = rule.validator ? rule.validator() : true
              break;
            default:
              passed = true
              break;
          }
          return passed
        })
        inputRef.error = !allPassed
        return allPassed
      }
      return true
    }
    onMounted(() => {
      emitter.emit('form-item-created', validateInput)
    })
    return {
      inputRef,
      validateInput,
      updateValue
    }
  }
})
</script>

<style lang="scss" scoped>

</style>