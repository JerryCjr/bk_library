# babyfs-wxapp-storage

> babyfs wxapp storage helper

## 工程目录

```javascript
babyfs-mina-purejs
├── demo                  // 小程序运行文件
├── miniprogram_dist      // Production环境下的构建文件
├── dist                  // Development环境下的运行
├── gulpfile.js           // gulp配置文件
├── node_modules          // 项目依赖
├── src
│    ├── index.js         // purejs
├── tools                 // utils
├── .editorconfig.js
├── .eslintrc.js
├── .gitignore
├── .npmignore
├── npm-shrinkwrap.json
├── package.json
└── README.md
```

## How to use

```javascript
import storage from "../babyfs-wxapp-storage/index.js";

storage.getData("token");
storage.setData("token", "*****");
storage.remove("token");
storage.clear();
```

#### getData(key)

> parameter

| name | type   | required | default | description |
| ---- | ------ | -------- | ------- | ----------- |
| key  | String | yes      | -       | 键名        |

#### setData(key, value)

> parameter
__if key's type is object value is not required__

| name  | type          | required | default | description |
| ----- | ------------- | -------- | ------- | ----------- |
| key   | String/Object | yes      | -       | 键名        |
| value | String        | yes      | -       | 键值        |

#### remove(key)

> parameter

| name | type   | required | default | description |
| ---- | ------ | -------- | ------- | ----------- |
| key  | String | yes      | -       | 键名        |
