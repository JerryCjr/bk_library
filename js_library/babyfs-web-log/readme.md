# babyfs-web-log

> babyfs-web-log

## Build Setup

``` bash
# install dependencies
npm install

# serve development program
npm run dev

# build for production
npm run prod
```
## How to install

``` bash
npm install --save babyfs-web-log
```
## How to import

``` javascript
import Vue from 'vue';
import log from 'babyfs-web-log';
Vue.use(log,appId,days);
- 金牛座商城项目举例写法：Vue.use(log,'taurus');
- 投放平台上报功能，cookie上报页面参数 'ad_channel';
- 默认保存7天,自定义(例15天)写法推荐：Vue.use(log,'taurus', 15);
```

## 配置项说明：
- appId:（必传）
 ```数据埋点项目名称,可以直接字符串方式传入```
- days: （选传）
 ```投放渠道有效期```

##埋点参数说明
> 1.事件名（必选）
  2.上传的数据（可选）
  3.异步执行结果超时时间(毫秒)，业务中如果有异步需要时，可以传入第三个参数，避免埋点影响业务逻辑（可选）

## Usage 1
vue template

``` javascript
export default {
  data() {},
  methods: {
    someMethod() {
      this.$log('page_stat');
    }
  }
};

```
## Usage 2
vue template

``` javascript
export default {
  data() {},
  methods: {
    someMethod() {
      this.$log('page_stat',{id:1});
    }
  }
};
```
## Usage 3
vue template

``` javascript
export default {
  data() {},
  methods: {
    someMethod() {
      this.$log('page_stat',{},1000)
      .then(() => window.location.href = 'https://www.baidu.com')
    }
  }
};
```
## Usage 4
vue template

``` javascript
export default {
  data() {},
  methods: {
    someMethod() {
      this.$adv('click'); //点击
      this.$adv('conv', 1000) //转化
      .then(() => window.location.href = 'https://www.baidu.com')
    }
  }
};
```
