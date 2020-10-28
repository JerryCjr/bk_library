# babyfs-wxapp-login

**微信小程序登录模块**

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
npm install --save babyfs-wxapp-login
```

```javascript
// app.js
import wxLogin from "babyfs-wxapp-login/index.js";

App({
  async onLaunch(options) {
    // checkSession
    try {
      await wxLogin.checkSession("wxa_sagittarius");
    } catch (error) {
      console.log(error);
    }
  }
});

// page.js
Page({
  async bindgetuserinfo(event) {
    wxLogin.bindgetuserinfo(event, APPID, cb);
  }
});
```

## checkSession(APPID)

**[检查登录态是否过期](https://developers.weixin.qq.com/miniprogram/dev/api/wx.checkSession.html')**

> parameter

| name  | type     | required | default | description        |
| ----- | -------- | -------- | ------- | ------------------ |
| APPID | String   | yes      | -       | 小程序 appid       |
| event | Object   | yes      | -       | 事件 event         |
| APPID | String   | yes      | -       | 小程序 appid       |
| cb    | Function | yes      | -       | 登录成功的回调函数 |

## bindgetuserinfo(event, APPID, cb)

> parameter

| name  | type     | required | default | description        |
| ----- | -------- | -------- | ------- | ------------------ |
| event | Object   | yes      | -       | 事件 event         |
| APPID | String   | yes      | -       | 小程序 appid       |
| cb    | Function | yes      | -       | 登录成功的回调函数 |
