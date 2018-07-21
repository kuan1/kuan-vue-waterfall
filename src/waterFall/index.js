import WaterFall from './WaterFall'
import WaterFallItem from './WaterFallItem'

const install = (Vue) => {
  Vue.component('water-fall', WaterFall)
  Vue.component('water-fall-item', WaterFallItem)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export {
  WaterFall,
  WaterFallItem
}

export default {
  WaterFall,
  WaterFallItem,
  install
}
