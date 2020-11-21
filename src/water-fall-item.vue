<template>
  <div class="water-fall-item" ref="container" :class="{ loaded: loaded }">
    <slot></slot>
  </div>
</template>

<script>
import { nextTick, onMounted, ref } from 'vue';
import loadImages from './utils/loadImages';

export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    preload: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['load'],
  setup(props, { emit }) {
    const container = ref();
    const loaded = ref(false);
    const load = async () => {
      if (!props.preload) {
        await nextTick();
        return (loaded.value = true);
      }
      await loadImages(container.value.querySelectorAll('img'));
      loaded.value = true;
      emit('load', { ...props.item, height: container.value ? container.value.clientHeight : 200 });
    };
    onMounted(load);

    return { container, loaded };
  },
};
</script>
