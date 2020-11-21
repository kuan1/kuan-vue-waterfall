import { ref, onMounted, onBeforeMount } from 'vue'
import { debounce } from '@halobear/utils/throttle-debounce'
import WaterFallData from '../utils/WaterFallData'

export default (itemWidth, d = [], delay) => {
  const container = ref(null) // 父元素
  const data = ref(d) // 瀑布流数据
  const waterfall = ref(null) // 瀑布流数据管理
  const containerWidth = ref(0)
  const containerHeight = ref(0)

  const push = (newData = []) => {
    if (!newData.length) return
    data.value = waterfall.value.push(newData)
    containerHeight.value = waterfall.value.containerHeight
  }

  const initWaterFall = () => {
    const res = new WaterFallData(itemWidth, container.value)
    data.value = res.data
    containerWidth.value = res.containerWidth
    containerHeight.value = res.containerHeight

    if (!delay) {
      push(data.value)
    }
  }

  const resize = debounce(() => {
    data.value = waterfall.value.resize()
    containerWidth.value = waterfall.value.containerWidth
    containerHeight.value = waterfall.value.containerHeight
  })

  onMounted(() => {
    initWaterFall()
    window.addEventListener('resize', resize)
  })

  onBeforeMount(() => {
    window.removeEventListener('resize', resize)
  })


  return {
    push,
    container,
    containerWidth,
    containerHeight,
  }
}