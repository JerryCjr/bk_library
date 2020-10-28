/**
* 主模块文件
*/
import 'babel-polyfill';

import loadingHandler from './loading/index.js';
import loading from './loading/loading.vue';

export default {
	install(Vue) {
		Vue.component('babyfsLoading', loading);
		Vue.prototype.$loading = loadingHandler;
	}
};
