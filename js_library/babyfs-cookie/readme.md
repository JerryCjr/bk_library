# babyfs-cookie

> babyfs cookie helper

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
npm install --save babyfs-cookie
```

``` javascript
import cookie from 'babyfs-cookie';

cookie.set('cookie_1', 'value1');
cookie.get('cookie_1') === 'value1';
cookie.remove('cookie_1');

let d = new Date();
let seconds = d.getSeconds();
d.setSeconds(seconds + 10);
cookie.set('cookie_3', 'value3', {
  expires: d,
  path: '/',
  domain: 'babyfs.cn'
});
```

#### cookie.get(name)

>parameter

name | type | required | default | description
----|----|----|----|----
name | String | yes | - | Cookie键名

>return

type | description
----|----
String | Cookie键值

#### cookie.set(name, value, { expires, path, domain })

>parameter

name | type | required | default | description
----|----|----|----|----
name | String | yes | - | Cookie键名
value | String | yes | - | Cookit键值
expires | Date | no | - | Cookie过期时间，如果不传就是session cookie
path | String | no | '/' | Cookie生效路径
domain | String | no | - | Cookie生效域

#### cookie.remove(name, { path, domain })

>parameter

name | type | required | default | description
----|----|----|----|----
name | String | yes | - | Cookie键名
path | String | no | '/' | Cookie路径
domain | String | no | - | Cookie域
