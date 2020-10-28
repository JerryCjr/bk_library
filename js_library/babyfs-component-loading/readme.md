# babyfs-component-loading

> babyfs loading UI component

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
npm install --save babyfs-component-loading
```

## How to import

``` javascript
import Vue from 'vue';
import babyfsLoading from 'babyfs-component-loading';
import 'babyfs-component-loading/dist/babyfs-component-loading.min.css';
Vue.use(babyfsLoading);
```

## describe

> 该组件是模态组件，一般用于数据请求的时候，给用户一个感知

## Usage 1
vue template
``` html
<babyfs-loading :visible="flag"></babyfs-loading>
<button @click="toggleFlag">Click me!</button>
```

``` javascript
export default {
  data() {
    return {
      flag: false
    };
  },
  methods: {
    toggleFlag() {
      this.flag = !this.flag;
    }
  }
};
```

## Usage 2
``` javascript
export default {
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$loading.show();
      ajax.get('/xxxxx').then(() => {
        this.$loading.hide();
      })
    }
  }
};
```