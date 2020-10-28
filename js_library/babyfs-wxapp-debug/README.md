# babyfs-wxapp-debug
__微信小程序开发调试模块__

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
npm install --save babyfs-wxapp-debug
```

```javascript
import debug from "../babyfs-wxapp-debug/index.js";
debug.init()
```

## init()

在用户复制了特定字符串(d921030b)的条件下 摇一摇手机会出现[切换环境][切换用户]的下拉菜单(用以解决开发过程中多环境多用户的调试问题)

> no parameter
