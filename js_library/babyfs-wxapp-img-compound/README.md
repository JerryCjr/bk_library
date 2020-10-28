# babyfs-wxapp-img-compound

微信小程序下自定义合成图片插件,支持类型:

* 自定义图片
* 自定义文本
* 自定义url转二维码

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

> bash

``` bash
  npm install --save babyfs-wxapp-img-compound
```
> wxml

```html
<view class="container">
  <canvas
    class="o-canvas"
    canvas-id="ocanvas"
    style="width: 220px; height: 389px;"
  >
  </canvas>
  <view class="func">
    <button bindtap="choose">choose</button>
    <button bindtap="draw">draw</button>
    <button bindtap="store">store</button>
  </view>
</view>
```
>js

``` javascript

import wapi from 'babyfs-wxapp-api';
import {
  UTYPE,
  compound
} from '../../miniprogram_dist/index.js';

Page({
  data: {
    path: ''
  },
  customData: {
    options: [],
    config: null
  },
  async onReady() {
    this.customData.options = [{
      type: UTYPE['IMG'],
      x: 0,
      y: 0,
      width: 220,
      height: 389,
      path: 'http://ppbd7ianm.bkt.clouddn.com/post_02.jpg'
    },
    {
      type: UTYPE['IMG'],
      x: 0,
      y: 0,
      width: 220,
      height: 389,
      path: 'http://ppbd7ianm.bkt.clouddn.com/%E9%95%82%E7%A9%BA%E5%A4%A7.png'
    },
    {
      type: UTYPE['QRCODE'],
      x: 40,
      y: 328,
      width: 40,
      height: 40,
      text: '宝宝玩英语'
      // text: 'http://ppbd7ianm.bkt.clouddn.com/tom_01.jpeg'
      // background: '#098fe1'
    },
    {
      type: UTYPE['TEXT'],
      x: 130,
      y: 70,
      text: '你好宝宝',
      color: 'black',
      textAlign: 'left',
      fontSize: 20,
      maxLength: 16
    }];
    this.customData.config = {
      reserve: true,
      // x: 0,
      // y: 0,
      destWidth: 220,
      destHeight: 389,
      fileType: 'jpg',
      quality: 1
    };
    this.draw();
  },

  // 绘制
  async draw() {
    let response;
    try {
      response = await compound('ocanvas', this.customData.options, this.customData.config);
    } catch (error) {
      console.log(error);
    }
    if (response.errMsg === 'canvasToTempFilePath:ok') {
      this.setData({
        path: response.tempFilePath
      });
    }
  },

  // 保存到本地
  async store() {
    const path = this.data.path;
    let r;
    if (path) {
      console.log('store');
      try {
        r = await wapi.saveImageToPhotosAlbumAsync({ filePath: path });
      } catch (error) {
        console.log(error);
      }
    }
    if (r) {
      console.log(r);
    }
  },

  // 从本地相册选择
  async choose() {
    let r;
    try {
      r = await wapi.chooseImageAsync({
        count: 1
      });
    } catch (error) {
      console.log(error);
    }
    if (r && r.tempFilePaths) {
      this.customData.options[0] = {
        type: UTYPE['IMG'],
        x: 0,
        y: 0,
        width: 220,
        height: 389,
        path: r.tempFilePaths[0]
      };
    }
  }
});

```

## API

### export.UTYPE [Object]

| name   | type   | description    |
| ------ | ------ | -------------- |
| IMG    | symbol | 支持图片类型   |
| TEXT   | symbol | 支持文本类型   |
| QRCODE | symbol | 支持二维码类型 |

### export.compound(canvasid, options, config) [Function]

#### compound params

| name     | type   | required | default    | description        |
| -------- | ------ | -------- | ---------- | ------------------ |
| canvasid | string | yes      | no default | canvas id          |
| options  | array  | yes      | no default | 要合成的选项数组   |
| config   | object | yes      | no default | 绘制成功的配置信息 |

##### element of options [Object]

| name   | type       | required | default      | description                                         |
| ------ | ---------- | -------- | ------------ | --------------------------------------------------- |
| type   | UTYPE[key] | yes      | UTYPE['IMG'] | 图片合成                                            |
| path   | string     | yes      | no default   | 所要绘制的图片资源                                  |
| x      | number     | yes      | 0            | 图像的左上角在目标canvas上x轴的位置                 |
| y      | number     | yes      | 0            | 图像的左上角在目标canvas上y轴的位置                 |
| width  | number     | yes      | 256          | 在目标画布上绘制图像的宽度 允许对绘制的图像进行缩放 |
| height | number     | yes      | 256          | 在目标画布上绘制图像的高度 允许对绘制的图像进行缩放 |

