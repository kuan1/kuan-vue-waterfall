import { ref, onMounted, onBeforeMount } from 'vue'
import { debounce } from '@halobear/utils/throttle-debounce'
import WaterFallData from '../utils/WaterFallData'

export default () => {
  const container = ref(null)
  const dataList = ref([])
  const waterFallData = ref(null)
  const tempList = [] // 缓存加载完成数据，防止页面刷新次数过多

  const initWaterFall = () => {
    waterFallData.value = new WaterFallData()
  }

  const debouncePush = debounce(() => {
    dataList.value = waterFallData.value.push(tempList)
  })

  const push = (item) => {
    tempList.push(item)
    debouncePush(tempList)
  }

  const resize = debounce(() => {
    waterFallData.value.resize()
  })

  onMounted(() => {
    initWaterFall()
    window.addEventListener('resize', resize)
  })

  onBeforeMount(() => {
    window.removeEventListener('resize', resize)
  })

  return {
    container,
    dataList,
    push
  }
}