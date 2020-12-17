# kuan-vue-waterfall （vue3.0 瀑布插件）

### [点击查看 demo ->](https://kuan1.github.io/kuan-vue-waterfall/demo)

> 不需要设置内容高度，间隙默认 `0`  
> 注意：如果没有图片需要延迟获取元素尺寸的话，可以设置`delay=false`，等待图片加载后显示元素体验比较差

## 安装

```bash
yarn add kuan-vue-waterfall
# order
npm install kuan-vue-waterfall
```

## 使用

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
- `gap {String|Number}`: 单个卡片之间边距
- `delay {Boolean}`: 是否等待卡片内图片加载完成

## 使用 demo

[点击查看](./test/App.vue)
