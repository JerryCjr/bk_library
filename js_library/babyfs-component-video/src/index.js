/**
* 主模块文件
*/
import Vue from 'vue';
import 'babel-polyfill';

import toast from 'babyfs-component-toast';
Vue.use(toast);

import babyfsVideo from './babyfs-video/babyfs-video.vue';

export default {
	install(Vue) {
		Vue.component('babyfs-video', babyfsVideo);
	}
};
