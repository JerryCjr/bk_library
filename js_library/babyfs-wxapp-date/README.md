# babyfs-wxapp-date
__微信小程序常用日期格式化的方法封装__

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

```javascript
import dateHelper from "../../miniprogram_npm/babyfs-wxapp-date/index.js";

const format = dateHelper.format(new Date(), 'yyyy-MM-dd hh:mm:ss');
console.log(format);

const parse = dateHelper.parse('2018-09-30 02:20:32', 'yyyy-MM-dd hh:mm:ss');
console.log(parse);

dateHelper.format(d, "yyyy-MM-dd hh:mm:ss") === "2018-09-30 02:20:32";
dateHelper.parse("2018-09-30 02:20:32", "yyyy-MM-dd hh:mm:ss").getTime() === new Date(2018, 8, 30, 2, 20, 32, 123).getTime();
```

## format(date, pattern)
__format 日期格式化__

> parameter

| name    | type   | required | default      | description |
| ------- | ------ | -------- | ------------ | ----------- |
| date    | Object | yes      | -            | new Date()  |
| pattern | String | yes      | 'yyyy-MM-dd' | 格式化规则  |

## parse(dateString, pattern)
__format 逆向过程 转化日期字符串为date对象__

> parameter

| name       | type   | required | default | description      |
| ---------- | ------ | -------- | ------- | ---------------- |
| dateString | String | yes      | -       | 日期字符串       |
| pattern    | String | yes      | -       | dateString的形式 |
