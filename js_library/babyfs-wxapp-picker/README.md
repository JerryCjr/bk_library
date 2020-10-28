# component-picker

> picker


## How to import
``` "usingComponents": {
        "component-picker": "/components/componentPicker/componentPicker"
    }
```

## 配置项说明：
- id 组件Id（String）
- initial 回显的数据（Object）
- resolve 回调函数（function）


## Usage 1
wxml

``` html
    <view class="h5">
        <component-picker id='picker-id' initial="{{initObj}}" region="{{region}}" bind:resolve="resolve">
            <!-- 这部分内容将被放置在组件 <slot> 的位置上 -->
            <view slot="picker" class="test">{{areaShow}}</view>
        </component-picker>
    </view>
```

```javascript
    data:{
        initObj: {}
    }
    onReady() {
      this.picker = this.selectComponent('#picker-id');
    },
    onLoad: function () {
      const t = setTimeout(() => {
        let a1 = 'initObj.areaCode';
        this.setData({
          [a1] : '140421'
        });
        this.picker.init();
        clearTimeout(t);
      }, 1000);
    },
    resolve(e) {
      this.setData({
          areaShow: e.detail.areaShow
      })
    }


```

