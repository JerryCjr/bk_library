import Vue from 'vue';
import env from 'babyfs-env';
import babyfsFundebug from '../index';
import demo from './index.vue';

// local: 0, dev: 1, test: 2, bvt: 3, online: 4
if (env.currentEnv > 0) { // 开发环境不执行
  Vue.use(babyfsFundebug, {
    apikey: '76d16f63719daa3e7ca339b1fd21dc9f39628d07a4179cd539a715da45ca4ea2',
    silentVideo: false
  });
}

new Vue({
  el: '#app',
  template: '<demo></demo>',
  components: {
    demo
  }
});
