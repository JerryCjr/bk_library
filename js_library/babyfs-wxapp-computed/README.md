# babyfs-wxapp-computed

**微信小程序类 Vue 的计算属性的实现**

> 微信小程序 Page 和 Component 实现 computed 计算属性机制，并且引入该模块之后无需手动调用 setData，在修改数据的时候  直接修改 data 相应字段即可

> 组件分为全局导入模式和局部导入模式，全局模式会重写微信小程序原生的 Page 和 Component 方法，局部模式会提供新方法 babyfsPage 和 babyfsComponent，用来创建页面和组件

\*注意： 在页面上使用的计算属性的时候，需要将该页面设置为组件模式，即在 page.json 中增加如下配置：

```json
{
  "usingComponents": {}
}
```

## Build Setup

```bash
# install dependencies
npm install

# serve development program
npm run dev

# build for production
npm run build
```

## How to import

### [全局模式]app.js 中加入以下代码：

```javascript
import "babyfs-wxapp-computed/index.js";
```

### [局部模式]在需要使用的页面或组件中加入以下代码：

```javascript
import babyfsPage from "babyfs-wxapp-computed/babyfsPage.js";
import babyfsComponent from "babyfs-wxapp-computed/babyfsComponent.js";
```

## How to use

### [全局模式]

```javascript
/**
 * 创建页面
 */
Page({
  /**
   * 页面的初始数据
   */
  data: {
    message: "Hello world!",
    arr: [1, "a", [5, 6, 7], { name: "aaa" }],
    info: {
      id: 12,
      name: "name_y",
      sex: 1,
      remark: {
        nick: "nickName",
        avatar: "https://nnn.ww.com",
        classList: ["one", "two", "three"]
      }
    }
  },
  computed: {
    text1() {
      if (this.data.arr.length > 4) {
        return this.data.arr[2].toString() + this.data.arr[4];
      } else {
        return this.data.arr[3].name;
      }
    },
    text2() {
      if (this.data.text1.indexOf(",") > -1) {
        return (
          "有逗号" +
          this.data.info.name +
          " | " +
          this.data.info.remark.classList
        );
      } else {
        return "没有逗号" + this.data.text3;
      }
    },
    text3() {
      if (this.data.text1 === "没有逗号") {
        return this.data.text1;
      } else {
        return this.data.info.remark.nick;
      }
    }
  }
});

/**
 * 创建组件
 */
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    boolean1: Boolean,
    number1: {
      type: Number,
      value: 0
    },
    string1: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    remark: {
      nick: "nickName",
      avatar: "https://nnn.ww.com",
      classList: ["one", "two", "three"]
    }
  },

  computed: {
    text1() {
      return this.properties.number1 + " | " + this.data.remark.nick;
    },
    text2() {
      return (
        this.data.remark.classList.toString() + " - " + this.properties.string1
      );
    }
  }
});
```

### [局部模式]

```javascript
/**
 * 创建页面
 */
babyfsPage({
  /**
   * 页面的初始数据
   */
  data: {
    message: "Hello world!",
    arr: [1, "a", [5, 6, 7], { name: "aaa" }],
    info: {
      id: 12,
      name: "name_y",
      sex: 1,
      remark: {
        nick: "nickName",
        avatar: "https://nnn.ww.com",
        classList: ["one", "two", "three"]
      }
    }
  },
  computed: {
    text1() {
      if (this.data.arr.length > 4) {
        return this.data.arr[2].toString() + this.data.arr[4];
      } else {
        return this.data.arr[3].name;
      }
    },
    text2() {
      if (this.data.text1.indexOf(",") > -1) {
        return (
          "有逗号" +
          this.data.info.name +
          " | " +
          this.data.info.remark.classList
        );
      } else {
        return "没有逗号" + this.data.text3;
      }
    },
    text3() {
      if (this.data.text1 === "没有逗号") {
        return this.data.text1;
      } else {
        return this.data.info.remark.nick;
      }
    }
  }
});

/**
 * 创建组件
 */
babyfsComponent({
  /**
   * 组件的属性列表
   */
  properties: {
    boolean1: Boolean,
    number1: {
      type: Number,
      value: 0
    },
    string1: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    remark: {
      nick: "nickName",
      avatar: "https://nnn.ww.com",
      classList: ["one", "two", "three"]
    }
  },

  computed: {
    text1() {
      return this.properties.number1 + " | " + this.data.remark.nick;
    },
    text2() {
      return (
        this.data.remark.classList.toString() + " - " + this.properties.string1
      );
    }
  }
});
```

## Notice

```javascript
// 引入计算属性之前
this.setData({
  test: "this is a test"
});
// 引入计算属性之后
this.data.test = "this is a test";
```
