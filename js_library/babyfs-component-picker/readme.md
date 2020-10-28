# babyfs-component-picker

> picker

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
npm install --save babyfs-component-picker
```

## How to import

``` javascript
import Vue from 'vue';
import pickerPlugin from 'babyfs-component-picker';
import 'babyfs-component-picker/dist/babyfsPicker.min.css';
Vue.use(pickerPlugin);
```

## 配置项说明：

- ref:
 ```子组件注册引用信息```
- mode:
 ```picker类型，组件分为地址picker跟普通picker两种；mode="region"代表地址picker,不传就表示普通picker;```
- row :
 ```picker选择区域显示的行数，支持1~7行，不传的情况地址picker默认显示7行高度，普通picker自适应高度;```
- theme:
 ```picker主题色，不传默认使用‘#FF5E4C’;```
- regionJson:
 ```地址自定义json,支持CDN地址,不传默认使用含钓鱼岛的最全json;(即将废除，统一调用后端区域服务模块管理)```
- config:
 ```组件数据配置[Object];```
- initial:
 ```组件数据回显初始化数据[Object];```
- handle:
 ```picker回调函数，返回选中项的详细信息[function];```


## Usage 1 (地址picker)
vue template
``` html
<babyfs-picker ref="babyfsPicker" mode="region" row="5" theme="#f00095" :initial='addressInitial' @handle="addresshandle"></babyfs-picker>
```

``` javascript
export default {
  data() {
    return {
      // addressInitial: {
      //     area: "罗山县",
      //     areaCode: "411521",
      //     city: "信阳市",
      //     cityCode: "411500",
      //     province: "河南省",
      //     provinceCode: "410000",
      // },
      // 最新版本支持只传areaCode回显数据
      addressInitial: {
        areaCode: "411521"
      }
    };
  },
  methods: {
    clickEvent() {
      this.$refs.babyfsPicker.showPick();
    },
    addresshandle(obj) {
      console.log(obj)
    },
  }
};
```

## Usage 2 (普通picker)
vue template
``` html
<babyfs-picker ref="babyfsPicker" row="5" theme="red" :config='myConfig' :initial='myInitial' @handle="handle"></babyfs-picker>
```

``` javascript
export default {
  data() {
    return {
      myConfig: {
          title: '退款原因',
          list: [{
              label: '123',
              id: 0
          }, {
              label: '1234',
              id: 1
          }, {
              label: '12345',
              id: 2
          }],
      },
      myInitial: {
          id: 0
      },
    };
  },
  methods: {
    clickEvent() {
      this.$refs.babyfsPicker.showPick();
    },
    handle(obj) {
        console.log(obj)
    },
  }
};
```




