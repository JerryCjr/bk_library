<template>
  <div>
    <img :src="url" alt>
  </div>
</template>

<script>
import qrcode from '../index.js';
export default {
  name: 'demo',
  data() {
    return {
      url: ''
    };
  },
  created() {
    qrcode({
      text: '测试测试test',
      width: 100,
      margin: 0,
      logo: {
        width: 20,
        height: 20,
        url: 'http://i.s.babyfs.cn/a342d21953e842acaa3569241bce762b.jpg'
      }
    }).then(url => {
      this.url = url;
    });
  }
};
</script>

<style>
</style>
