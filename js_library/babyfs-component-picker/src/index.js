/**
* 主模块文件
*/
import 'babel-polyfill';

import babyfsPicker from './babyfsPicker/babyfsPicker.vue';

export default {
	install(Vue) {
		Vue.component('babyfs-picker', babyfsPicker);
	}
};
