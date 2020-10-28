[toc]

# babyfs-login

> babyfs-login

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
npm install --save babyfs-login
```

``` javascript
import $login from 'babyfs-login';

获取登录态
if (!$login.isLogin) {
    ...
}

设置uid
$login.setUid();

设置token
$login.setToken('ZBJwbQ/s7ouPh8gfZxg3wI9HsVwCcoBaCGuq/QQhYZlJK7QmPS0lc4oE81gXCv3xbBXIu3jkrbc4dubb/YSWgA==');

设置uid&token
$login.setUidToken('ZBJwbQ/s7ouPh8gfZxg3wI9HsVwCcoBaCGuq/QQhYZlJK7QmPS0lc4oE81gXCv3xbBXIu3jkrbc4dubb/YSWgA==');

app登录
$login.appLogin();

微信登录
$login.wxLogin('invite');

公共种token方法
$login.commonSetUidToken('ZBJwbQ/s7ouPh8gfZxg3wI9HsVwCcoBaCGuq/QQhYZlJK7QmPS0lc4oE81gXCv3xbBXIu3jkrbc4dubb/YSWgA==').then(() => {
    ...
}).catch(err => err);

公共登出方法
$login.babyfsLogout().then(() => {
    ...
}).catch(err => err);

公共登录方法
$login.babyfsLogin({appId: 'invite'}).then(() => {
    ...
}).catch(err => err);
```

#### $login.isLogin
>return

type | description
----|----
Boolean | 是否登录状态

#### $login.setUid(day, domain)
>parameter

name | type | required | default | description
----|----|----|----|----
day | Number | no | 7 | 过期天数
domain | String | no | .babyfs.cn | 域

#### $login.setToken(token, day, domain)
>parameter

name | type | required | default | description
----|----|----|----|----
token | String | yes | - | token值
day | Number | no | 7 | 过期天数
domain | String | no | .babyfs.cn | 域

#### $login.setUidToken(token, day, domain)
>parameter

name | type | required | default | description
----|----|----|----|----
token | String | yes | - | token值
day | Number | no | 7 | 过期天数
domain | String | no | .babyfs.cn | 域

#### $login.appLogin()
> jsbridge调用app登录方法（同步方法）

#### $login.wxLogin(appId, reUri)
>parameter（同步方法）

name | type | required | default | description
----|----|----|----|----
appId | String | yes | - | 微信授权登录注册key
reUri | String | no | - | 微信授权回调地址

#### $login.commonSetUidToken({token, day, domain, isGetUrlToken})

>paramete (异步方法)

name | type | required | default | description
----|----|----|----|----
token | String | no | - | token键值
day | Number | no | 7 | 过期天数
domain | String | no | .babyfs.cn | 域
isGetUrlToken | Boolean | no | true| 是否自动获取url中的token

>说明：commonSetUidToken方法无论页面是否登录态，第一步先清除所有登录态，第二步获取传入token的值，如果没有获取到token的值或者值为空字符串，会去url中匹配包含“token”的key/value进行token的设置

#### $login.babyfsLogout()
> 公共的登出方法（同步方法）

#### $login.babyfsLogin({ envApp , appId, reUri, token, day, domain, isGetUrlToken })

>parameter（异步方法）

name | type | required | default | description
----|----|----|----|----
envApp | Number | no | - | 运行环境
appId | String | no | - | jssdk注册key
reUri | String | no | - | 微信授权回调地址
token | String | no | - | token值
day | Number | no | 7 | 过期天数
domain | String | no | .babyfs.cn | 域
isGetUrlToken | Boolean | no | true | 是否自动获取url中的token
ieCallback | function | no | - | 浏览器登录处理方法

>说明：babyfsLogin方法是基于宝宝玩英语封装的公共登录方法，一共有四个可选参数，适用于不同环境
- `envApp`：可选，若不传，appId必传，用户环境自动判断（小程序环境判断限制，会进行jssdk的接入操作）
- `appId`: 页面如果用于微信环境，必传，用于微信授权登录的相关注册及环境判断
- `reUri`: 微信授权登录回调地址，不传默认当前页面地址
- `token、day、domain、isGetUrlToken`: 同commonSetUidToken方法说明（只适用于微信小程序环境的token设置）
- `ieCallback`: 浏览器环境手机号登录的页面级处理方法
- 注意事项：浏览器登录方法暂未开发公共方法，需主动传入


## Release

\>1.x 使用npm作为包管理工具
1.x 使用yarn作为包管理工具