# babyfs-date

> babyfs date helper

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
npm install --save babyfs-date
```

``` javascript
import dateHelper from 'babyfs-date';

dateHelper.format(d, 'yyyy-MM-dd hh:mm:ss') === '2018-09-30 02:20:32';
dateHelper.parse('2018-09-30 02:20:32', 'yyyy-MM-dd hh:mm:ss').getTime() === new Date(2018, 8, 30, 2, 20, 32, 123).getTime();
```

#### dateHelper.format(date, pattern = 'yyyy-MM-dd')

>parameter

name | type | required | default | description
----|----|----|----|----
date | Date | yes | - | 需要格式化的日期
pattern | String | no | yyyy-MM-dd | 格式字符串

>return

type | description
----|----
String | 格式化后的日期字符串

#### dateHelper.parse(dateString, pattern)

>parameter

name | type | required | default | description
----|----|----|----|----
dateString | String | yes | - | 格式化的日期字符串
pattern | String | yes | - | 格式字符串

>return

type | description
----|----
Date | 按照格式字符串解析出来的日期

#### 自定义格式字符
* y: 年
* M: 月
* d: 日
* h: 时
* m: 分
* s: 秒
