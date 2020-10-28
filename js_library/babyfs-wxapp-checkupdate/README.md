# babyfs-wxapp-checkupdate
__微信小程序检测自动更新__

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
npm install --save babyfs-wxapp-checkupdate
```

```javascript

// NOTICE: getUpdateManager 基础库版本限制 1.9.90
import checkUpdate from "../babyfs-wxapp-checkupdate/index.js";

// app.js
App({
  onLaunch(options) {
    // 建议获取getwxaconf的配置可以在onLaunch钩子中做
    const APPID = 'wxa_sagittarius'
    this.globalData.autoUpdate = await checkUpdate.pullConf(APPID);
    // checkUpdate.update(); 不建议update在此处使用
  }
});

// pageA.js

Page({
  // update在小程序打开后的第一个落地页面的onShow钩子中做
  onShow(){
    checkUpdate.update();
  }
})
```

## pullConf(id)
__获取kvconf中的自动更新配置__
> parameter

| name | type   | required | default | description |
| ---- | ------ | -------- | ------- | ----------- |
| id   | String | yes      | -       | appid       |

> return

| type    | description    |
| ------- | -------------- |
| Boolean | 自动更新的键值 |

## pullAllConfs(id)
__获取kvconf中的自动更新配置__
> parameter

| name | type   | required | default | description |
| ---- | ------ | -------- | ------- | ----------- |
| id   | String | yes      | -       | appid       |

> return

| type                                                       | description |
| ---------------------------------------------------------- | ----------- |
| Object: { autoUpdate: true/false, checkingSw: true/false } | 所有配置    |


## update()
__执行自动更新__
> no parameter

## release notes

* @2.0.0 支持自动更新
* @2.1.0 支持获取所有关于小程序的kv键值 (autoUpdate/checkingSw)
