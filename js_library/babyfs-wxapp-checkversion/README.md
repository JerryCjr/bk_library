# babyfs-wxapp-checkversion
__微信小程序本版本号比较__

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
npm install --save babyfs-wxapp-checkversion
```
```javascript
import checkversion from "../babyfs-wxapp-checkversion/index.js";
```

## compareVersion(version)
__对当前小程序的基础库版本比较__

> parameter

| name    | type   | required | default | description |
| ------- | ------ | -------- | ------- | ----------- |
| version | String | yes      | -       | 版本        |
