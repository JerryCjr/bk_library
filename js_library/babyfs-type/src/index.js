/**
* 主模块文件
*/
import 'babel-polyfill';

import type from './typeDefination.js';

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
			}*/
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
 * @returns {Type}
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
	}
	else if (obj instanceof Element) {
		return type.bElement;
	}
	else if (obj instanceof Document) {
		return type.bDocument;
	}
	else if (obj instanceof Node) {
		return type.bNode;
	}
	else if (isArrayList(obj)) {
		return type.bArraylist;
	}
	else {
		return type.bObject;
	}
}

/**
 * 判断参数是否为对象
 * @param obj
 * @returns {Boolean}
 */
function isObject(obj) {
	return 'undefined,number,boolean,string'.indexOf(typeof obj) < 0;
}

/**
 * 判断对象是否为空或者未定义
 * @param obj
 * @returns {Boolean}
 */
function isObjectNullOrUndefined(obj) {
	if (obj === undefined) {
		return true;
	}
	if (!isObject(obj)) {
		throw new Error('Parameter is not an object!');
	}
	return obj === null;
}

/**
 * 判断一个变量是否未定义或者为空
 * @param v
 */
function isNullOrUndefined(v) {
	if (v === undefined) {
		return true;
	}
	return v === null;
}

/**
 * 判断字符串是否为空或者未定义或者空字符串
 * @param str
 * @returns {Boolean}
 */
function isStringEmpty(str) {
	var ty = getType(str);
	if (ty === type.bUndefined || ty === type.bNull) {
		return true;
	}
	if (ty !== type.bString) {
		throw new Error('Parameter is not a string!');
	}
	if (isObject(str)) {
		return str.valueOf() === '';
	}
	else {
		return str === '';
	}
}

/**
 * 判断数字是否是浮点型，并返回小数位数等信息
 * @returns { isNumber: Boolean, isFloat: Boolean, pointRightCount: Number }
 */
function getFloatInfo(n) {
	var ret = {
		isNumber: false,
		isFloat: false,
		pointRightCount: 0
	};
	if (isNaN(n)) {
		return ret;
	}
	ret.isNumber = true;
	var strN = n.toString();
	var pInt = parseInt(strN);
	var pFloat = parseFloat(strN);
	if (pInt === pFloat) {
		return ret;
	}
	ret.isFloat = true;
	ret.pointRightCount = strN.length - 1 - strN.indexOf('.');
	return ret;
}

export default {
  EnumType: type,
  getType,
  isObject,
  isObjectNullOrUndefined,
  isNullOrUndefined,
  isStringEmpty,
  getFloatInfo
};
