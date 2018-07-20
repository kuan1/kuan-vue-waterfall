<template>
  <div :style="{height: `${height}px`}" class="water-fall-container">
    <div ref="wraper" :style="{opacity: isReady ? 1 : 0.2}" class="water-fall-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import {debounce} from './util/util'

  export default {
    props: {
      width: {
        type: String, // '0', '10px', '10rem'
        default: '300px'
      },
      gap: {
        type: String, // '0', '10px', '10rem'
        default: 0
      },
      data: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        height: 0,
        itemWidth: 0,
        isReady: false
      }
    },
    watch: {
      data() {
        // 监听数据变化，重置瀑布流
        this.initWaterFall()
      }
    },
    methods: {
      async allReady() {
        // 排序自组件
        const children = this.$children.sort((a, b) => a - b)
        const len = children.length
        const promiseMap = []
        for (let i = 0; i < len; i++) {
          const {$el} = this.$children[i]
          promiseMap.push(isReady($el))
        }
        // 图片加载完成
        return await Promise.all(promiseMap)
      },
      getColNum() {
        // 获取列数，设置容器宽度
        const conW = this.$el.clientWidth
        const itemW = this.$children[0].$el.clientWidth
        const colNum = ~~(conW / itemW)
        this.$refs.wraper.style.width = `${colNum * itemW}px`
        this.itemWidth = itemW
        return colNum
      },
      setPos(hMap) {
        const len = this.$children.length
        for (let i = 0; i < len; i++) {
          // 获取最小高度对应组下标
          const minHeight = Math.min(...hMap)
          const minIndex = hMap.findIndex((item) => item === minHeight)

          // 设置item位置
          const {$el} = this.$children[i]
          hMap[minIndex] += $el.clientHeight
          $el.style.left = `${this.itemWidth * minIndex}px`
          $el.style.top = `${minHeight}px`

          // 设置最外层容器高度
          this.height = Math.max(...hMap)
        }
      },
      async initWaterFall() {
        // 初始化瀑布流
        if (!this.$children.length) {
          console.warn('not found waterFallItem')
          return
        }
        // 等待图片加载
        await this.allReady()
        this.isReady = true
        // 设置容器宽度
        const colNum = this.getColNum()
        // 获取默认各组高度
        const hMap = getDefaultHeightMap(colNum)
        this.setPos(hMap)
      }
    },
    mounted() {
      // 初始化瀑布流
      this.initWaterFall()

      window.addEventListener('resize', debounce(() => {
        this.initWaterFall()
      }))
    }
  }

  // 等待图片加载完成，获取高度（在resize的时候等待图片加载),只会判断每个waterFallItem组件中，只能放一张图片
  function isReady(el) {
    return new Promise(resolve => {
      let img
      if (el.tagName === 'IMG') {
        img = el
      } else {
        img = el.querySelector('img')
      }
      if (!img) {
        resolve()
      } else if (img.complete) {
        resolve()
        return
      }
      img.onload = resolve
      img.onerror = resolve
    })
  }

  // 获取各组默认高度 [0, 0, 0 ...]
  function getDefaultHeightMap(colNum = 1, arr = []) {
    if (arr.length < colNum) {
      arr.push(0)
      return getDefaultHeightMap(colNum, arr)
    }
    return arr
  }
</script>

<style>
  /*.water-fall-container {*/
    /*background: #f5f5f5;*/
  /*}*/

  .water-fall-wrapper {
    position: relative;
    margin: 0 auto;
    height: 200px;
  }
</style>
