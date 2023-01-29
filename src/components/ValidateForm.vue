<template>
  <div class="form-container">
    <slot name="title"></slot>
    <form>
      <!-- 使用插槽将表单组件和提交按钮插进来 表单为默认插槽 -->
      <slot name="default"></slot>
      <div class="submit-area" @click.prevent="submitForm">
        <slot name="submit">
          <button type="submit" class="btn btn-primary mt-2 w-100">登录</button>
        </slot>      
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import mitt from 'mitt'
import { defineComponent, onUnmounted } from 'vue';
// 解决报错  加类型判断
type Events =  {
  'form-item-created': () => boolean,
}
type validateFunc = () => boolean
export const emitter = mitt<Events>()
export default defineComponent({
  name:'ValidateForm',
  emits: ['form-submit'],
  setup (props, context) {
    let funcArr: validateFunc[] = []
    const submitForm = () => {
      // 全部都要验证
      const result = funcArr.map(func => func()).every(result => result)
      context.emit('form-submit', result)
    }
    const callback = (func: validateFunc) => {
      funcArr.push(func)
    }
    emitter.on('form-item-created', callback)
    onUnmounted(() => {
      emitter.off('form-item-created')
    })
    return {
      submitForm
    }
  },
})
</script>
 
<style lang="scss" scoped>
.form-container {
  max-width: 680px;
  margin: 100px auto;
}
.title {
  text-align: center;
  font-weight: 700;
  font-size: 30px;
}

</style>