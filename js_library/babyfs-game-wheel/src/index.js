/**
* 主模块文件
*/
import 'babel-polyfill';

import wheel from './wheel/wheel.vue';

export default {
  install(Vue) {
    Vue.component('b-wheel-prize', wheel);
  }
};
