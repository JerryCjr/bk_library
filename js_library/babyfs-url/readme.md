# babyfs-url

> babyfs url helper

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
npm install --save babyfs-url
```

``` javascript
import url from 'babyfs-url';
```
## Properties

name | type | description
----|----|----
url.rootDomain | 当前页面的根域名

#### url.getRootDomain(hostname)

>parameter

name | type | required | default | description
----|----|----|----|----
hostname | String | no | window.location.hostname | 要解析的主机域名

>return

type | description
----|----
String | 根域名

#### url.analyze(url)

>parameter

name | type | required | default | description
----|----|----|----|----
url | String | yes | - | 要解析的链接地址

>return

type | description
----|----
Object | 链接元数据对象

member | type | description
----|----|----
isAbsoluteUrl | Boolean | 是否是绝对路径地址
sameDomain | Boolean | 是否与当前页面同域
host | String | 链接的主机域名部分
path | String | 链接的路径部分
query | Object | query参数字典
anchor | String | 链接的锚点部分

#### url.addParameter(query, url)

>parameter

name | type | required | default | description
----|----|----|----|----
query | Object | yes | - | 增加的query参数
url | String | no | window.location.href | 要增加的目标地址

>return

type | description
----|----
String | 增加参数后的链接地址

#### url.removeParameter(parameterNames, url)

>parameter

name | type | required | default | description
----|----|----|----|----
parameterNames | Array | yes | - | 移除的query参数名称数组
url | String | no | window.location.href | 要移除参数的目标地址

>return

type | description
----|----
String | 移除参数后的链接地址


## Notice

1. url.addParameter(query, url) 只支持增加锚点前路径上的参数 不支持增加锚点后的参数 后续会拓展支持
2. url.removeParameter(parameterNames, url) 只支持移除锚点前路径上的参数 不支持移除锚点后的参数 后续会拓展支持
