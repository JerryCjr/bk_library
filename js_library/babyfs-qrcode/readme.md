# babyfs-qrcode

> 

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
npm install --save babyfs-qrcode

import qrcode from babyfs-qrcode
```

### qrcode（生成二维码）

>params

|    name     |  type  | required |     default      |                  description                   |
| :---------: | :----: | :------: | :--------------: | :--------------------------------------------: |
|    text     | string |   true   |        -         |                合成二维码的内容                |
|    width    | number |  false   |       100        |    二维码的宽高，单位px，二维码为等比正方形    |
|   margin    | number |  false   |        4         |               二维码留白,单位px                |
|    color    | object |  false   |        -         |                设置二维码的颜色                |
| color.dark  | string |  false   |    #000000ff     |           二维码前景色，必须为16进制           |
| color.light | string |  false   |    #ffffffff     |           二维码背景色，必须为16进制           |
|    logo     | object |  false   |        -         | 二维码中间的logo（logo大小会影响二维码的识别） |
| logo.width  | number |  false   |        20        |               logo的宽度，单位px               |
| logo.height | number |  false   |        20        |               logo的高度，单位px               |
|  logo.url   | string |   true   |        -         |                   logo的路径                   |
|    scale    | number |  false   | 当前设备的像素比 |                   生成几倍图                   |

采用的第三方node-qrcode，详细配置[点这里](https://github.com/soldair/node-qrcode)

> return 

|  type   |                 description                 |
| :-----: | :-----------------------------------------: |
| promise | resolve为生成二维码的图片地址，base64格式的 |

>example

```javascript
import qrcode from babyfs-qrcode;

qrcode({
  text: 'test',
  width: 100,
  margin: 0,
  logo: {
    width: 20,
    height: 20,
    url: 'http://i.s.babyfs.cn/a342d21953e842acaa3569241bce762b.jpg'
  }
}).then(url => {
  let img = new Image();
  img.src = url;
  document.body.appendChild(img);
});

```