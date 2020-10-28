import Vue from 'vue';
import loading from './loading.vue';

let loadingConstructor = Vue.extend(loading);
let instance = new loadingConstructor({
  el: document.createElement('div')
});
document.body.appendChild(instance.$el);

function show() {
  instance.visible = true;
}

function hide() {
  instance.visible = false;
}

export default {
  show,
  hide
};