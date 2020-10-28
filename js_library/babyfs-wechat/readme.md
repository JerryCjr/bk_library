[toc]

# babyfs-wechat

> babyfs wechat component

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
npm install --save babyfs-wechat
```

``` javascript
import wechat from 'babyfs-wechat';

//进行微信授权登录
wechat.askAuthority('invite');

//进行微信jssdk的token注册
wechat.jssdkReady('invite').then(wxWrapper => {
  //设置分享
  wxWrapper.share({
    title: '',
    desc: '',
    link: '',
    imgUrl: ''
  });
  //关闭当前微信窗口
  wxWrapper.closeWindow();
  //获取当前网络状态
  wxWrapper.getNetworkType().then(res => {
    console.log(res.networkType);
  });
}).catch(error => {
  ......
});
```
#### wechat.askAuthority(wxApp)

>parameter

name | type | required | default | description
----|----|----|----|----
wxApp | String | yes | - | 用来进行授权的微信服务号在kvconf中对应的key

#### wechat.jssdkReady(wxApp, debug)

>parameter

name | type | required | default | description
----|----|----|----|----
wxApp | String | yes | - | 用来进行jssdk注册的微信服务号在kvconf中对应的key
debug | Boolean | no | false | 是否开启jssdk的调试模式

>return

type | description
----|----
Promise | 封装了jssdk注册的Promise对象，then回调的参数是wxWrapper对象，catch回调的参数默认是Error对象

#### wxWrapper.share({ title, desc, link, imgUrl })

>parameter

name | type | required | default | description
----|----|----|----|----
title | String | yes | - | 分享标题
desc | String | no | '' | 分享描述文案(发送给朋友的场景需要)
link | String | yes | - | 分享链接
imgUrl | String | no | 与商城默认分享图标一致 | 分享图标地址

## Release

\>2.x 使用npm作为包管理工具
2.x 使用yarn作为包管理工具