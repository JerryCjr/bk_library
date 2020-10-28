/**
 * 主模块文件
 */

let rootDomainCache = '';
const absoluteUrlRegex = /^(https?:)?\/\/(([\dA-Za-z\-]+(\.[\dA-Za-z\-]+)+)|localhost)(:\d+)?((\/[\w\-\.]+)*(\/|(\.[\dA-Za-z]+))?)?(\?[^#\f\n\r]*)?(#[^\f\n\r]*)?$/; //eslint-disable-line
const relativeUrlRegex = /^(\/[\w\-\.]+)*(\/|(\.[\dA-Za-z]+))?(\?[^#\f\n\r]*)?(#[^\f\n\r]*)?$/; //eslint-disable-line
interface QueryDic {
  [key: string]: any;
}
function addParameter(query: QueryDic, url = location.href, isAfterAnchor = false): string {
  let normalPath = '',
    anchorPath = '',
    prefix = '',
    r = '';
  const anchorIdx = url.indexOf('#');

  let queryDic: QueryDic = {};
  function prefixHandler(path: string) {
    const idx = path.indexOf('?');
    if (idx > -1) {
      queryDic = queryStr2Dic(path.substr(idx));
      prefix = path.substr(0, idx);
    } else {
      prefix = path;
    }
  }

  // 区分是否带锚点 是否处理为锚点后的query参数
  if (anchorIdx > -1 && !isAfterAnchor) {
    normalPath = url.slice(0, anchorIdx);
    anchorPath = url.slice(anchorIdx);
    prefixHandler(normalPath);
    // console.log('normalPath', normalPath, 'anchorPath', anchorPath);
  } else {
    prefixHandler(url);
  }
  for (const p in query) {
    queryDic[p] = encodeURIComponent(query[p]);
  }

  r = prefix + queryDic2Str(queryDic) + anchorPath;
  // console.log('prefix', prefix, 'queryDic2Str', queryDic2Str(queryDic), 'anchorPath', anchorPath, 'r', r);
  return r;
}

function removeParameter(parameterNames: Array<string>, url = location.href, isAfterAnchor = false): string {
  let normalPath = '',
    anchorPath = '',
    prefix = '',
    r = '';
  const anchorIdx = url.indexOf('#');
  let queryDic: QueryDic = {};

  function prefixHandler(path: string) {
    const idx = path.indexOf('?');
    if (idx > -1) {
      queryDic = queryStr2Dic(path.substr(idx));
      prefix = path.substr(0, idx);
    } else {
      prefix = path;
    }
  }

  // 区分是否带锚点  是否处理为锚点后的query参数
  if (anchorIdx > -1 && !isAfterAnchor) {
    normalPath = url.slice(0, anchorIdx);
    anchorPath = url.slice(anchorIdx);
    prefixHandler(normalPath);
    // console.log('normalPath', normalPath, 'anchorPath', anchorPath);
  } else {
    prefixHandler(url);
  }

  parameterNames.forEach((elem) => {
    if (elem in queryDic) {
      delete queryDic[elem];
    }
  });

  r = prefix + queryDic2Str(queryDic) + anchorPath;
  // console.log('prefix', prefix, 'queryDic2Str', queryDic2Str(queryDic), 'anchorPath', anchorPath, 'r', r);
  return r;
}

function analyze(url: string): QueryDic {
  const isAbsoluteUrl = absoluteUrlRegex.test(url);
  const isRelativeUrl = relativeUrlRegex.test(url);
  if (!isAbsoluteUrl && !isRelativeUrl) {
    throw new Error('url is error');
  }
  let result: QueryDic = {};
  if (isAbsoluteUrl) {
    const idxDoubleSlash = url.indexOf('//');
    url = url.substr(idxDoubleSlash + 2);
    const idxSlash = url.indexOf('/');
    let host = url;
    let path = '';
    if (idxSlash > -1) {
      host = url.substr(0, idxSlash);
      path = url.substr(idxSlash);
    }
    result = {
      isAbsoluteUrl: true,
      sameDomain: host === location.host,
      host,
      path,
    };
  } else {
    result = {
      isAbsoluteUrl: false,
      sameDomain: true,
      host: '',
      path: url,
    };
  }
  const questionMarkIndex = result.path.indexOf('?');
  const anchorMarkIndex = result.path.indexOf('#');
  if (questionMarkIndex > -1) {
    if (anchorMarkIndex > -1) {
      result.query = queryStr2Dic(result.path.substr(questionMarkIndex, anchorMarkIndex - questionMarkIndex));
      result.anchor = result.path.substr(anchorMarkIndex + 1);
    } else {
      result.query = queryStr2Dic(result.path.substr(questionMarkIndex));
      result.anchor = '';
    }
  } else {
    if (anchorMarkIndex > -1) {
      result.query = {};
      result.anchor = result.path.substr(anchorMarkIndex + 1);
    } else {
      result.query = {};
      result.anchor = '';
    }
  }

  return result;
}

function getRootDomain(hostname = location.hostname): string {
  try {
    const urlHost = hostname.toLowerCase();
    const urlHostArray = urlHost.split('.');
    if (urlHostArray.length < 3 || isIP(urlHost)) {
      return urlHost;
    }
    const urlHost2 = urlHost.substr(urlHost.indexOf('.') + 1);
    if (
      urlHost2.startsWith('com.') ||
      urlHost2.startsWith('net.') ||
      urlHost2.startsWith('org.') ||
      urlHost2.startsWith('gov.')
    ) {
      return urlHost;
    } else {
      return urlHost2;
    }
  } catch (e) {
    return '';
  }
}

function queryStr2Dic(str: string): QueryDic {
  if (str === '?' || str === '') {
    return {};
  }
  const dic: QueryDic = {};
  const kvps = str.substr(1).split('&');
  for (let i = 0; i < kvps.length; ++i) {
    const kv = kvps[i].split('=');
    const k = kv[0];
    let v = '';
    if (kv.length > 1) {
      v = kv[1];
    }
    dic[k] = v;
  }
  return dic;
}
function queryDic2Str(dic: QueryDic) {
  let str = '';
  const arr = [];
  for (const k in dic) {
    const v = dic[k];
    const kv = k + '=' + v;
    arr.push(kv);
  }
  if (arr.length > 0) {
    str = '?' + arr.join('&');
  }
  return str;
}
/**
 * 判断字符串是否是IP地址
 * @param {String} str
 * @returns {Boolean}
 */
function isIP(str: string) {
  return /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/g.test(str);
}

export default {
  get rootDomain(): string {
    if (rootDomainCache === '') {
      rootDomainCache = getRootDomain();
    }
    return rootDomainCache;
  },
  analyze,
  addParameter,
  removeParameter,
  getRootDomain,
};
