# kuan-vue-waterfall （vue瀑布插件）

### [https://kuan1.github.io/kuan-vue-waterfall/demo](https://kuan1.github.io/kuan-vue-waterfall/demo)
>  不需要设置内容高度，间隙默认0
>  自动监听数据变化，自适应视口宽度

## 安装
```
yarn add kuan-vue-waterfall
```
【or】
```
npm install kuan-vue-waterfall
```

![image](http://pic.luzhongkuan.cn/1532051693115.png)

## 全局注册
```
 import waterFall from './waterFall'
 Vue.use(waterFall) 全局注册
```

## 参数
##### `water-fall`属性
- data： 自动监听数据更新布局   (Array)
- grap： 间隙   (String[`10rem` or `20px`])
- width： 单列的宽度（包括间隙) (String[`10rem` or `20px`])
##### `water-fall-item`属性
- order: 排序顺序 (Number)

## 使用demo
```
<template>
  <div>
    <water-fall :data="data" gap="20px" width="200px">
      <water-fall-item v-for="(item, index) in data" :key="App" :order="App">
        <div class="item">
          <img :src="item"/>
        </div>
      </water-fall-item>
    </water-fall>

    <button class="add-btn" @click="copyData">复制数据</button>
  </div>
</template>

<script>
  import waterFall from './waterFall'
  const {WaterFall, WaterFallItem} = waterFall

  export default {
    data() {
      return {
        data: [
          require('./images/1.jpg'),
          require('./images/2.jpg'),
          require('./images/3.jpg'),
          require('./images/4.png'),
          require('./images/1.jpg'),
          require('./images/2.jpg'),
          require('./images/3.jpg'),
          require('./images/4.png'),
          require('./images/1.jpg'),
          require('./images/2.jpg'),
          require('./images/3.jpg'),
          require('./images/4.png')
        ]
      }
    },
    methods: {
      copyData() {
        this.data = [...this.data, ...this.data]
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
f
