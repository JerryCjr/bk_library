import type from './type.js';
import createContext from './context.js';

/**
 * array.push(item1, item2, ..., itemX)
 * array.pop()
 * array.shift()
 * array.unshift(item1,item2, ..., itemX)
 * array.splice(index,howmany,item1,.....,itemX)
 * array.sort(fn)
 * array.reverse()
 */
const arrayObserveMethods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
class ObservableObject {
  constructor(rawObject, context, objectName = 'data') {
    if (!type.isObject(rawObject)) {
      throw new Error('Can not observe non-Object type instance!');
    }
    Object.defineProperty(this, '__raw', {
      value: {},
      writable: false,
      enumerable: false,
      configurable: false
    });
    // 数据有变化时的回调
    Object.defineProperty(this, '__context', {
      value: context,
      writable: false,
      enumerable: false,
      configurable: false
    });
    // 针对每一个属性字段，创建观察器
    let propertyNames = Object.keys(rawObject);
    propertyNames.forEach(propertyName => {
      let propertyValue = rawObject[propertyName];
      // 初始化监测器
      if (!setValue(this, `${objectName}.${propertyName}`, propertyName, propertyValue)) {
        return;
      }
      createObjectPropertyWatcher(this, objectName, propertyName, propertyValue);
    });
  }
}

class ObservableArray extends Array {
  constructor(rawArray, context, arrayName) {
    if (!type.isArray(rawArray)) {
      throw new Error('Can not observe non-Array type instance!');
    }
    super(...rawArray);
    // 数据有变化时的回调
    Object.defineProperty(this, '__context', {
      value: context,
      writable: false,
      enumerable: false,
      configurable: false
    });
    createArrayElementWatcher(this, arrayName, 0, this.length);
    // 针对每一个数组方法，创建观察器
    arrayObserveMethods.forEach(methodName => {
      let methodValue = Array.prototype[methodName];
      createArrayMethodWatcher(this, arrayName, methodName, methodValue);
    });
  }
}

/**
 * 针对某个属性创建观察器
 */
function createObjectPropertyWatcher(target, targetName, propertyName, propertyValue) {
  const fullPropertyName = `${targetName}.${propertyName}`;
  Object.defineProperty(target, propertyName, {
    get() {
      // 进行依赖收集
      if (target.__context.currentComputeProperty) {
        let p = target.__context.getProperty(fullPropertyName);
        if (target.__context.currentComputeProperty.addDependency(p) === 0) {
          target.__context.contextLog(`    属性${target.__context.currentComputeProperty.name}依赖于属性${p.name}`);
        }
      }
      if (this.__raw[propertyName] === undefined) {
        throw new Error(`${fullPropertyName}未定义`);
      }
      return this.__raw[propertyName];
    },
    set(v) {
      if (setValue(target, fullPropertyName, propertyName, v)) {
        // 属性赋值拦截
        target.__context.contextLog(`属性赋值拦截: ${fullPropertyName} = ${JSON.stringify(v)}`);
        // 向外报告该属性的数据发生了变化，触发依赖于它的其他字段的更新逻辑
        target.__context.triggerChangedCallback(fullPropertyName);
      }
    },
    enumerable: true,
    configurable: true
  });
}

function setValue(target, fullPropertyName, propertyName, propertyValue) {
  let typeofValue = type.getType(propertyValue);
  let valueIsArray = typeofValue === type.EnumType.bArray;
  let valueIsObject = typeofValue === type.EnumType.bObject;
  let valueIsFunction = typeofValue === type.EnumType.bFunction;
  if (valueIsFunction) {
    return false;
  }
  let newValue = propertyValue;
  // 判断新值与旧值的引用是否相等
  if (target.__raw[propertyName] === newValue) {
    // 新值与旧值引用相等的话，则不赋值了
    return false;
  } else {
    if (valueIsArray) {
      // 如果新值是数组，则要对数组的方法进行watch
      newValue = new ObservableArray(propertyValue, target.__context, fullPropertyName);
    } else if (valueIsObject) {
      newValue = new ObservableObject(propertyValue, target.__context, fullPropertyName);
    }
    target.__raw[propertyName] = newValue;
    return true;
  }
}

/**
 * 针对数组某个方法创建观察器
 */
