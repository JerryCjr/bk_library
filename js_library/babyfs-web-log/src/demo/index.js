import Vue from 'vue';
import demo from './index.vue';

import log from '../index';
Vue.use(log, 'taurus', 6);

new Vue({
	el: '#app',
	template: '<demo></demo>',
	components: {
		demo
	}
});
