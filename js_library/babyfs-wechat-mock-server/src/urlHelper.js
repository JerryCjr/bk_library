
function addParameter(query, url) {
  var queryDic = {};
  var idx = url.indexOf('?');
  var anchorIdx = url.indexOf('#');
  var anchor = '';
  if (idx > -1) {
    if (anchorIdx > -1) {
      queryDic = queryStr2Dic(url.substr(idx, anchorIdx - idx));
      anchor = url.substr(anchorIdx);
      url = url.substr(0, idx);
    }
    else {
      queryDic = queryStr2Dic(url.substr(idx));
      url = url.substr(0, idx);
    }
  }
  else if (anchorIdx > -1) {
    anchor = url.substr(anchorIdx);
    url = url.substr(0, anchorIdx);
  }
  for (var p in query) {
    queryDic[p] = encodeURIComponent(query[p]);
  }
  return url + queryDic2Str(queryDic) + anchor;
}

function removeParameter(parameterNames, url) {
  var queryDic = {};
  var idx = url.indexOf('?');
  var anchorIdx = url.indexOf('#');
  var anchor = '';
  if (idx > -1) {
    if (anchorIdx > -1) {
      queryDic = queryStr2Dic(url.substr(idx, anchorIdx - idx));
      anchor = url.substr(anchorIdx);
      url = url.substr(0, idx);
    }
    else {
      queryDic = queryStr2Dic(url.substr(idx));
      url = url.substr(0, idx);
    }
  }
  else if (anchorIdx > -1) {
    anchor = url.substr(anchorIdx);
    url = url.substr(0, anchorIdx);
  }
  parameterNames.forEach((elem) => {
    if (elem in queryDic) {
      delete queryDic[elem];
    }
  });
  return url + queryDic2Str(queryDic) + anchor;
}

function queryStr2Dic(str) {
	if (str === '?' || !str) {
		return {};
	}
	var dic = {};
	var kvps = str.substr(1).split('&');
	for (var i = 0; i < kvps.length; ++i) {
		var kv = kvps[i].split('=');
		var k = kv[0];
		var v = '';
		if (kv.length > 1) {
			v = kv[1];
		}
		dic[k] = v;
	}
	return dic;
}
function queryDic2Str(dic) {
	var str = '';
	var arr = [];
	for (var k in dic) {
		var v = dic[k];
		var kv = k + '=' + v;
		arr.push(kv);
	}
	if (arr.length > 0) {
		str = '?' + arr.join('&');
	}
	return str;
}

export default {
  addParameter,
  removeParameter
};
