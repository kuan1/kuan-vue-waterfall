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