# babyfs-component-video

> H5_video组件

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
npm install --save babyfs-component-video
```

## How to import

``` javascript
import Vue from 'vue';
import babyfsVideo from 'babyfs-component-video';
import 'babyfs-component-video/dist/babyfsVideo.min.css';
Vue.use(babyfsVideo);
```

## 配置项说明：

- ref:
 ```子组件注册引用信息, 保留videojs使用方法，父组件可以直接调用player方法```
- type:String
 ```video组件类型，组件分为行内播放跟弹窗播放两种；type="inline"代表行内播放,type="outline"代表弹框播放;```
- options:Object
 ```videojs参数对象，默认必传src;```
- poster:String
 ```video封面图;```
- rollplay:Boolean
 ```是否支持滚动播放（滚动离开页面）默认false,不支持;```

## Usage 1
vue template
``` html
<babyfs-video ref="component_video" type="inline" :options="options" :poster="poster" :rollplay="true"></babyfs-video>
```

``` javascript
export default {
  data() {
    return {
      options: null,
      poster: ''
    };
  },
  methods: {
    method() {
      this.$nextTick(() => {
        this.options = { sources: [{ src: 'http://v.s.babyfs.cn/a334a70d003632a4d1e8ed5c307f9d9665645273.mp4' }] };
        this.poster = 'http://i.s.babyfs.cn/op/1/0dba75fc4bda4fa6a0573217a0506eb9.png';
      });
    }
  }
};
```

