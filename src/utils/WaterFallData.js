import { finMinIndex, getDefaultArr } from './util'

export default class WaterFallData {
  constructor(itemWidth = 0, container) {
    this.container = container // 容器dom
    this.data = [] // 数据源
    this.containerWidth = 0 // 容器最大宽度
    this.containerHeight = 0 // 容器高度
    this.itemWidth = itemWidth // 卡片宽度
    this.colNum = this.setColNum() // 列数
    this.heightList = getDefaultArr(this.colNum) // 高度
  }

  // 新增数据
  push(data = []) {
    data.forEach(item => {
      const minIndex = finMinIndex(this.heightList)
      !item.left && (item.left = minIndex * this.itemWidth)
      !item.top && (item.top = Math.min(...this.heightList))
      this.heightList[minIndex] += (item.height || 100)
      data.push(item)
    })
    this.containerHeight = Math.max(...this.heightList, 0)
    this.data = this.data.length ? [...this.data, ...data] : data
    return this.iret()
  }

  // 重置
  resize(newData = this.data) {
    this.colNum = this.setColNum()
    const data = newData
    // 高度记录
    this.heightList = getDefaultArr(this.colNum)
    // 原数据
    this.data = []
    // 执行分组数据
    return this.push(data)
  }

  setColNum() {
    this.colNum = Math.floor(this.container.clientWidth / this.itemWidth)
    this.containerWidth = this.colNum * this.itemWidth
    return this.colNum
  }

  iret() {
    return {
      data: this.data,
      containerHeight: this.containerHeight,
      containerWidth: this.containerWidth
    }
  }
}

/**
 * const data = [] // 数据 [{width: 100, height: 100}]
 * const water = new WaterfallData() // 数据控制
 * const temp = water.temp // 当前瀑布流数据
 * water.push(newData) // 添加数据
 */
