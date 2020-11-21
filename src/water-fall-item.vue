<template>
  <div class="water-fall-item" :class="{ loaded: loaded }">
    <slot></slot>
  </div>
</template>

<script>
import loadImages from './utils/loadImages';

export default {
  data() {
    return {
      loaded: false,
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    async load() {
      await loadImages(this.$el.querySelectorAll('img'));
      this.loaded = true;
    },
  },
};
</script>