function createArrayMethodWatcher(target, targetName, methodName, methodValue) {
  const fullMethodName = `${targetName}.${methodName}`;
  Object.defineProperty(target, methodName, {
    value: function () {
      let lastCount = target.length;
      let result = methodValue.apply(target, arguments);
      if (methodName === 'push') {
        createArrayElementWatcher(target, targetName, lastCount, arguments.length);
      } else if (methodName !== 'pop') {
        createArrayElementWatcher(target, targetName, 0, target.length);// TODO: 这里可能会有性能隐患
      }
      // 数组方法调用拦截
      let parameters = '';
      for (let i = 0; i < arguments.length; ++i) {
        if (i > 0) {
          parameters += ', ';
        }
        parameters += JSON.stringify(arguments[i]);
      }
      target.__context.contextLog(`数组方法调用拦截: ${fullMethodName}(${parameters})`);
      // 向外报告该属性的数据发生了变化，触发依赖于它的其他字段的更新逻辑
      target.__context.triggerChangedCallback(targetName);
      return result;
    },
    writable: false,
    enumerable: false,
    configurable: false
  });
}

/**
 * 遍历数组每个元素，针对数组和对象类型的元素创建观察器
 */
function createArrayElementWatcher(target, targetName, startIndex, count) {
  for (let i = startIndex; i < target.length; ++i) {
    if (startIndex + count <= i) {
      break;
    }
    let item = target[i];
    let typeofItem = type.getType(item);
    if (typeofItem === type.EnumType.bArray) {
      target[i] = new ObservableArray(item, target.__context, `${targetName}[${i}]`);
    } else if (typeofItem === type.EnumType.bObject) {
      target[i] = new ObservableObject(item, target.__context, `${targetName}[${i}]`);
    }
  }
}

export default function observe({
  data = null,
  properties = null,
  computed = null,
  onChanged = null
} = {}) {
  if (!type.isObject(data)) {
    throw new Error('Can not observe non-Object type instance!');
  }
  if (!type.isFunction(onChanged)) {
    throw new Error('onChanged must be a Function!');
  }
  // 创建一个新的运行上下文
  let context = createContext();
  context.onChanged = onChanged;
  context.isInit = true;
  try {
    let realData = data;
    if (properties) {
      realData = Object.assign(data, properties);
    }
    let observer = new ObservableObject(realData, context);
    // 将根对象缓存到上下文中
    context.root = observer;
    if (computed) {
      let propertyNames = Object.keys(computed);
      propertyNames.forEach(propertyName => {
        let fullPropertyName = `data.${propertyName}`;
        let propertyValue = computed[propertyName];
        let typeofValue = type.getType(propertyValue);
        context.computePropertyHandlers[fullPropertyName] = function () {
          context.contextLog(`  重新计算属性: ${fullPropertyName}`);
          let p = context.getProperty(fullPropertyName);
          // 计算值
          context.currentComputeProperty = p;
          if (typeofValue === type.EnumType.bFunction) {
            try {
              let newValue = propertyValue.call({ data: observer, properties: observer });
              if (newValue === undefined) {
                throw new Error(`计算属性${fullPropertyName}返回结果是undefined`);
              }
              observer.__raw[propertyName] = newValue;
            } catch (e) {
              context.contextLog(`  计算属性${fullPropertyName}的值失败，原因：${e.message}`);
            }
          } else {
            observer.__raw[propertyName] = propertyValue;
          }
          context.resetCurrentComputeProperty();
        };

        Object.defineProperty(observer, propertyName, {
          get() {
            // 进行依赖收集
            if (this.__context.currentComputeProperty) {
              let p = this.__context.getProperty(fullPropertyName);
              if (this.__context.currentComputeProperty.addDependency(p) === 0) {
                this.__context.contextLog(`    属性${this.__context.currentComputeProperty.name}依赖于属性${p.name}`);
              }
            }
            let idx = this.__context.needComputeData.indexOf(fullPropertyName);
            if (this.__raw[propertyName] === undefined || idx > -1) {
              // 进行该属性的计算处理
              this.__context.computePropertyHandlers[fullPropertyName]();
              this.__context.needComputeData.splice(idx, 1);
            }
            return this.__raw[propertyName];
          },
          enumerable: true,
          configurable: true
        });
      });

      // 触发计算属性初始化，即第一次计算一下所有的属性，同时收集依赖关系
      context.contextLog('初始计算所有的计算属性');
      for (let k in context.computePropertyHandlers) {
        context.needComputeData.push(k);
      }
    }
    return observer;
  } finally {
    context.isInit = false;
  }
}
