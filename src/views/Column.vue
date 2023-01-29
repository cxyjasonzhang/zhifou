<template>
  <div>
    <pre>{{route}}</pre>
  </div>
</template>

<script lang="ts">
import { useRoute } from 'vue-router'
import { defineComponent } from 'vue'
export default defineComponent ({
  setup () {
    const route = useRoute()

    return {
      route
    }
  }
})
</script>

<style lang="scss" scoped>

</style>