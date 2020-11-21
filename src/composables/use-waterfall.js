import { ref, onMounted, onBeforeMount } from 'vue'
import { debounce } from '@halobear/utils/throttle-debounce'
import WaterFallData from '../utils/WaterFallData'

export default (itemWidth, data = [], delay) => {
  const container = ref(null) // 父元素
  const list = ref(data) // 瀑布流数据
  const waterfall = ref(null) // 瀑布流数据管理
  const containerWidth = ref(0)
  const containerHeight = ref(0)

  const setData = (res) => {
    list.value = res.data
    containerWidth.value = res.containerWidth
    containerHeight.value = res.containerHeight
  }

  const push = (newData = []) => {
    if (!newData.length) return
    setData(waterfall.value.push(newData))
  }

  const initWaterFall = () => {
    waterfall.value = new WaterFallData(itemWidth, container.value)
    if (!delay) {
      push(list.value)
    }
  }

  const reset = (newData) => {
    const res = waterfall.value.resize(newData)
    setData(res)
  }

  const windowResize = debounce(() => {
    if (!waterfall.value) return
    reset()
  })

  onMounted(() => {
    initWaterFall()
    window.addEventListener('resize', windowResize)
  })

  onBeforeMount(() => {
    window.removeEventListener('resize', windowResize)
  })


  return {
    list,
    push,
    reset,
    container,
    containerWidth,
    containerHeight,
  }
}