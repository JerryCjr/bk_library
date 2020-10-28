let type = {
  bUndefined: 'undefined',
  bNull: 'null',
  bNumber: 'number',
  bBoolean: 'boolean',
  bString: 'string',
  bFunction: 'function',
  bRegExp: 'regexp',
  bArray: 'array',
  bDate: 'date',
  bError: 'error',
  bArraylist: 'arraylist',
  bObject: 'object'
};
let class2type = {
  'undefined': type.bUndefined,
  'number': type.bNumber,
  'boolean': type.bBoolean,
  'string': type.bString,
  'function': type.bFunction,
  '[object Boolean]': type.bBoolean,
  '[object Number]': type.bNumber,
  '[object String]': type.bString,
  '[object Function]': type.bFunction,
  '[object RegExp]': type.bRegExp,
  '[object Array]': type.bArray,
  '[object Date]': type.bDate,
  '[object Error]': type.bError
};
let coreToString = class2type.toString;

/**
 * 判断是否是类数组类型
 * @param {Boolean}
 */
function isArrayList(obj) {
  /* Real arrays are array-like
    if (obj instanceof Array)
    {
    return true;
    } */
  // Arrays must have a length property
  if (!('length' in obj)) {
    return false;
  }
  // Length must be a number
  if (typeof obj.length !== 'number') {
    return false;
  }
  // and nonnegative
  if (obj.length < 0) {
    return false;
  }
  if (obj.length > 0) {
    // If the array is nonempty, it must at a minimum
    // have a property defined whose name is the number length-1
    if (!((obj.length - 1) in obj)) {
      return false;
    }
  }
  return true;
}

/**
 * 判断参数的类型
 * @param obj
 * @returns {type}
 */
function getType(obj) {
  var ty = typeof obj;
  if (class2type[ty]) {
    return class2type[ty];
  }
  if (obj == null) {
    return type.bNull;
  }
  ty = coreToString.call(obj);
  if (class2type[ty]) {
    return class2type[ty];
  } else if (isArrayList(obj)) {
    return type.bArraylist;
  } else {
    return type.bObject;
  }
}

const output = {
  EnumType: type,
  getType
};
for (let typeString in type) {
  output[`is${typeString.substr(1)}`] = function (o) {
    return getType(o) === type[typeString];
  };
}

export default output;
