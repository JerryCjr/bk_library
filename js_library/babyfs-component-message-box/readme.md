# babyfs-component-message-box

> babyfs message box UI component

## Build Setup

``` bash
# install dependencies
npm install

# serve development program
npm run dev

# build for production
npm run prod
```

## How to install

``` bash
npm install --save babyfs-component-message-box
```

## How to import

``` javascript
import Vue from 'vue';
import messageBoxPlugin from 'babyfs-component-message-box';
import 'babyfs-component-message-box/dist/babyfsMessageBox.min.css';
Vue.use(messageBoxPlugin);
```

## Usage 1
vue template
``` html
<component-modal ref="messageBox" :config="config"></component-modal>
<button @click="handleShowModal">Click me!</button>
```

``` javascript
export default {
  data() {
    return {
      config: null
    };
  },
  methods: {
    handleShowModal() {
      this.config = {
        title: '标题',
        text: '确定撤销当前申请？',
        cancelText: '取消',
        confirmText: '确定',
        cancelHandler: () => {
          console.log('Click cancel');
        },
        confirmHandler: () => {
          console.log('Click confirm');
        },
        bgClickHandler: () => {
          console.log('Click bg');
        }
      };
      this.$refs.messageBox.show();
    }
  }
};
```

## Usage 2
``` javascript
this.$messageBox.show({
  title: '标题',
  text: '确定撤销当前申请？',
  cancelText: '取消',
  confirmText: '确定',
  onConfirm() {
    console.log('Click confirm');
  },
  onCancel() {
    console.log('Click cancel');
  },
  onClickBg() {
    console.log('Click bg');
  }
});
```

## Usage 3
``` javascript
this.$messageBox.showPromise({
  title: '标题',
  text: '确定撤销当前申请？',
  cancelText: '取消',
  confirmText: '确定'
}).then(() => {
  console.log('Click confirm');
}).catch(() => {
  console.log('Click cancel or bg');
});
```
