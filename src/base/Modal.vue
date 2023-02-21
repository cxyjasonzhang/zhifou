<template>
  <!-- 删除弹出框 -->
  <teleport to="#modal">
    <div class="modal d-block" style="background-color: rgba(0, 0, 0, .6);" tabindex="-1" v-if="visible">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ title }}</h5>
          </div>
          <div class="modal-body">{{ content }}
          <p>
            <slot></slot>
          </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="onClose">取消</button>
            <button type="button" class="btn btn-primary" @click="onConfirm">删除</button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useDOMCreate from '../hooks/useDOMCreate';

export default defineComponent({
  name: 'Modal',
  props: {
    title: String,
    content: String,
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['modal-on-close', 'modal-on-confirm'],
  setup(props, context) {
    console.log(props.visible)
    useDOMCreate('modal')
    const onClose = () =>{
      context.emit('modal-on-close')
    }
    const onConfirm = () => {
      context.emit('modal-on-confirm')
    }
    return {
      onClose,
      onConfirm
    }
  }
})


</script>

<style lang="scss" scoped>

</style>