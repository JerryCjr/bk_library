import Vue from 'vue';
import messageBox from './messageBox.vue';

let messageBoxConstructor = Vue.extend(messageBox);

function show({
  title = '',
	text = '',
  cancelText,
  confirmText,
  onConfirm,
  onCancel,
  onClickBg
} = {}) {

	let instance = new messageBoxConstructor({
		el: document.createElement('div')
  });
  instance.config = {
    title,
    text,
    cancelText,
    confirmText,
    cancelHandler: onCancel,
    confirmHandler: onConfirm,
    bgClickHandler: onClickBg
  };
	instance.$on('closed', () => {
    this.__vHostParent.removeChild(instance.$el);
	});

	this.__vHostParent.appendChild(instance.$el);
	instance.show();
}

function showPromise({
  title = '',
  text = '',
  cancelText,
  confirmText
} = {}) {
  return new Promise((resolve, reject) => {
    show.call(this, {
      title,
      text,
      cancelText,
      confirmText,
      onConfirm() {
        resolve();
      },
      onCancel() {
        reject();
      },
      onClickBg() {
        reject();
      }
    });
  });
}

export default {
  show,
  showPromise
};
