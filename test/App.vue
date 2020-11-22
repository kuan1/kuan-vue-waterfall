<template>
  <div v-if="data.length">
    <water-fall gap="10px" width="250px" class="container" :data="data" :delay="true">
      <template #default="item">
        <div class="card">
          <img class="img" :src="item.src" @click="preview(item.src, $event)" />
          <p>{{ item.src }}</p>
        </div>
      </template>
    </water-fall>

    <button class="halo-btn halo-btn-primary" @click.stop.prevent="loadMore">加载更多</button>
  </div>
</template>

<script>
import WaterFall from 'kuan-vue-waterfall';
import { loading } from 'kuan-request';
import photoSwipe from 'kuan-vue-photoswipe';

export default {
  components: {
    WaterFall,
  },
  data() {
    return {
      payload: {
        page: 1,
        size: 18,
      },
      total: 0,
      data: [],
    };
  },
  computed: {
    hasMore() {
      const { page, size } = this.payload;
      return page * size < this.total;
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    preview(url, e) {
      const { width, height } = e.target;
      photoSwipe.preview(width ? [{ src: url, w: width, h: height }] : url);
    },
    async fetchData() {
      const { page, size } = this.payload;
      const prev = (page - 1) * size;
      const images = [...Array(this.payload.size).keys()].map((key) => ({
        key: key + 1 + prev,
        src: require(`./images/${key}.jpg`),
      }));
      console.log(images);
      loading.show();
      this.total = 500;
      this.data = [...this.data, ...images];
      loading.hide();
    },
    loadMore() {
      if (this.hasMore) {
        this.payload.page += 1;
        this.fetchData();
      }
    },
  },
};
</script>

<style lang="less">
body {
  background-color: #f2f3f8;
}

.container {
  min-height: 90vh;
}

.card {
  padding: 10px;
  background-color: white;
  border-radius: 3px;
  color: #666;
  line-height: 1.5;
  word-break: break-all;
  .img {
    width: 100%;
    margin-bottom: 5px;
    cursor: pointer;
  }
}
.halo-btn {
  margin: 100px auto;
  display: block;
}
</style>