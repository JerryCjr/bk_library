/**
* 主模块文件
*/
import 'babel-polyfill';

import mask from './mask/mask.vue';

export default {
	install(Vue) {
		Vue.component('babyfs-mask', mask);
	}
};
