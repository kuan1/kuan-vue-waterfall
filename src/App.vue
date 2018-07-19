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
