<template>
  <div>
    <img :src="url" alt>
  </div>
</template>

<script>
import compound from '../index.js';
export default {
  name: 'demo',
  data() {
    return {
      url: ''
    };
  },
  created() {
    compound({
      width: 375,
      height: 667,
      items: [
        {
          type: 'img',
          width: 375,
          height: 660,
          url: 'http://i.s.babyfs.cn/73d7b35884d744439959e4df9f7dcf80.jpg',
          x: 0,
          y: 0
        },
        {
          type: 'img',
          width: 200,
          height: 200,
          url: 'http://i.s.babyfs.cn/e32a1fbbe23941b39ef568ed8cc3ac0d.jpg',
          x: 100,
          y: 100
        },
        {
          type: 'font',
          x: 0,
          y: 620,
          text: '测试文字测试文字测试文字',
          fontSize: 20,
          color: 'white'
        }
      ]
    }).then(url => {
      this.url = url;
    });
  }
};
</script>

<style>
</style>
