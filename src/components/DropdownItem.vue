<template>
  <li class="dropdown-option" :class="{'item-disabled':disabled}">
    <slot></slot>
  </li>
</template>

<script lang="ts">
export default {
  props: {
    disabled:{
      type: Boolean,
      default: false
    }
  },
  setup () {
    

    return {}
  }
}
</script>

<style lang="scss">
.dropdown-option.item-disabled * {
  color: $color;
  pointer-events: none;
  background-color: transparent;
}
</style>