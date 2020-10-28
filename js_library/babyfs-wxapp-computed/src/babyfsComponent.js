import observe from './observe.js';
import type from './type.js';

export default function babyfsComponent(o, realComponent = Component) {
  let data = o.data;
  let computed = o.computed;
  o.data = {};
  o.computed = undefined;

  // attached声明周期的兼容处理
  let originalAttached = null;
  if (o.lifetimes && o.lifetimes.attached) {
    originalAttached = o.lifetimes.attached;
  } else if (o.attached) {
    originalAttached = o.attached;
  }
  if (originalAttached) {
    o.lifetimes = o.lifetimes || {};
    o.lifetimes.attached = function () {
      initObserver.call(this);
      originalAttached.call(this);
    };
    o.attached = function () {
      initObserver.call(this);
      originalAttached.call(this);
    };
  } else {
    o.lifetimes = o.lifetimes || {};
    o.lifetimes.attached = function () {
      initObserver.call(this);
    };
    o.attached = function () {
      initObserver.call(this);
    };
  }
  // 处理properties的observer逻辑，使之在改变时自动更新data中的字段
  let propertiesKeys = Object.keys(o.properties);
  propertiesKeys.forEach(key => {
    let propertyConfig = o.properties[key];
    if (type.isObject(propertyConfig)) {
      if (type.isFunction(propertyConfig.observer)) {
        let originalObserver = propertyConfig.observer;
        propertyConfig.observer = function (newVal, oldVal, changedPath) {
          this.data[key] = newVal;
          originalObserver.call(this, newVal, oldVal, changedPath);
        };
      } else {
        propertyConfig.observer = function (newVal, oldVal, changedPath) {
          this.data[key] = newVal;
        };
      }
    } else {
      o.properties[key] = {
        type: propertyConfig,
        observer(newVal, oldVal, changedPath) {
          this.data[key] = newVal;
        }
      };
    }
  });

  realComponent(o);

  function initObserver() {
    let properties = this.data;
    let observer = observe({
      data,
      properties,
      computed,
      onChanged: changedData => {
        this.setData(changedData);
      }
    });
    this.setData(observer);
    this.data = observer;
  }
};
