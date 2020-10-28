# babyfs-wxapp-qrcode

根据自定义文本内容生成二维码(支持url,中文字符) 适用于微信小程序

## Example

```javascript
import drawQrcode from 'babyfs-wxapp-qrcode';
import wapi from 'babyfs-wxapp-api';

const ctx = wapi.createCanvasContext(canvasId);
drawQrcode({
  text: '宝宝玩英语',
  x: 20,
  y: 300,
  width: 200,
  height: 200,
  ctx,
  // background: '#098fe1'
  // foreground: '#000000'
});

```

### api
#### drawQrcode(argv)

> 绘制二维码

| name                      | type   | required | default    | description                     |
| ------------------------- | ------ | -------- | ---------- | ------------------------------- |
| argv.text                 | string | yes      | ''         | 文本                            |
| argv.width                | number | yes      | 256        | 生成二维码的宽                  |
| argv.height               | number | yes      | 256        | 生成二维码的高                  |
| argv.x                    | number | yes      | 0          | x轴起始坐标                     |
| argv.y                    | number | yes      | 0          | y轴起始坐标                     |
| argv._this                | object | no       | null       | 组件实例                        |
| argv.ctx                  | object | no       | null       | canvas上下文                    |
| argv.canvasId             | string | no       | null       | canvas-id                       |
| argv.typeNumber           | number | no       | -1         | 二维码的计算模式                |
| argv.errorCorrectionLevel | number | no       | 'H' (高级) | 二维码纠错级别('L','M','Q','H') |
| argv.background           | number | no       | '#ffffff'  | 二维码背景色                    |
| argv.foreground           | number | no       | '#000000'  | 二维码前景色                    |
