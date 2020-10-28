# babyfs-request

> babyfs ajax request wrapper

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
npm install --save babyfs-request
```

``` javascript
import ajax, { ApiError, RequestContentType } from 'babyfs-request';

const requestHandler = (req) => {};
const requestErrorHandler=(error) => { throw error };
const responseHandler = (res) => {};
const responseErrorHandler = (error) => { throw error };
ajax.registerRequestInterceptor(requestHandler, requestErrorHandler);
ajax.registerResponseInterceptor(responseHandler,responseErrorHandler);
ajax.registerPartialResponseInterceptor('user-management', () => {
  return {
    userId: 10002,
    userName: 'Jason'
  };
});

ajax.get('/getdata/success').then(data => {
  ......
}).catch(error => {
  ......
});

ajax.post('/getdata/success', {
  a: 1,
  b: 'title'
}).then(data => {
  ......
}).catch(error => {
  ......
});

ajax.post('/postdata/success', {
  a: 1,
  b: 'title'
},{
  filterEmptyParams:false,
  contentType: RequestContentType.JSON
}).then(data => {
  ......
}).catch(error => {
  ......
});

ajax.getContext('user-management').get('/getdata/success', {
  a: 1,
  b: 'title'
}).then(data => {
  ......
}).catch(error => {
  ......
});
```

#### ApiError Class
    Base Class: Error
>property

name | type | description
----|----|----
code | Number | 错误代码
name | String | 构造函数名称
message | String | 错误描述信息

#### ajax.get(url, params, { withCredentials })

>parameter

name | type | required | default | description
----|----|----|----|----
url | String | yes | - | 请求URL
params | Object | no | - | 请求数据
withCredentials | Boolean | no | true | 是否允许跨域请求带着认证信息

>return

type | description
----|----
Promise | 执行请求的Promise对象，then回调的参数是接口返回的数据，catch回调的参数默认是Error类型的异常对象

#### ajax.post(url, params, { withCredentials })

>parameter

name | type | required | default | description
----|----|----|----|----
url | String | yes | - | 请求URL
params | Object | no | - | 请求数据，post的数据会编码成application/x-www-form-urlencoded格式
withCredentials | Boolean | no | true | 是否允许跨域请求带着认证信息

>return

type | description
----|----
Promise | 执行请求的Promise对象，then回调的参数是接口返回的数据，catch回调的参数默认是Error类型的异常对象

#### ajax.switch({ returnRawRes })

>parameter

name | type | required | default | description
----|----|----|----|----
returnRawRes | Boolean | no | false | 是否返回原始的res结构
traceSwitch | Boolean | no | false | 是否要开启trace日志
