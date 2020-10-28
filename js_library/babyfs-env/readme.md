# babyfs-env

> babyfs environment helper

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
npm install --save babyfs-env
```

``` javascript
import env from 'babyfs-env';
// 假设现在处于生产环境
env.host(env.EnumBusiness.s0) === 'https://s0.babyfs.cn';
env.m === 'https://m.babyfs.cn';
env.wapi_api === 'https://wapi.babyfs.cn/api';
env.wapi_act === 'https://wapi.babyfs.cn/act';
```

## Properties
| name            | type          | description             |
| --------------- | ------------- | ----------------------- |
| env.agent       | env.EnumAgent | 运行当前页面的系统      |
| env.app         | env.EnumApp   | 运行当前页面的宿主应用 |
| env.babyfsVersion | String      | 成长兔英语客户端版本号 |
| env.babyfsDeviceId | String      | 成长兔英语客户端deviceId |
| env.currentEnv  | env.EnumEnv   | 当前运行环境           |
| env.m           | String        | M站域名               |
| env.op          | String        | OP后台域名              |
| env.wapi        | String        | WAPI站域名              |
| env.m_mall      | String        | 商城mall站域名          |
| env.op_mall     | String        | 商城OP域名              |
| env.wapi_api    | String        | API(api)地址(2c)       |
| env.wapi_act    | String        | API(act)地址(2c)       |
| env.op_api      | String        | OP后台api地址           |
| env.op_mall_api | String        | 商城OPapi地址           |
| env.m_act       | String        | M站act地址              |
| env.s0          | String        | 七牛CDN域名            |
| env.s1          | String        | 七牛CDN域名             |
| env.i_s         | String        | 七牛图片CDN域名         |
| env.v_s         | String        | 七牛视频CDN域名         |
| env.ap_s        | String        | 七牛音频CDN域名         |
| env.m_library   | String        | 资料馆H5域名            |

#### env.host(business)

> 自动根据当前环境获取指定业务的接口base地址

__注意：local和test环境的api和act接口地址返回的是当前域名下的相对路径__

* 例如：env.op_api在local和test环境下返回的是"/op"
* env.wapi_api的稍有不同,local下返回的是"api",test下返回的是"wapi.test.babyfs.cn"

>parameter

| name     | type             | required | default | description |
| -------- | ---------------- | -------- | ------- | ----------- |
| business | env.EnumBusiness | yes      | -       | 业务枚举值  |

>return

| type   | description |
| ------ | ----------- |
| String | base地址   |

#### env.EnumAgent

| Enum Value | description   |
| ---------- | ------------- |
| other      | 其它系统      |
| ios        | ios系统       |
| android    | 安卓系统      |
| windows    | windows phone |

#### env.EnumApp

| Enum Value    | Introduce          |
| ------------- | ------------------ |
| other         | 未知应用           |
| babyfs        | 宝宝玩英语         |
| weixin        | 微信               |
| qqbrowser     | QQ浏览器           |
| ucbrowser     | UC浏览器           |
| hmbrowser     | 红米手机自带浏览器 |
| baidubrowser  | 百度浏览器         |
| safaribrowser | Safari浏览器       |
| _360browser   | 360浏览器          |
| operabrowser  | Opera浏览器        |
| chromebrowser | Chrome浏览器       |
| douyin        | 抖音app           |
| toutiao       | 今日头条app        |
| wexinminiprogram  | 微信小程序webview  |

**注意：想要通过env.app是否是微信小程序的webview的时候，需要在babyfs-wechat模块的jssdkReady的回调中判断，因为7.0.0版本以下的微信判断小程序环境只有通过window.__wxjs_environment变量来判断，而这个变量是在微信的jssdk初始化完成之后才会赋值**

#### env.EnumEnv

| Enum Value | Introduce      |
| ---------- | -------------- |
| local      | 开发者本地机器 |
| dev        | 测试 .14       |
| test       | 开发 .11       |
| bvt        | BVT .251Docker |
| lpt        | LPT环境        |
| online     | 生产           |

#### env.EnumBusiness

| Enum value  | Introduce   |
| ----------- | ----------- |
| m           | M站        |
| op          | OP后台      |
| wapi        | WAPI站点    |
| m_mall      | 商城mall站  |
| op_mall     | 商城OP      |
| wapi        | 2c业务的api |
| op_api      | OP后台api   |
| op_mall_api | 商城OPapi   |
| m_act       | M站act      |
| s0          | 七牛CDN    |
| s1          | 七牛CDN     |
| i_s         | 七牛图片CDN |
| v_s         | 七牛视频CDN |
| ap_s        | 七牛音频CDN |
| m_library   | 资料馆H5    |

