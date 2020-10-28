# babyfs-compatibility

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

```javascript

import {
  refreshTokenInAndroidWebview
} from 'babyfs-compatibility'

// 如果是vue项目在路由钩子里执行 保证页面进入时已经将token刷在了根域(.babyfs.cn)下
router.beforeEach((to, from, next) => {
  if (refreshTokenInAndroidWebview()) return;
  next();
});

```

## api

### refreshTokenInAndroidWebview()

兼容Android version <= 15.2 webview中无法携带token的bug

> no parameter

> return

| type    | description                               |
| ------- | ----------------------------------------- |
| Boolean | 是否需要刷新token (true表示需要刷新token) |
