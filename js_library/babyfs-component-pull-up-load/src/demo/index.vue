<template>
  <babyfs-pull-up-load @to-bottom="global" :disabled="loading || !isMore">
    <div class="demo-container">
      <babyfs-pull-up-load @to-bottom="part" self :disabled="loading || !isMore">
        <div class="part">
          <div class="part-item" v-for="(item, index) in partData" :key="index">{{item}}</div>
          <div class="part-item">{{isMore ? '正在加载中' : '没有更多了'}}</div>
        </div>
      </babyfs-pull-up-load>
      <div class="global-item" v-for="(item, index) in globalData" :key="index">{{item}}</div>
      <div class="global-item">{{isMore ? '正在加载中' : '没有更多了'}}</div>
    </div>
  </babyfs-pull-up-load>
</template>

<script>
export default {
  name: 'demo',
  data() {
    return {
      globalData: null,
      partData: null,
      loading: false,
      isMore: true
    };
  },
  created() {
    this.globalData = new Array(20).fill('globalData');
    this.partData = new Array(20).fill('partData');
  },
  methods: {
    global() {
      this.loading = true;
      setTimeout(() => {
        this.globalData = this.globalData.concat(new Array(20).fill('globalData'));
        this.loading = false;
        if (this.globalData.length > 100) {
          this.isMore = false;
        }
      }, 2000);
    },
    part() {
      this.loading = true;
      setTimeout(() => {
        this.partData = this.partData.concat(new Array(20).fill('partData'));
        this.loading = false;
        if (this.partData.length > 100) {
          this.isMore = false;
        }
      }, 2000);
    }
  }
};
</script>

<style lang="less">
  * {
    padding: 0;
    margin: 0;
  }
  .global-item{
    height: 44px;
    line-height: 44px;
    background: #0f0;
    border-bottom: 1px solid #00f;
  }
  .part{
    height: 200px;
    overflow-y: scroll;
    background: #ff0;
    margin-bottom: 20px;
  }
  .part-item{
    height: 44px;
    line-height: 44px;
    background: #000;
    border-bottom: 1px solid #fff;
    color: #fff;
  }
</style>
