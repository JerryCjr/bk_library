/**
* 主模块文件
*/
import 'babel-polyfill';

import pullUpLoad from './pull-up-load/pull-up-load.vue';

export default {
	install(Vue) {
		Vue.component('babyfs-pull-up-load', pullUpLoad);
	}
};
