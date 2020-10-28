/*
 * @Author: MuNaipeng
 * @Date: 2018-10-26 16:32:16
 * @Last Modified by: MuNaipeng
 * @Last Modified time: 2018-10-29 11:33:13
 */
import vue from 'vue';
import 'babel-polyfill';

import toastComponent from './babyfs-toast/babyfs-toast.vue';

import tsImg from './babyfs-toast/static/toast_success.png';
import tfImg from './babyfs-toast/static/toast_fail.png';
import twImg from './babyfs-toast/static/toast_warning.png';

// 返回一个 扩展实例构造器,
const ToastConstructor = vue.extend(toastComponent);
let removeDom = event => {
    event.target.parentNode.removeChild(event.target);
};
ToastConstructor.prototype.close = function () {
    this.showTaost = false;
    this.$el.addEventListener('transitionend', removeDom);
};
function isString(obj){ //判断对象是否是字符串
  return Object.prototype.toString.call(obj) === '[object String]';
}

function isNumber(obj) {
  return typeof obj === 'number' && isFinite(obj);
}

/**
 * @param {*} option Object
 * 配置icon 后期项目如果有用到再开口
 */
const showToast = (option = {}) => {
    let duration = option.duration || 2250,
        iconUrl = '';
    if (option.icon) {
        switch (option.icon) {
        case 'success':
            iconUrl = tsImg;
            break;
        case 'fail':
            iconUrl = tfImg;
            break;
        case 'warning':
            iconUrl = twImg;
            break;
        default:
            // iconUrl = option.icon;
            break;
        }
    }


    // 实例化一个 toast.vue
    const toastDom = new ToastConstructor({
        el: document.createElement('div'),
        data() {
            return {
                msg: isString(option) ? option : option.msg,
                icon: option.icon ? option.icon : '',
                iconUrl: iconUrl,
                showTaost: true,
                showContent: true,
                zIndex: isNumber(option.zIndex) ? option.zIndex : ''
            };
        }
    });

    // 把 实例化的 toast.vue 添加到 body 里
    document.body.appendChild(toastDom.$el);

    // 提前 250ms 执行淡出动画
    const t = setTimeout(() => {
      toastDom.showContent = false;
      clearTimeout(t);
    }, duration - 250);
    // 过了 duration 时间后移除整个组件
    vue.nextTick(() => {
        const t  = setTimeout(function () {
            toastDom.close();
            clearTimeout(t);
        }, duration);
    });

};

// 注册为全局组件的函数
function registryToast() {
    vue.prototype.$Toast = showToast;
}

export default registryToast;
