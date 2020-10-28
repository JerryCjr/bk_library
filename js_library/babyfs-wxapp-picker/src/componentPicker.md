# component-picker

> picker


## How to import
``` "usingComponents": {
        "component-picker": "/components/componentPicker/componentPicker"
    }
    将conmponentPicker文件夹放到components文件夹下即可
```

## 配置项说明：
- initial 回显的数据（Object）
- resolve 回调函数（function）


## Usage 1
vue template

``` html
    <view class="h5">
        <component-picker initial="{{initObj}}" bind:resolve="resolve">
            <!-- 这部分内容将被放置在组件 <slot> 的位置上 -->
            <view slot="picker" class="test">{{areaShow}}</view>
        </component-picker>
    </view>
```
```javascript
    data:{
        initObj: {
          areaCode: '110102' // 北京西城
          // areaCode: '371121' // 山东省-日照市- 五莲县
          // areaCode: '120104' // 天津市南开区
        }
    }
    resolve(e) {
      this.setData({
          areaShow: e.detail.areaShow
      })
    }


```

