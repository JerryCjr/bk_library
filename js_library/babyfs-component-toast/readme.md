# babyfs-component-toast

> toast

## Build Setup

``` bash
# install dependencies
npm install

# serve development program
npm run dev

# build for production
npm run prod
```

## How to import

``` javascript
import Vue from 'vue';
import toast from 'babyfs-component-toast';
import 'babyfs-component-toast/dist/babyfs-toast.min.css';
Vue.use(toast);
```
## 配置项说明：
- msg:
 ```toast的message,可以直接字符串方式或者对象的形式传入```
- duration:
 ```toast展示时间，默认2.25s,有0.25秒的动画淡入淡出时间；参数接收ms```
- icon:
 ```传入参数:‘success’,‘fail’,‘warning’三种icon,也可以传入自定义icon的文件路径（自定义配置暂时先关掉，担心使用的时候拼写错误影响显示）```
- zIndex:
 ```传入参数: Number, toast的层级, 默认99```



## Usage 1
vue template

``` javascript
export default {
  data() {},
  methods: {
    someMethod() {
      this.$Toast('创建成功')
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
      this.$Toast({
          msg:'创建成功',
          duration:2000,
      })
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
      this.$Toast({
          msg:'创建成功',
          duration:2000,
          icon:'success'
      })
    }
  }
};
```
