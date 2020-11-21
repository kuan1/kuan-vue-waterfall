<template>
  <div class="kuan-vue-waterfall" ref="container">
    <water-fall-item
      v-for="item in list"
      :key="item.key || item.id"
      :style="{ padding: padding, width: itemWidth }"
    >
      <slot v-bind="item"></slot>
    </water-fall-item>
  </div>
</template>

<script>
import { computed } from 'vue';

import useWaterfall from './composables/use-waterfall';
import { autoUnit } from './utils/util';

import WaterFallItem from './water-fall-item';

export default {
  name: 'WaterFall',
  components: {
    WaterFallItem,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    gap: {
      type: [Number, String],
      default: 0,
    },
    width: {
      type: [Number, String],
      default: 200,
    },
  },
  setup(props) {
    const { dataList, container } = useWaterfall();
    const itemWidth = computed(() => autoUnit(props.width));
    const padding = computed(() => autoUnit(props.gap));

    const list = computed(() => {
      return dataList.value.length ? dataList.value : props.data.length ? [props.data[0]] : [];
    });

    return {
      list,
      container,
      padding,
      itemWidth,
    };
  },
};
</script>