##### element of options [Object]

| name         | type       | required | default           | description                                                                                | version limit |
| ------------ | ---------- | -------- | ----------------- | ------------------------------------------------------------------------------------------ | ------------- |
| type         | UTYPE[key] | yes      | UTYPE['TEXT']     | 文字合成                                                                                   |
| text         | string     | yes      | ''                | 索要绘制的文本内容                                                                         |
| x            | number     | yes      | 0                 | 文字的左上角在目标canvas上x轴的位置                                                        |
| y            | number     | yes      | 0                 | 文字的左上角在目标canvas上y轴的位置                                                        |
| color        | string     | no       | '#000000'         | 绘制的颜色                                                                                 |
| font         | string     | no       | '10px sans-serif' | 当前字体样式的属性。符合 CSS font 语法 的 DOMString 字符串，至少需要提供字体大小和字体族名 | 1.9.90        |
| fontSize     | number     | no       | 0                 | 设置字体的字号(1.9.90以后需要通过font来设置)                                               | < 1.9.90      |
| textAlign    | string     | no       | 'left'            | 绘制的文字的对齐方式                                                                       | 1.1.0         |
| textBaseline | string     | no       | 'normal'          | 绘制的文字的竖直对齐方式                                                                   | 1.4.0         |
| maxWidth     | number     | no       | no default        | 绘制的最大宽度                                                                             |
| maxLength    | number     | no       | no default        | 绘制的最大长度                                                                             |

##### element of options [Object]

| name                 | type       | required | default         | description                           |
| -------------------- | ---------- | -------- | --------------- | ------------------------------------- |
| type                 | UTYPE[key] | yes      | UTYPE['QRCODE'] | 二维码合成                            |
| text                 | string     | yes      | ''              | 需要转化二维码的文本                  |
| x                    | number     | yes      | 0               | 二维码的左上角在目标canvas上x轴的位置 |
| y                    | number     | yes      | 0               | 二维码左上角在目标canvas上x轴的位置   |
| width                | number     | yes      | 256             | 生成二维码的宽                        |
| height               | number     | yes      | 256             | 生成二维码的高                        |
| _this                | object     | no       | null            | 组件实例                              |
| ctx                  | object     | no       | null            | canvas上下文                          |
| canvasId             | string     | no       | null            | canvas-id                             |
| typeNumber           | number     | no       | -1              | 二维码的计算模式                      |
| errorCorrectionLevel | number     | no       | 'H' (高级)      | 二维码纠错级别('L','M','Q','H')       |
| background           | number     | no       | '#ffffff'       | 二维码背景色                          |
| foreground           | number     | no       | '#000000'       | 二维码前景色                          |

#### config [Object]

* 与[wx.canvasToTempFilePath参数](https://developers.weixin.qq.com/miniprogram/dev/api/wx.canvasToTempFilePath.html)保持一致
* v0.1.1 新增参数 reserve

| name       | type    | required | default             | description                                                                   | version limit |
| ---------- | ------- | -------- | ------------------- | ----------------------------------------------------------------------------- | ------------- |
| reserve    | boolean | no       | false               | 本次绘制是否接着上一次绘制                                                    | 1.2.0         |
| x          | number  | no       | 0                   | 指定的画布区域的左上角横坐标                                                  | 1.2.0         |
| y          | number  | no       | 0                   | 指定的画布区域的左上角纵坐标                                                  | 1.2.0         |
| width      | number  | no       | canvas宽度-x        | 指定的画布区域的宽度                                                          | 1.2.0         |
| height     | number  | no       | canvas宽度-x        | 指定的画布区域的高度                                                          | 1.2.0         |
| destWidth  | number  | no       | width*屏幕像素密度  | 输出的图片的宽度                                                              | 1.2.0         |
| destHeight | number  | no       | height*屏幕像素密度 | 输出的图片的高度                                                              | 1.2.0         |
| fileType   | string  | no       | 'png'               | 目标文件的类型                                                                | 1.7.0         |
| quality    | number  | yes      | no default          | 图片的质量，目前仅对 jpg 有效。取值范围为 (0, 1]，不在范围内时当作 1.0 处理。 | 1.7.0         |


#### return [Object]

success 回调函数

| name         | type   | description        |
| ------------ | ------ | ------------------ |
| tempFilePath | string | 生成文件的临时路径 |
