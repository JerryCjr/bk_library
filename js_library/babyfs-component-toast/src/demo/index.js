import Vue from 'vue';
import demo from './index.vue';

import toast from '../index';
Vue.use(toast);

new Vue({
	el: '#app',
	template: '<demo></demo>',
	components: {
		demo
	}
});
