# kuan-vue-waterfall

- 注意：注意当前分支为 vue3.0 版本，如果使用 2.0，可以切换 vue2 的分支

- 原理：实现原理是手动获取 slot 的大小，进行了计算瀑布流的位置，如果有图片会等图片 onload 才会显示

- 优化：如果没有图片或者 slot 中元素设置了内联样式的宽高，可以设置`delay=false`，这样体验会好很多

## LIVE DEMO

[DEMO 展示](https://kuan1.github.io/kuan-vue-waterfall/demo)

## 安装

```bash
yarn add kuan-vue-waterfall
# or
npm i kuan-vue-waterfall
```

## 使用

[查看使用示例](./test/App.vue)

```javascript
import WaterFall from 'kuan-vue-waterfall'

export default {
  components: {
    WaterFall,
  },
}
```

## 参数

##### `water-fall`属性

- `data {Array}`: 数据源列表 [{key: ''}]
- `width {String|Number}`: 单个卡片的宽度
- `gap {String|Number}`: 单个卡片之间边距，默认 0
- `delay {Boolean}`: 是否等待卡片内图片加载完成
