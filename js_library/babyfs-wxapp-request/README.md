# babyfs-wxapp-request

**微信小程序网络请求封装**

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
npm install --save babyfs-wxapp-request
```

```javascript
// app.js
import ajax from "../babyfs-wxapp-request/index.js";

App({
  async onLaunch() {
    const options = {
      url: "api/xxx/xxx",
      data: {},
      type: ajax["TYPES"]["DEEPEST_DATA_NOT_REQUIRED"],
      individualFlag: true
    };
    let r;
    try {
      /*
       * type 类型为 ajax['TYPES']['DEEPEST_DATA_REQUIRED']     返回的r即为res.data.data
       * type 类型为 ajax['TYPES']['DEEPEST_DATA_NOT_REQUIRED'] 返回的r即为res.data
       */
      r = await ajax.GET();
    } catch (error) {
      /*
       * 失败会抛出 error code 为错误码 msg  为错误信息
       * individualFlag:false 会走默认的错误处理机制 (展示错误信息 + 上传错误日志 + code状态码对应处理)
       * individualFlag:true  开发者可根据code和msg自定义处理 默认只包含了(upload errorlog)
       */
      console.log(error);
      const { code, msg } = { ...error };
      // code handler
      switch (code) {
        case 401:
          // do someting
          break;
        default:
          // do someting
          break;
      }
    }
  }
});
```

## GET/POST(requestHandler)

**GET/POST 方法**

> Parameter: requestHandler(Object)

| name           | type    | required | default                        | description                            | value                                                              |
| -------------- | ------- | -------- | ------------------------------ | -------------------------------------- | ------------------------------------------------------------------ |
| url            | String  | yes      | -                              | 请求地址                               | -                                                                  |
| data           | Object  | yes      | -                              | 传递参数                               | {}                                                                 |
| type           | Number  | no       | TYPES['DEEPEST_DATA_REQUIRED'] | 是否需要返回 res.data.data             | TYPES['DEEPEST_DATA_REQUIRED']/ TYPES['DEEPEST_DATA_NOT_REQUIRED'] |
| individualFlag | Boolean | no       | false                          | 是否单独处理 server 返回的 msg 和 code | true/false                                                         |

## TYPES

**TYPES 类型对象**

| key                       | value | type   | description              |
| ------------------------- | ----- | ------ | ------------------------ |
| DEEPEST_DATA_REQUIRED     | 0     | Number | 接口返回 res.data.data   |
| DEEPEST_DATA_NOT_REQUIRED | 1     | Number | 接口不返回 res.data.data |

## CONTENT_TYPE

**CONTENT_TYPE 类型对象**

| key              | value                               | type   | description |
| ---------------- | ----------------------------------- | ------ | ----------- |
| DEFAULT          | application/x-www-form-urlencoded   | String |             |
| URL_ENCODED      | 'application/x-www-form-urlencoded' | String |             |
| FORM_DATA        | 'multipart/form-data'               | String |             |
| APPLICATION_JSON | 'application/json'                  | String |             |

## Notice

> request header

```javascript
  // request header
  {
    'content-type': CONTENT_TYPE的枚举值,
    'X-Auth-Token': token,
    'babyfs-wxapp-source': 'wxapp',
    'babyfs-wxapp-version': `${header.wxappVersion()}`,
    'babyfs-wxapp-name': `${header.wxappName()}`
  }
```

1. token 取值依赖 babyfs-wxapp-storage (授权认证需要注意)
2. babyfs-wxapp-version: 来自存储到本地的小程序版本号 (本地存储的key为'wxa_version')
3. babyfs-wxapp-name: 来自存储到本地的小程序名称 (本地存储的key为'wxa_name')
4. content-type不存在或者取值非法都使用默认的URL_ENCODED
