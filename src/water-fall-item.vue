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
    delay: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['load'],
  setup(props, { emit }) {
    const container = ref();
    const getItemData = () => ({
      ...props.item,
      height: container.value ? container.value.clientHeight : 200,
    });

    const delayLoad = async () => {
      await loadImages(container.value.querySelectorAll('img'));
      setTimeout(() => {
        emit('load', getItemData());
      }, 150);
    };

    const load = () => {
      emit('load', getItemData());
    };

    onMounted(props.delay ? delayLoad : load);

    return { container };
  },
};
</script>
