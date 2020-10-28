# babyfs-wxapp-mock

> 微信小程序mock模块，用来模拟假的微信账号登录小程序，以及模拟发送客服消息

## How to import

``` javascript
import mockWechat from '../../miniprogram_npm/babyfs-wxapp-mock/index.js';
```

## How to use

``` javascript
App({
  onLaunch(options) {
    mockWechat.init('wxa_sagittarius');
  }
});

Page({
  /**
   * 点击客服消息按钮的事件处理
   */
  handleClickContact() {
    if (mockWechat.enableMock) {
      // 模拟回复“1”
      mockWechat.sendContactMessage('1');
      return;
    }
  }
});
```
