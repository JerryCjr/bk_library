# babyfs-jsbridge

> Javascript bridge, through it H5 code runs in webview of app could communicate with native code.

## Build Setup

``` bash
# install dependencies
npm install

# serve development program
npm run dev

# build for production
npm run prod
```

## How to use

``` bash
npm install --save babyfs-jsbridge
```

``` javascript
import jsbridge from 'babyfs-jsbridge';

// 调用app原生方法
jsbridge.callHandler('wechatPay', String(this.GET_ORDER_ID));
// 注册回调方法给app原生使用
jsbridge.registerHandler('wechatPayCallback', this.wechatPayCallback);
```

#### jsbridge.callHandler(funcName, params)

>parameter

name | type | required | default | description
----|----|----|----|----
funcName | String | yes | - | 方法名称
params | Any | no | - | 传递的参数

#### jsbridge.registerHandler(funcName, callback)

>parameter

name | type | required | default | description
----|----|----|----|----
funcName | String | yes | - | 方法名称
callback | Function | no | - | 回调方法，它的参数即是传回来的参数
