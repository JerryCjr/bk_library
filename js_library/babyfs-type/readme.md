# babyfs-type

> babyfs type checker

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
npm install --save babyfs-type
```

``` javascript
import typer from 'babyfs-type';

typer.getType(10) === typer.EnumType.bNumber;
typer.isObject({}) === true;
typer.isObjectNullOrUndefined(undefined) === true;
typer.isNullOrUndefined(null) === true;
typer.isStringEmpty('') === true;
let { isNumber, isFloat, pointRightCount } = typer.getFloatInfo(1.53);
```

#### typer.getType(v)

>parameter

name | type | required | default | description
----|----|----|----|----
v | Any | yes | - | 要判断类型的任意变量

>return

type | description
----|----
EnumType | 类型枚举值

#### typer.isObject(v)

>parameter

name | type | required | default | description
----|----|----|----|----
v | Any | yes | - | 任意变量

>return

type | description
----|----
Boolean | 是否是对象

#### typer.isObjectNullOrUndefined(o)
    该方法是强类型的判断方法，即如果参数不是Object类型，会抛出Error

>parameter

name | type | required | default | description
----|----|----|----|----
o | Object | yes | - | 任意对象

>return

type | description
----|----
Boolean | 是否为空或者未定义

#### typer.isNullOrUndefined(v)

>parameter

name | type | required | default | description
----|----|----|----|----
v | Any | yes | - | 任意变量

>return

type | description
----|----
Boolean | 是否为空或者未定义

#### typer.isStringEmpty(s)
    该方法是强类型的判断方法，即如果参数不是String类型，会抛出Error

>parameter

name | type | required | default | description
----|----|----|----|----
s | String | yes | - | 任意字符串

>return

type | description
----|----
Boolean | 是否为空或者未定义或者空字符串

#### typer.getFloatInfo(f)
    判断变量是否是浮点型，并返回小数位数等信息

>parameter

name | type | required | default | description
----|----|----|----|----
f | Number | yes | - | 任意变量

>return

type | description
----|----
Object | 该数值的浮点信息

member | type | description
----|----|----
isNumber | Boolean | 是否是数值
isFloat | Boolean | 是否是浮点数
pointRightCount | Number | 小数位数

#### typer.EnumType

Enum Value | Data Type
----|----
bUndefined | undefined
bNull | null
bNumber | number
bBoolean | boolean
bString | string
bFunction | function
bRegExp | regexp
bArray | array
bDate | date
bError | error
bNode | node
bElement | element
bDocument | document
bArraylist | arraylist
bObject | object
