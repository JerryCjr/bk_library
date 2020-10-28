<template>
  <div class="box">
    <div class="container">
      <babyfs-video ref="component_video" type="outline" :options="options" :poster="poster" :rollplay="false"></babyfs-video>
    </div>
  </div>
</template>

<script>
export default {
  name: 'demo',
  data() {
    return {
      options: null,
      poster: ''
    };
  },
  mounted () {
    this.$nextTick(() => {
      this.options = { sources: [{ src: 'http://v.s.babyfs.cn/a334a70d003632a4d1e8ed5c307f9d9665645273.mp4' }] };
      this.poster = 'http://i.s.babyfs.cn/op/1/0dba75fc4bda4fa6a0573217a0506eb9.png';
    });
  }
};
</script>

<style lang='less' scoped>
body{
  box-sizing: border-box;
}
.box{
  height: 1500px;
  .container{
    width: 100%;
    height: 375px;
  }
}

</style>
