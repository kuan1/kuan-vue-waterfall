import { finMinIndex, getDefaultArr } from './util'

export default class WaterFallData {
  constructor(colNum = 3) {
    this.heightList = getDefaultArr(colNum)
    this.dataList = getDefaultArr(colNum, [], () => [])
    this.data = []
  }

  // 新增数据
  push(data = this.data) {
    this.data.push(...data)
    data.forEach(item => {
      const minIndex = finMinIndex(this.heightList)
      this.heightList[minIndex] += (item.height || 100)
      this.dataList[minIndex].push(item)
    })
    return this.dataList
  }

  // 重置
  resize(colNum) {
    const data = this.data
    // 高度记录
    this.heightList = getDefaultArr(colNum)
    // 分组数据
    this.dataList = getDefaultArr(colNum, [], () => [])
    // 原数据
    this.data = []
    // 执行分组数据
    return this.push(data)
  }
}

/**
 * const data = [] // 数据 [{width: 100, height: 100}]
 * const water = new WaterfallData(data) // 数据控制
 * const dataList = water.dataList // 当前瀑布流数据
 * water.push(newData) // 添加数据
 */
