<template>
  <div v-if="data.length">
    <water-fall :data="data" gap="10px" width="200px">
      <template #default="item">
        <div class="card">
          <img class="img" :src="item.src" />
          <p>{{ item.src }}</p>
        </div>
      </template>
    </water-fall>

    <div class="load-more">
      <i class="halo-loading"></i>
      <span>加载中...</span>
    </div>
  </div>
</template>

<script>
import WaterFall from 'kuan-vue-waterfall';
import { loading } from 'kuan-request';

export default {
  components: {
    WaterFall,
  },
  data() {
    return {
      payload: {
        page: 1,
        size: 30,
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
    async fetchData() {
      const data = await this.$http({
        url: '/qn/list',
        params: this.payload,
      });
      loading.show();
      this.total = data.total;
      const images = data.content.map((item) => ({
        key: item.id,
        src: item.url,
      }));
      this.data = [...this.data, ...images];
      loading.hide();
    },
    copyData() {
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

.card {
  padding: 10px;
  background-color: white;
  border-radius: 3px;
  color: #666;
  line-height: 1.5;
  word-break: break-all;
  img {
    width: 100%;
    margin-bottom: 5px;
  }
}

.load-more {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  padding: 1em 0;
  .halo-loading {
    margin-right: 0.2em;
  }
}
</style>