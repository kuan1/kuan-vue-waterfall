<template>
  <div :style="{width: width, padding: gap}" class="water-fall-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    order: {
      type: Number,
      required: true
    }
  },
  computed: {
    width() {
      const { width } = this.$parent
      return width
    },
    gap() {
      const { gap } = this.$parent
      return gap
    }
  }
}
</script>

<style lang="scss" scoped>
.water-fall-item {
  left: 0;
  top: 0;
  position: absolute;
  transition: left 0.3s, right 0.3s, opacity 0.1s;
}
</style>

<style lang="scss">
.water-fall-item {
  & > div,
  img {
    display: block;
    width: 100%;
  }
}
</style>
