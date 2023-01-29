<template>
  <teleport to="#message">
      <div class="alert fixed-top w-25 mx-auto d-flex justify-content-around align-items-center py-1 mt-2"
      :class="classObj" 
      role="alert"
      v-if="isVisible"
      >
        <h4 class="my-0">{{ message }}</h4>
        <button type="button" class="close_add py-1" @click.prevent="hide">
          <span>&times;</span>
        </button>
      </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, PropType, ref} from 'vue'
import useDOMCreate from '../hooks/useDOMCreate'
export type MessageType = 'success' | 'error' | 'default'
export default defineComponent({
  props: {
    message: String,
    type: {
      type: String as PropType<MessageType>,
      default: 'default'
    }
  },
  emits: ['close-message'],
  setup(props, context) {
    const isVisible = ref(true)
    const classObj = {
      'alert-success': props.type === 'success',
      'alert-danger': props.type === 'error',
      'alert-primary': props.type === 'default'
    }
    useDOMCreate('message')
    const hide = () => {
      isVisible.value = false
      context.emit('close-message', true)
    }
    return {
      classObj,
      isVisible,
      hide
    }
  }
})
</script>

<style scoped>
.close_add {
  background: transparent;
  border-style: none;
}

.close_add span {
  font-size: 25px;
}

.close_add:hover {
  border: none;
  font-weight: 700;
}
</style>