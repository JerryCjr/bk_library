# babyfs-wxapp-minax

**微信小程序类 Vuex 的状态管理插件**

## Build Setup

```bash
# install dependencies
npm install

# serve development program
npm run dev

# build for production
npm run build
```

## How to use

```bash
npm install --save babyfs-wxapp-minax
```

```javascript
// 与Vuex的使用基本相似
// store/modules/systemInfo.js
const sys = wx.getSystemInfoSync();

const TYPES = {
  GET_SYSTEMINFO: "GET_SYSTEMINFO",
  GET_SYSTEMINFO_LOWERRATIO: "GET_SYSTEMINFO_LOWERRATIO"
};

const state = {
  systemInfo: sys,
  lowerRatio: sys.windowHeight / sys.windowWidth <= 1.35 // Boolean 判断高宽比是否小于指定值
};

const getters = {
  [TYPES.GET_SYSTEMINFO](state) {
    return state["systemInfo"];
  },
  [TYPES.GET_SYSTEMINFO_LOWERRATIO](state) {
    return state["lowerRatio"];
  }
};

const mutations = {};

export default {
  state,
  getters,
  mutations
};

// store/index.js
import Minax from '../miniprogram_dist/index.js';
import SYSTEMINFO from './modules/systemInfo.js';

const mina = new Minax({
  modules: {
    SYSTEMINFO
  }
});

export default mina;

// pages.js
import store from '../../store/index.js';
```

## [subscribe(handler: Function): Function](https://vuex.vuejs.org/zh/api/#subscribe)

订阅 store 的 mutation。handler 会在每个 mutation 完成后调用，接收 mutation 和经过 mutation 后的状态作为参数：

```javascript
store.subscribe((mutation, state) => {
  console.log(mutation.type);
  console.log(mutation.payload);
});
```

要停止订阅，调用此方法返回的函数即可停止订阅。
