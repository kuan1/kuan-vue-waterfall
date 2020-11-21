import { finMinIndex, getDefaultArr } from './util'

export default class WaterFallData {
  constructor(itemWidth = 0, colNum) {
    this.data = [] // 数据源
    this.colNum = colNum // 列数
    this.containerHeight = 0 // 容器高度
    this.itemWidth = itemWidth // 卡片宽度
    this.heightList = getDefaultArr(this.colNum) // 高度
  }

  // 初始化数据
  init(data = []) {
    // 清空高度
    this.data = []
    // 高度记录
    this.heightList = getDefaultArr(this.colNum)
    return this.prepare(data)
  }

  // 新增数据
  prepare(data = []) {
    data.forEach((item) => {
      const minIndex = finMinIndex(this.heightList)
      if (!item.loaded) {
        item.left = minIndex * this.itemWidth
        item.top = Math.min(...this.heightList)
        item.loaded = 1
      }
      this.heightList[minIndex] += item.height || 100
    })
    this.containerHeight = Math.max(...this.heightList, 0)
    this.data = this.data.length ? [...this.data, ...data] : data
    return this.iret()
  }

  // 重置
  resize(itemWidth, colNum) {
    this.itemWidth = itemWidth
    this.colNum = colNum
    const data = this.data.map((item) => {
      item.loaded = 0
      return item
    })
    // 执行分组数据
    return this.init(data)
  }

  iret() {
    return {
      data: this.data,
      containerHeight: this.containerHeight,
    }
  }
}

/**
 * const data = [] // 数据 [{width: 100, height: 100}]
 * const water = new WaterfallData() // 数据控制
 * const temp = water.temp // 当前瀑布流数据
 * water.push(newData) // 添加数据
 */
