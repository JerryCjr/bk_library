import consoleLog from './trace.js';
import Property from './property.js';

let seedId = 0;

/**
 * 运行上下文创建方法
 */
export default function createContext() {
  // 上下文ID
  const id = ++seedId;
  function contextLog(text) {
    consoleLog(`[${id}] ${text}`);
  }

  // 根监听对象
  let root = null;

  /**
   * 计算属性的计算器的缓存集合
   */
  let computePropertyHandlers = {};

  // 标示是否是初始化的流程期间
  let isInit = false;
  // 有变化的数据字段的缓存
  let changedData = null;
  // 下次需要重新计算的属性的缓存
  let needComputeData = [];
  /**
   * 触发数据变化的回调
   */
  function triggerChangedCallback(fullPropertyName) {
    if (isInit) {
      return;
    }
    changedData = changedData || {};

    let propertyNames = fullPropertyName.split('.');
    let currentData = root;
    let currentFullPropertyName = `${propertyNames[0]}.`;
    let modifiedPropertyName = '';
    for (let i = 1; i < propertyNames.length; ++i) {
      let ps = propertyNames[i].split('[');
      for (let j = 0; j < ps.length; ++j) {
        let p = ps[j];
        currentFullPropertyName += p;
        modifiedPropertyName += p;
        if (j > 0) {
          p = p.substr(0, p.length - 1);
        }
        changedData[modifiedPropertyName] = currentData[p];
        currentData = currentData[p];
        // 将依赖于该属性的其他字段的更新状态设置为“需要重新计算”
        needComputeReferenceProperty(getProperty(currentFullPropertyName));

        if (j === ps.length - 1) {
          currentFullPropertyName += '.';
          modifiedPropertyName += '.';
        } else {
          currentFullPropertyName += '[';
          modifiedPropertyName += '[';
        }
      }
    }

    Promise.resolve().then(() => {
      if (changedData) {
        let computeProperties = {};
        needComputeData.forEach(fullPropertyName => {
          let propertyName = fullPropertyName.split('.')[1];
          Object.defineProperty(computeProperties, propertyName, {
            get() {
              return root[propertyName];
            },
            enumerable: true,
            configurable: true
          });
        });
        let tobeUpdateData = Object.assign({}, changedData, computeProperties);
        contextLog(`[setData]本次变化的数据: ${JSON.stringify(tobeUpdateData)}`);
        root.__context.onChanged.call(null, tobeUpdateData);
        contextLog('========本次数据变更结束========');
        changedData = null;
      }
    });
  }
  /**
   * property的值有变化的时候调用此方法，用来将依赖属性设置为需要重新计算的状态
   */
  function needComputeReferenceProperty(property) {
    if (property.referenceList.length === 0) {
      contextLog(`  ${property.name}的值有变化`);
      return;
    }
    contextLog(`  ${property.name}的值有变化，将依赖于它的属性设置为下次获取需要重新计算的状态`);
    let references = [...property.referenceList];
    while (references.length > 0) {
      let p = references.shift();
      if (needComputeData.indexOf(p.name) === -1) {
        needComputeData.push(p.name);
      }
      if (p.referenceList.length > 0) {
        references = references.concat(p.referenceList);
      }
    }
  }

  // 当前运行上下文的所有属性的缓存
  const allPropertiesInstances = [];
  /**
   * 获取指定名称的属性，如果缓存中不存在则自动创建
   */
  function getProperty(name) {
    let p = allPropertiesInstances.find(elem => elem.name === name);
    if (!p) {
      p = new Property(name);
      allPropertiesInstances.push(p);
    }
    return p;
  }

  // 当前计算属性的缓存栈
  const currentComputePropertiesCache = [];
  function getCurrentComputeProperty() {
    if (currentComputePropertiesCache.length > 0) {
      return currentComputePropertiesCache[currentComputePropertiesCache.length - 1];
    } else {
      return null;
    }
  }
  function setCurrentComputeProperty(v) {
    currentComputePropertiesCache.push(v);
  }
  function resetCurrentComputeProperty() {
    if (currentComputePropertiesCache.length > 0) {
      currentComputePropertiesCache.pop();
    }
  }

  return {
    contextLog,
    get root() {
      return root;
    },
    set root(v) {
      root = v;
    },
    get needComputeData() {
      return needComputeData;
    },
    get computePropertyHandlers() {
      return computePropertyHandlers;
    },
    get isInit() {
      return isInit;
    },
    set isInit(v) {
      isInit = v;
    },
    get currentComputeProperty() {
      return getCurrentComputeProperty();
    },
    set currentComputeProperty(v) {
      setCurrentComputeProperty(v);
    },
    resetCurrentComputeProperty,
    triggerChangedCallback,
    getProperty,
    onChanged: null
  };
}
