# babyfs-wxapp-api
__微信小程序官方api的promise封装__

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
npm install --save babyfs-wxapp-api
```

```javascript
import wxapi from "../babyfs-wxapp-api";
// 基本使用与官方没有出入
wxapi.login({
  success(res) {
    if (res.code) {
      // 发起网络请求
      wx.request({
        url: 'https://test.com/onLogin',
        data: {
          code: res.code
        }
      })
    } else {
      console.log('登录失败！' + res.errMsg)
    }
  }
})
```

## 需要扩展

```javascript
// 提供对官方微信api的promise封装 如需扩展需在数组中定义
// https://developers.weixin.qq.com/miniprogram/dev/api/
const o = [
  'login',
  'checkSession',
  'downloadFile',
  'uploadFile',
  'getUserInfo',
  'setInnerAudioOption',
  'getImageInfo'
];
```

## v2.x.x 以后

```javascript
  import wxapi from 'babyfs-wxapp-api'

  // 保留
  wxapi.getSystemInfo({
    success(res) { console.log(res) }
    fail(error) { console.log(error) }
    complete(res) { console.log(res) }
  })

  // 保留
  wxapi.getSystemInfoSync();

  // 加Async表示异步方法
  await wxapi.getImageInfoAsync()
```
