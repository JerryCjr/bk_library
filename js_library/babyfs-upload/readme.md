# babyfs-upload

Library for uploading

## Build Setup

``` bash
# install dependencies
npm install babyfs-upload

# serve development program
npm run dev

# build for production
npm run prod
```

## Example

```javascript
  import { upload, UTYPE } from 'babyfs-upload';

  // upload(UTYPE.test); // invalid type
  // upload(UTYPE.default); // default type

  // upload trace log
  // const file = 'this is a test => jerry'; // Type error, should be array
  const file = [
    {
      level: 'info',
      data: 'this is a info log'
    }
  ];
  // https://github.com/qiniu/js-sdk#api-reference-interface
  const observer = {
    next(res) {
      console.log(res);
    },
    error(err) {
      console.log(err);
    },
    complete(res) {
      console.log(res);
      document.write(JSON.stringify(res, null, 2));
    }
  };
  upload(UTYPE.trace, file, observer); // trace type

```

## API

### UTYPE: object 上传类型

* default: 0 默认值为0 表示使用常规的七牛上传方式
* trace: 1 表示上传类型为trace log

### upload

#### 日志上传

* utype: UTYPE.trace
* file: array (type === UTYPE.trace)
* observer: object 用来设置上传过程的监听函数 有三个属性 next、error、complete: 与七牛api一致

```javascript
  const observer = {
    next(res){
      // ...
    },
    error(err){
      // ...
    },
    complete(res){
      // ...
    }
  }
```

#### 普通上传

* utype: UTYPE.default
* file: blob 对象，上传的文件
* key: 文件资源名
* token: 上传验证信息，前端通过接口请求后端获得
* config: object 配置
* putExtra: object 额外参数
* observer: object 用来设置上传过程的监听函数 有三个属性 next、error、complete: 与七牛api一致

_____

参照七牛文档 <https://github.com/qiniu/js-sdk#api-reference-interface>
