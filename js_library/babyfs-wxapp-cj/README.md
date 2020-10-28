# babyfs-wxapp-cj
__微信小程序埋点__

## Build Setup

``` bash
# install dependencies
npm install

# serve development program
npm run dev

# build for production
npm run build
```

## How to use

``` bash
npm install --save babyfs-wxapp-cj
```

```javascript
// app.js
import cj from "babyfs-wxapp-cj/index.js";
cj(true, "wxa_sagittarius", ["source", "primerId", "campId", "lessonId"]);
App({});
```

## cj(DEBUG, APPID, OPTIONS)

> parameter

| name    | type   | required | default | description                                |
| ------- | ------ | -------- | ------- | ------------------------------------------ |
| DEBUG   | String | yes      | false   | 是否显示调试信息                           |
| APPID   | String | yes      | -       | 小程序appid                                |
| OPTIONS | String | yes      | -       | 公共的参数(取值和存储都在app.globalData中) |

```javascript
// srouce code about options
const APP = getApp();
if (OPTIONS && OPTIONS.length) {
  OPTIONS.forEach(key => {
    commonPoint[replaceStr(key)] = APP.globalData[key];
  });
}
```

## Notice

> sessionId: 会话id

在该模块指的是一个会话的id 触发一次onLaunch算作一次会话(注意区别checksessionid)
在上传埋点信息的时候会将sessionId一同上传 用于后续的统计
以'wxx'开头的23位随机字符("wxx15524781034308045090")

> deviceId: 设备id

在上传埋点信息的时候会将deviceId一同上传 用于后续的统计
以'wxx'开头的23位随机字符("wxx15524772356129248829")

## 更新日志

* 2.0.2 支持微信自定义上报

