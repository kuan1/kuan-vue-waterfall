<template>
  <div class="water-fall-item" ref="container">
    <slot></slot>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import loadImages from './utils/loadImages';

export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['load'],
  setup(props, { emit }) {
    const container = ref();
    const load = async () => {
      await loadImages(container.value.querySelectorAll('img'));
      setTimeout(() => {
        emit('load', {
          ...props.item,
          height: container.value ? container.value.clientHeight : 200,
        });
      }, 200);
    };
    onMounted(load);

    return { container };
  },
};
</script>
