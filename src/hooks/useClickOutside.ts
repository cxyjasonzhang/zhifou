// 封装点击一个元素之外函数
import { ref, onMounted, onBeforeUnmount, Ref } from 'vue';

const useClickOutside = (elementRef: Ref<null | HTMLElement>) => {
  const isClickOutside = ref(false)
  const handler = (e:MouseEvent) => {
    if(elementRef.value) {
      if(!elementRef.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = true
      } else {
        isClickOutside.value = false
      }
    }
  }
  onMounted(()=>{
    document.addEventListener('click',handler)
  })
  onBeforeUnmount(()=>{
    document.removeEventListener('click',handler)
  })
  return isClickOutside
}

export default useClickOutside