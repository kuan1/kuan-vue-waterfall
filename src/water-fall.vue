<template>
  <div>
    <div
      class="kuan-vue-waterfall"
      ref="container"
      :style="{ width: autoContainerWidth, height: `${containerHeight}px` }"
    >
      <water-fall-item
        v-for="item in list"
        :key="item.key || item.id"
        :item="item"
        :style="{
          padding: padding,
          width: itemWidth,
          left: `${item.left || 0}px`,
          top: `${item.top || 0}px`,
        }"
      >
        <slot v-bind="item"></slot>
      </water-fall-item>
    </div>

    <div v-if="delay && data.length > list.length" class="water-fall-more">
      <i class="waterfall-loading"></i>
      <span>加载中...</span>
    </div>
  </div>
</template>

<script>
import { computed, watch } from 'vue';

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
    delay: {
      type: Boolean,
      default: true,
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
    // 宽度+padding
    const fullItemWidth = parseInt(props.width) + parseInt(props.gap) * 2;
    const { list, push, reset, container, containerWidth, containerHeight } = useWaterfall(
      fullItemWidth,
      props.data,
      props.delay
    );
    const itemWidth = computed(() => autoUnit(props.width));
    const padding = computed(() => autoUnit(props.gap));

    const autoContainerWidth = computed(
      () => (containerWidth.value && `${containerWidth.value}px`) || '100%'
    );

    const load = (item) => {
      item.key && push([item]);
    };

    watch(
      () => props.data,
      () => reset(props.data)
    );

    return {
      list,
      container,
      autoContainerWidth,
      containerHeight,
      padding,
      itemWidth,
      load,
    };
  },
};
</script>

<style lang="less">
.kuan-vue-waterfall {
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}

.water-fall-item {
  opacity: 0;
  box-sizing: content-box;
  position: absolute;
  left: 0;
  top: 100%;
  &.loaded {
    opacity: 1;
  }
}

.water-fall-more {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  padding: 1em 0;
}

.waterfall-loading {
  width: 20px;
  height: 20px;
  display: inline-block;
  vertical-align: middle;
  animation: waterfallLoading 1s steps(12, end) infinite;
  background: transparent
    url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 100 100'%3E%3Cpath fill='none' d='M0 0h100v100H0z'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23E9E9E9' rx='5' ry='5' transform='translate(0 -30)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23989697' rx='5' ry='5' transform='rotate(30 105.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%239B999A' rx='5' ry='5' transform='rotate(60 75.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23A3A1A2' rx='5' ry='5' transform='rotate(90 65 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23ABA9AA' rx='5' ry='5' transform='rotate(120 58.66 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23B2B2B2' rx='5' ry='5' transform='rotate(150 54.02 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23BAB8B9' rx='5' ry='5' transform='rotate(180 50 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23C2C0C1' rx='5' ry='5' transform='rotate(-150 45.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23CBCBCB' rx='5' ry='5' transform='rotate(-120 41.34 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23D2D2D2' rx='5' ry='5' transform='rotate(-90 35 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23DADADA' rx='5' ry='5' transform='rotate(-60 24.02 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23E2E2E2' rx='5' ry='5' transform='rotate(-30 -5.98 65)'/%3E%3C/svg%3E")
    no-repeat;
  background-size: 100%;
  margin-right: 0.2em;
}

@keyframes waterfallLoading {
  0% {
    transform: rotate3d(0, 0, 1, 0deg);
  }

  100% {
    transform: rotate3d(0, 0, 1, 360deg);
  }
}
</style>