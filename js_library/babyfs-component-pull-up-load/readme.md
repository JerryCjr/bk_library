# babyfs-pull-up-load

> pull-up-load

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
npm install --save babyfs-component-pull-up-load
```

## How to import

``` javascript
import Vue from 'vue';
import babyfsPullUpLoad from 'babyfs-component-pull-up-load';
Vue.use(babyfsPullUpLoad);
```

## attributes

|   name   |  type   | required | default |            description            |
| :------: | :-----: | :------: | :-----: | :-------------------------------: |
|   self   | Boolean |  false   |  false  | true dom内局部滚动 false 全局滚动 |
| disabled | Boolean |  false   |  false  |    为`true`不会触发`to-bottom`事件    |
| distance | Number  |  false   |   10    |    距离底部还有多少px触发回调     |

## mathods

|   name    | param |            description             |
| :-------: | :---: | :--------------------------------: |
| to-bottom |   -   | 滚动到指定距离的时候会触发这个方法 |

## Usage 1

```html
  <template>
    <babyfs-pull-up-load @to-bottom="getData" :distance="20" :disabled="isAjax || !isMore">
      <ul>
        <li v-for="(item, index) in listData" :key="index">{{item}}</li>
        <li>{{isMore ? '正在加载中' : '没有更多了'}}</li>
      </ul>
    </babyfs-pull-up-load>
  </template>
  <script>
    export default {
      data() {
        return {
          listData: [],
          isAjax: false,
          isMore: true
        }
      },
      created() {
        this.getData();
      },
      methods: {
        getData() {
          this.isAjax = true;
          setTimeout(() => {
            this.listData = this.listData.concat(new Array(20).fill('globalData'));
            this.isAjax = false;
            if (this.listData.length > 100) {
              this.isMore = false;
            }
          }, 2000)
        }
      }
    }
  </script>
```

> 上面的列子中，滚动方式为整个页面滚动，滚动的时候，距离底部还有`20`像素的时候，会调用`getData`这个方法

## Usage 2

```html
  <template>
    <babyfs-pull-up-load @to-bottom="getData" :distance="20" self :disabled="isAjax || !isMore">
      <ul>
        <li v-for="(item, index) in listData" :key="index">{{item}}</li>
        <li>{{isMore ? '正在加载中' : '没有更多了'}}</li>
      </ul>
    </babyfs-pull-up-load>
  </template>
  <script>
    export default {
      data() {
        return {
          listData: [],
          isAjax: false,
          isMore: true
        }
      },
      created() {
        this.getData();
      },
      methods: {
        getData() {
          this.isAjax = true;
          setTimeout(() => {
            this.listData = this.listData.concat(new Array(20).fill('globalData'));
            this.isAjax = false;
            if (this.listData.length > 100) {
              this.isMore = false;
            }
          }, 2000)
        }
      }
    }
  </script>
  <style>
    ul {
      height: 200px;
      overflow-y: scroll;
    }
  </style>
```

> 上面的列子中，滚动方式为`ul`这个dom滚动，滚动的时候，距离底部还有`20`像素的时候，会调用`getData`这个方法
