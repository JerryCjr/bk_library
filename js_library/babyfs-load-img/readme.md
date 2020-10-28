# babyfs-load-img

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
npm install --save babyfs-load-img

import loadImg from babyfs-load-img
```

>params

| name  |  type  | required | default | description |
| :---: | :----: | :------: | :-----: | :---------: |
|  url  | string |   true   |    -    | 图片的路径  |

>return 

|  type   |              description               |
| :-----: | :------------------------------------: |
| promise | resolve为加载好的dom，reject为错误对象 |

>example

```javascript
import loadImg from babyfs-load-img;

loadImg(url).then(img => {
  document.body.appendChild(img);
})

```