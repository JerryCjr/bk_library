# babyfs-img-compound

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
npm install --save babyfs-img-compound

import img-compound from babyfs-img-compound
```

### compound（图片合成）

>params

|   name    |  type  | required |     default      |             description              |
| :-------: | :----: | :------: | :--------------: | :----------------------------------: |
|   width   | number |  false   |       100        |        生成图片的宽度，单位px        |
|  height   | number |  false   |       100        |        生成图片的高度，单位px        |
|   scale   | number |  false   | 当前设备的像素比 |              生成几倍图              |
|   items   | array  |   true   |        -         | 合成图片的每一项，后面的会覆盖前面的 |
| item.type | string |   true   |        -         |     可选值为img(图片)/font(文字)     |
|  item.x   | number |  false   |        0         |      合成选项x轴的距离，单位px       |
|  item.y   | number |  false   |        0         |      合成选项y轴的距离，单位px       |

>图片选项

|  name  |  type  | required | default |    description     |
| :----: | :----: | :------: | :-----: | :----------------: |
| width  | number |   true   |    -    | 图片的宽度，单位px |
| height | number |   true   |    -    | 图片的高度，单位px |
|  url   | string |   true   |    -    |     图片的路径     |

>字体选项

|     name     |  type  | required |  default   |                     description                      |
| :----------: | :----: | :------: | :--------: | :--------------------------------------------------: |
|     text     | string |   true   |     -      |                     要合成的文字                     |
|    color     | string |  false   |    #000    |                       字体颜色                       |
|   fontSize   | number |  false   |     10     |                   字体大小，单位px                   |
|  fontFamily  | string |  false   | sans-serif |                       字体样式                       |
|  textAlign   | string |  false   |    left    |        字体对齐方式，可选值left/center/right         |
| textBaseline | string |  fasle   | alphabetic | 字体基线，可选值top/bottom/middle/alphabetic/hanging |

> return 

|  type   |              description              |
| :-----: | :-----------------------------------: |
| promise | resolve为生成图片的链接，base64格式的 |

>example

```javascript
import compound from babyfs-img-compound;

compound({
  width: 375,
  height: 667,
  items: [
    {
      type: 'img',
      width: 375,
      height: 660,
      url: 'http://i.s.babyfs.cn/73d7b35884d744439959e4df9f7dcf80.jpg',
      x: 0,
      y: 0
    },
    {
      type: 'img',
      width: 200,
      height: 200,
      url: 'http://i.s.babyfs.cn/73d7b35884d744439959e4df9f7dcf80.jpg',
      x: 100,
      y: 100
    },
    {
      type: 'font',
      x: 0,
      y: 620,
      text: '测试文字测试文字测试文字',
      fontSize: 20,
      color: 'white'
    }
  ]
}).then(url => {
  let img = new Image();
  img.src = url;
  document.body.appendChild(img);
});
```