import WaterFall from './WaterFall'
import WaterFallItem from './WaterFallItem'

const install = (Vue) => {
  Vue.component('water-fall', WaterFall)
  Vue.component('water-fall-item', WaterFallItem)
}

export default {
  WaterFall,
  WaterFallItem,
  install
}
