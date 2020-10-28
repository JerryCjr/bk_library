const SIGN_REGEXP = /([yMdhsm])(\1*)/g;
const DEFAULT_PATTERN = 'yyyy-MM-dd';

/**
 * @description 补零
 * @author Jerry Cheng
 * @date 2019-03-07
 * @param {*} s 源字符串
 * @param {*} len 目标长度
 * @returns
 */
function padding(s, len) {
  len = len - (s + '').length;
  for (var i = 0; i < len; i++) {
    s = '0' + s;
  }
  return s;
};

/**
 * @description format 日期格式化
 * @author Jerry Cheng
 * @date 2019-03-07
 * @param {Object} date 日期对象
 * @param {String} [pattern=DEFAULT_PATTERN] 格式化规则
 * @returns 格式化字符串
 */
function format(date, pattern = DEFAULT_PATTERN) {
  return pattern.replace(SIGN_REGEXP, function ($0) {
    switch ($0.charAt(0)) {
      case 'y':
        return padding(date.getFullYear(), $0.length);
      case 'M':
        return padding(date.getMonth() + 1, $0.length);
      case 'd':
        return padding(date.getDate(), $0.length);
      case 'h':
        return padding(date.getHours(), $0.length);
      case 'm':
        return padding(date.getMinutes(), $0.length);
      case 's':
        return padding(date.getSeconds(), $0.length);
    }
  });
}

/**
 * @description format的逆向过程 转化日期字符串为date对象
 * @author Jerry Cheng
 * @date 2019-03-07
 * @param {String} dateString 日期字符串
 * @param {String} pattern 日期字符串形式
 * @returns
 */
function parse(dateString, pattern) {
  var matchs1 = pattern.match(SIGN_REGEXP);
  var matchs2 = dateString.match(/(\d)+/g);
  if (matchs1.length === matchs2.length) {
    var _date = new Date(1970, 0, 1);
    for (var i = 0; i < matchs1.length; i++) {
      var _int = parseInt(matchs2[i]);
      var sign = matchs1[i];
      switch (sign.charAt(0)) {
        case 'y':
          _date.setFullYear(_int);
          break;
        case 'M':
          _date.setMonth(_int - 1);
          break;
        case 'd':
          _date.setDate(_int);
          break;
        case 'h':
          _date.setHours(_int);
          break;
        case 'm':
          _date.setMinutes(_int);
          break;
        case 's':
          _date.setSeconds(_int);
          break;
      }
    }
    return _date;
  }
  return null;
}

export default {
  format,
  parse
};
