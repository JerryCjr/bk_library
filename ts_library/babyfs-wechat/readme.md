[toc]

# babyfs-wechat

> 微信授权登录,普通微信jssdk和企业微信jssdk初始化及常用方法封装

## 使用示例

> 普通微信初始化

```javascript
import $wechat from "@babyfs/babyfs-wechat";

(async () => {
  try {
    // * 普通微信jssdk初始化
    // * 返回值是一个经过扩展的wx对象
    const wx = await $wechat.jssdkReady(
      "invite",
      window.location.href,
      true,
      ["chooseImage"],
      []
    );

    if (wx) {
      wx.checkJsApi({
        jsApiList: ["chooseImage", "closeWindow"], // 需要检测的JS接口列表
        success(res) {
          console.log(res);
          // 以键值对的形式返回，可用的api值true，不可用为false
          // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
        },
      });

      wx.share({
        title: "分享测试--标题",
        desc: "分享测试--描述",
        link: window.location.href,
        imgUrl: "",
      });

      wx.hideMenuItems({
        menuList: ["menuItem:share:appMessage"],
      });
    }
  } catch (error) {
    console.log(error);
  }
})();

```

> 企业微信初始化

```javascript
import $wechat from "@babyfs/babyfs-wechat";

(async () => {
  try {
    // wx.config
    await $wechat.qyJssdkReady('', window.location.href, false);
    // wx.agentConfig
    // 返回的是一个wx对象, 调用api的时候使用 wx.invoke方法
    const wx = await $wechat.qyJssdkAgentReady(
      'babyfs',
      window.location.href,
      false,
      [
        'getContext', // 区分入口
        'getCurExternalContact', // 私聊会话
        'getCurExternalChat', // 群聊会话
        'selectEnterpriseContact', // 调起通讯录
      ]
    );
    console.log(wx);
  } catch (error) {
    console.log(error);
  }
})();
```

## 遗留

1. 完善企业微信api
2. api promisefy

<<<<<<< HEAD
name | type | required | default | description
----|----|----|----|----
title | String | yes | - | 分享标题
desc | String | no | '' | 分享描述文案(发送给朋友的场景需要)
link | String | yes | - | 分享链接
imgUrl | String | no | 与商城默认分享图标一致 | 分享图标地址

## Release

\>2.x 使用npm作为包管理工具
2.x 使用yarn作为包管理工具
=======
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
