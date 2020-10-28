/**
* 主模块文件
*/
import 'babel-polyfill';

import messageBoxHandler from './messageBox/index';
import messageBox from './messageBox/messageBox.vue';

export default {
	install(Vue) {
    Vue.component('component-modal', messageBox);

    Object.defineProperty(Vue.prototype, '$messageBox', {
      get: function () {
        messageBoxHandler.__vHostParent = this.$el;
        return messageBoxHandler;
      }
    });
	}
};
