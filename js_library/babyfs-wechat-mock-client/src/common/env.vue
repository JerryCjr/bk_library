<template>
  <div>
    <select v-model="currentValue">
      <option v-for="item in options" :key="item" :value="item">{{item}}</option>
    </select>
  </div>
</template>

<script>
import env from 'babyfs-env';

export default {
  name: 'env-select',
  data() {
    return {
      currentValue: 'online',
      options: Object.keys(env.EnumEnv).filter(item => item !== 'local')
    };
  },
  mounted() {
    let v = localStorage.getItem('mock_wechat_env');
    if (this.options.includes(v)) {
      this.currentValue = v;
    }
  },
  watch: {
    currentValue(newVal) {
      localStorage.setItem('mock_wechat_env', newVal);
    }
  },
  methods: {
    getDomain() {
      // 由于该网站只部署在线上域名babyfs.cn下面，这里只返回一级域名
      return 'babyfs.cn';
      // return this.currentValue === 'online' ? 'babyfs.cn' : `${this.currentValue}.babyfs.cn`;
    }
  }
};
</script>

<style scoped>
select {
  font-size: 15px;
}
</style>
