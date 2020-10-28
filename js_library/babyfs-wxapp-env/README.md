# babyfs-wxapp-env

**微信小程序下的 env 模块**

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
npm install --save babyfs-wxapp-env
```

```javascript
// app.js
import env from "../babyfs-wxapp-env/index.js";

App({
  onLaunch(options) {
    // env.init(options); 初始化
    // env.switchEnv(); 切换环境
    // env.currentEnv; 当前的环境
    // env.host;
  }
});
```

## init(options)

**env init**

> parameter

| name    | type   | required | default | description       |
| ------- | ------ | -------- | ------- | ----------------- |
| options | Object | no       | -       | onLaunch(options) |

## env.currentEnv

> return

| type   | value    |
| ------ | -------- |
| String | 'online' |
| String | 'dev'    |
| String | 'bvt'    |
| String | 'test'   |
| String | 'lpt'    |

## env.host (m站)

> return

| type   | value                         |
| ------ | ----------------------------- |
| String | 'https://m.babyfs.cn'         |
| String | 'http://m.dev.babyfs.cn'      |
| String | 'http://m.bvt.babyfs.cn'      |
| String | 'http://emily.test.babyfs.cn' |
| String | 'http://m.lpt.babyfs.cn'      |


## env.mallHost (商城mall站)

> return

| type   | value                       |
| ------ | --------------------------- |
| String | 'https://mall.babyfs.cn'    |
| String | 'http://mall.dev.babyfs.cn' |
| String | 'http://mall.bvt.babyfs.cn' |
| String | 'http://exchange.babyfs.cn' |
| String | 'http://mall.lpt.babyfs.cn' |

## env.api (api)

> return

| type   | value                        |
| ------ | ---------------------------- |
| String | 'https://wapi.babyfs.cn'     |
| String | 'http://wapi.dev.babyfs.cn'  |
| String | 'http://wapi.bvt.babyfs.cn'  |
| String | 'http://wapi.test.babyfs.cn' |
| String | 'http://wapi.lpt.babyfs.cn'  |
