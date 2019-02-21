# kuan-vue-waterfall （vue 瀑布插件）

### [https://kuan1.github.io/kuan-vue-waterfall/demo](https://kuan1.github.io/kuan-vue-waterfall/demo)

> 不需要设置内容高度，间隙默认 0
> 自动监听数据变化，自适应视口宽度

## 安装

```
yarn add kuan-vue-waterfall
# order
npm install kuan-vue-waterfall
```

![image](http://pic.luzhongkuan.cn/1532051693115.png?a=1)

## 使用

```
 // 全局注册
 import waterFall from 'kuan-vue-waterfall'
 Vue.use(waterFall) // 全局注册

 // 局部使用
 import { WaterFall, WaterFallItem } from 'kuan-vue-waterfall'
```

## 参数

##### `water-fall`属性

- data： 自动监听数据更新布局 (Array)
- gap： 间隙 (String[`10rem` or `20px`])
- width： 单列的宽度（包括间隙) (String[`10rem` or `20px`])

##### `water-fall-item`属性

- order: 排序顺序 (Number)

## DEMO

```
<template>
  <div v-if="data.length">
    <water-fall :data="data" gap="20px" width="200px">
      <water-fall-item v-for="(item, index) in data" :key="index" :order="index">
        <div class="item">
          <img :src="item" />
        </div>
      </water-fall-item>
    </water-fall>

    <button v-if="hasMore" class="add-btn" @click="copyData">加载更多</button>
  </div>
</template>

<script>
import { WaterFall, WaterFallItem } from '../src'
import { loadImages } from 'kuan-utils'
import { loading } from 'kuan-request'

export default {
  data() {
    return {
      payload: {
        page: 1,
        size: 30
      },
      total: 0,
      data: []
    }
  },
  computed: {
    hasMore() {
      const { page, size } = this.payload
      return page * size < this.total
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const data = await this.$http({
        url: '/qn/list',
        params: this.payload,
      })
      loading.show()
      this.total = data.total
      const images = data.content.map(item => item.url)
      await loadImages(images)
      this.data = [...this.data, ...images]
      loading.hide()
    },
    copyData() {
      if (this.hasMore) {
        this.payload.page += 1
        this.fetchData()
      }
    }
  },
  components: {
    WaterFall,
    WaterFallItem
  }
}
</script>

<style scoped lang="scss">
.item {
  padding: 8px;
  background: #1da57a;
}

.add-btn {
  font-size: 30px;
  display: block;
  padding: 20px;
  margin: 20px auto;
}
</style>
```

# 更新日志

2.0.0

- 组件销毁，取消事件监听
- 取消 css 分离，方便引入
