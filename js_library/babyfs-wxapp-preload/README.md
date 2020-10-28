# babyfs-wxapp-preload

**微信小程序资源预加载**

## Build Setup

```bash
# install dependencies
npm install

# serve development program
npm run dev

# build for production
npm run build
```

## How to use

```bash
npm install --save babyfs-wxapp-preload
```

```javascript
import preloadInstance from "../babyfs-wxapp-preload/index.js";

// eg
let queue = [
  {
    id: this.customData.listeningPracticeConf.practiceAudio.shortId,
    downLoadUrl: this.customData.listeningPracticeConf.practiceAudio.url
  },
  {
    id: -1,
    downLoadUrl:
      this.customData.listeningPracticeConf.imgUrl +
      "?imageView2/2/w/750/format/jpg/100"
  }
];

// preload
preloadInstance.preload(key, queue);
// getUrl
preloadInstance.getUrl(key, id);
// subscribe
preloadInstance.subscribe((payload, item) => {
  if (payload) {
    if (payload["type"] && payload["type"] === "success") {
      let rate = payload.rate; // 预加载成功 payload.rate表示当前的加载进度
      if (payload.complete) prelaodComplete(); // 预加载全部完成
    }

    if (payload["type"] && payload["type"] === "fail") prelaodComplete(); // 预加载超时失败
  }
});
```

## preload(key, queue)

**预加载**

> parameter

| name  | type   | required | default | description |
| ----- | ------ | -------- | ------- | ----------- |
| key   | String | yes      | -       | 键名        |
| queue | Array  | yes      | -       | 加载队列    |

## getUrl(key, id)

**获取预加载资源 url**

> parameter

| name | type   | required | default | description |
| ---- | ------ | -------- | ------- | ----------- |
| key  | String | yes      | -       | 键名        |
| id   | String | yes      | -       | id          |

## subscribe(handler: Function)

**预加载事件订阅**

handler(payload, item)

> payload

| name     | type    | required | default | description        | value         |
| -------- | ------- | -------- | ------- | ------------------ | ------------- |
| type     | String  | yes      | -       | 类型               | success/faile |
| rate     | Number  | yes      | -       | 百分比(只有数值)   | 100 / 50      |
| complete | Boolean | yes      | -       | 是否完成           | true/false    |
| du       | String  | yes      | -       | 完成加载的间隔时间 | timestamp     |

> item

| name     | type    | required | default | description        | value      |
| -------- | ------- | -------- | ------- | ------------------ | ---------- |
| complete | Boolean | yes      | -       | 是否完成           | true/false |
| du       | String  | yes      | -       | 完成加载的间隔时间 | timestamp  |


## RELEASE NOTES

@1.1.4
- fixbug: babyfs-wxapp-api依赖问题 升级为2.0.0版本
