webpackJsonp([3],{226:function(e,t,n){"use strict";function r(e){n(407)}Object.defineProperty(t,"__esModule",{value:!0});var o=n(395),s=n(409),i=n(102),a=r,u=i(o.a,s.a,!1,a,"data-v-a4a111c6",null);t.default=u.exports},228:function(e,t,n){"use strict";function r(e){return"[object Array]"===E.call(e)}function o(e){return"[object ArrayBuffer]"===E.call(e)}function s(e){return"undefined"!=typeof FormData&&e instanceof FormData}function i(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer}function a(e){return"string"==typeof e}function u(e){return"number"==typeof e}function c(e){return void 0===e}function f(e){return null!==e&&"object"==typeof e}function p(e){return"[object Date]"===E.call(e)}function l(e){return"[object File]"===E.call(e)}function d(e){return"[object Blob]"===E.call(e)}function h(e){return"[object Function]"===E.call(e)}function m(e){return f(e)&&h(e.pipe)}function v(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams}function g(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}function y(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)}function w(e,t){if(null!==e&&void 0!==e)if("object"!=typeof e&&(e=[e]),r(e))for(var n=0,o=e.length;n<o;n++)t.call(null,e[n],n,e);else for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.call(null,e[s],s,e)}function x(){function e(e,n){"object"==typeof t[n]&&"object"==typeof e?t[n]=x(t[n],e):t[n]=e}for(var t={},n=0,r=arguments.length;n<r;n++)w(arguments[n],e);return t}function _(e,t,n){return w(t,function(t,r){e[r]=n&&"function"==typeof t?b(t,n):t}),e}var b=n(234),C=n(245),E=Object.prototype.toString;e.exports={isArray:r,isArrayBuffer:o,isBuffer:C,isFormData:s,isArrayBufferView:i,isString:a,isNumber:u,isObject:f,isUndefined:c,isDate:p,isFile:l,isBlob:d,isFunction:h,isStream:m,isURLSearchParams:v,isStandardBrowserEnv:y,forEach:w,merge:x,extend:_,trim:g}},232:function(e,t,n){"use strict";(function(t){function r(e,t){!o.isUndefined(e)&&o.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var o=n(228),s=n(247),i={"Content-Type":"application/x-www-form-urlencoded"},a={adapter:function(){var e;return"undefined"!=typeof XMLHttpRequest?e=n(235):void 0!==t&&(e=n(235)),e}(),transformRequest:[function(e,t){return s(t,"Content-Type"),o.isFormData(e)||o.isArrayBuffer(e)||o.isBuffer(e)||o.isStream(e)||o.isFile(e)||o.isBlob(e)?e:o.isArrayBufferView(e)?e.buffer:o.isURLSearchParams(e)?(r(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):o.isObject(e)?(r(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};a.headers={common:{Accept:"application/json, text/plain, */*"}},o.forEach(["delete","get","head"],function(e){a.headers[e]={}}),o.forEach(["post","put","patch"],function(e){a.headers[e]=o.merge(i)}),e.exports=a}).call(t,n(41))},234:function(e,t,n){"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},235:function(e,t,n){"use strict";(function(t){var r=n(228),o=n(248),s=n(250),i=n(251),a=n(252),u=n(236),c="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||n(253);e.exports=function(e){return new Promise(function(f,p){var l=e.data,d=e.headers;r.isFormData(l)&&delete d["Content-Type"];var h=new XMLHttpRequest,m="onreadystatechange",v=!1;if("test"===t.env.NODE_ENV||"undefined"==typeof window||!window.XDomainRequest||"withCredentials"in h||a(e.url)||(h=new window.XDomainRequest,m="onload",v=!0,h.onprogress=function(){},h.ontimeout=function(){}),e.auth){var g=e.auth.username||"",y=e.auth.password||"";d.Authorization="Basic "+c(g+":"+y)}if(h.open(e.method.toUpperCase(),s(e.url,e.params,e.paramsSerializer),!0),h.timeout=e.timeout,h[m]=function(){if(h&&(4===h.readyState||v)&&(0!==h.status||h.responseURL&&0===h.responseURL.indexOf("file:"))){var t="getAllResponseHeaders"in h?i(h.getAllResponseHeaders()):null,n=e.responseType&&"text"!==e.responseType?h.response:h.responseText,r={data:n,status:1223===h.status?204:h.status,statusText:1223===h.status?"No Content":h.statusText,headers:t,config:e,request:h};o(f,p,r),h=null}},h.onerror=function(){p(u("Network Error",e,null,h)),h=null},h.ontimeout=function(){p(u("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED",h)),h=null},r.isStandardBrowserEnv()){var w=n(254),x=(e.withCredentials||a(e.url))&&e.xsrfCookieName?w.read(e.xsrfCookieName):void 0;x&&(d[e.xsrfHeaderName]=x)}if("setRequestHeader"in h&&r.forEach(d,function(e,t){void 0===l&&"content-type"===t.toLowerCase()?delete d[t]:h.setRequestHeader(t,e)}),e.withCredentials&&(h.withCredentials=!0),e.responseType)try{h.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&h.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&h.upload&&h.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){h&&(h.abort(),p(e),h=null)}),void 0===l&&(l=null),h.send(l)})}}).call(t,n(41))},236:function(e,t,n){"use strict";var r=n(249);e.exports=function(e,t,n,o,s){var i=new Error(e);return r(i,t,n,o,s)}},237:function(e,t,n){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},238:function(e,t,n){"use strict";function r(e){this.message=e}r.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},r.prototype.__CANCEL__=!0,e.exports=r},243:function(e,t,n){e.exports=n(244)},244:function(e,t,n){"use strict";function r(e){var t=new i(e),n=s(i.prototype.request,t);return o.extend(n,i.prototype,t),o.extend(n,t),n}var o=n(228),s=n(234),i=n(246),a=n(232),u=r(a);u.Axios=i,u.create=function(e){return r(o.merge(a,e))},u.Cancel=n(238),u.CancelToken=n(260),u.isCancel=n(237),u.all=function(e){return Promise.all(e)},u.spread=n(261),e.exports=u,e.exports.default=u},245:function(e,t){function n(e){return!!e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}function r(e){return"function"==typeof e.readFloatLE&&"function"==typeof e.slice&&n(e.slice(0,0))}/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
e.exports=function(e){return null!=e&&(n(e)||r(e)||!!e._isBuffer)}},246:function(e,t,n){"use strict";function r(e){this.defaults=e,this.interceptors={request:new i,response:new i}}var o=n(232),s=n(228),i=n(255),a=n(256);r.prototype.request=function(e){"string"==typeof e&&(e=s.merge({url:arguments[0]},arguments[1])),e=s.merge(o,{method:"get"},this.defaults,e),e.method=e.method.toLowerCase();var t=[a,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)n=n.then(t.shift(),t.shift());return n},s.forEach(["delete","get","head","options"],function(e){r.prototype[e]=function(t,n){return this.request(s.merge(n||{},{method:e,url:t}))}}),s.forEach(["post","put","patch"],function(e){r.prototype[e]=function(t,n,r){return this.request(s.merge(r||{},{method:e,url:t,data:n}))}}),e.exports=r},247:function(e,t,n){"use strict";var r=n(228);e.exports=function(e,t){r.forEach(e,function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])})}},248:function(e,t,n){"use strict";var r=n(236);e.exports=function(e,t,n){var o=n.config.validateStatus;n.status&&o&&!o(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}},249:function(e,t,n){"use strict";e.exports=function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e}},250:function(e,t,n){"use strict";function r(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var o=n(228);e.exports=function(e,t,n){if(!t)return e;var s;if(n)s=n(t);else if(o.isURLSearchParams(t))s=t.toString();else{var i=[];o.forEach(t,function(e,t){null!==e&&void 0!==e&&(o.isArray(e)?t+="[]":e=[e],o.forEach(e,function(e){o.isDate(e)?e=e.toISOString():o.isObject(e)&&(e=JSON.stringify(e)),i.push(r(t)+"="+r(e))}))}),s=i.join("&")}return s&&(e+=(-1===e.indexOf("?")?"?":"&")+s),e}},251:function(e,t,n){"use strict";var r=n(228),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,s,i={};return e?(r.forEach(e.split("\n"),function(e){if(s=e.indexOf(":"),t=r.trim(e.substr(0,s)).toLowerCase(),n=r.trim(e.substr(s+1)),t){if(i[t]&&o.indexOf(t)>=0)return;i[t]="set-cookie"===t?(i[t]?i[t]:[]).concat([n]):i[t]?i[t]+", "+n:n}}),i):i}},252:function(e,t,n){"use strict";var r=n(228);e.exports=r.isStandardBrowserEnv()?function(){function e(e){var t=e;return n&&(o.setAttribute("href",t),t=o.href),o.setAttribute("href",t),{href:o.href,protocol:o.protocol?o.protocol.replace(/:$/,""):"",host:o.host,search:o.search?o.search.replace(/^\?/,""):"",hash:o.hash?o.hash.replace(/^#/,""):"",hostname:o.hostname,port:o.port,pathname:"/"===o.pathname.charAt(0)?o.pathname:"/"+o.pathname}}var t,n=/(msie|trident)/i.test(navigator.userAgent),o=document.createElement("a");return t=e(window.location.href),function(n){var o=r.isString(n)?e(n):n;return o.protocol===t.protocol&&o.host===t.host}}():function(){return function(){return!0}}()},253:function(e,t,n){"use strict";function r(){this.message="String contains an invalid character"}function o(e){for(var t,n,o=String(e),i="",a=0,u=s;o.charAt(0|a)||(u="=",a%1);i+=u.charAt(63&t>>8-a%1*8)){if((n=o.charCodeAt(a+=.75))>255)throw new r;t=t<<8|n}return i}var s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.prototype=new Error,r.prototype.code=5,r.prototype.name="InvalidCharacterError",e.exports=o},254:function(e,t,n){"use strict";var r=n(228);e.exports=r.isStandardBrowserEnv()?function(){return{write:function(e,t,n,o,s,i){var a=[];a.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&a.push("expires="+new Date(n).toGMTString()),r.isString(o)&&a.push("path="+o),r.isString(s)&&a.push("domain="+s),!0===i&&a.push("secure"),document.cookie=a.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}()},255:function(e,t,n){"use strict";function r(){this.handlers=[]}var o=n(228);r.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},r.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},r.prototype.forEach=function(e){o.forEach(this.handlers,function(t){null!==t&&e(t)})},e.exports=r},256:function(e,t,n){"use strict";function r(e){e.cancelToken&&e.cancelToken.throwIfRequested()}var o=n(228),s=n(257),i=n(237),a=n(232),u=n(258),c=n(259);e.exports=function(e){return r(e),e.baseURL&&!u(e.url)&&(e.url=c(e.baseURL,e.url)),e.headers=e.headers||{},e.data=s(e.data,e.headers,e.transformRequest),e.headers=o.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),o.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]}),(e.adapter||a.adapter)(e).then(function(t){return r(e),t.data=s(t.data,t.headers,e.transformResponse),t},function(t){return i(t)||(r(e),t&&t.response&&(t.response.data=s(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})}},257:function(e,t,n){"use strict";var r=n(228);e.exports=function(e,t,n){return r.forEach(n,function(n){e=n(e,t)}),e}},258:function(e,t,n){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},259:function(e,t,n){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},260:function(e,t,n){"use strict";function r(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e});var n=this;e(function(e){n.reason||(n.reason=new o(e),t(n.reason))})}var o=n(238);r.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},r.source=function(){var e;return{token:new r(function(t){e=t}),cancel:e}},e.exports=r},261:function(e,t,n){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},395:function(e,t,n){"use strict";var r=n(243),o=n.n(r);t.a={name:"conversation",data:function(){return{messageList:[],refreshIntervalId:null}},mounted:function(){this.refreshConversation(),this.refreshIntervalId=setInterval(this.refreshConversation,3e3)},beforeDestroy:function(){clearInterval(this.refreshIntervalId)},methods:{refreshConversation:function(){var e=this,t=this.$route.query.userid;o.a.get("/mock/wx/chatmessage/get",{params:{userid:t}}).then(function(t){e.messageList=t.data.data}).catch(function(e){alert(e.message)})}}}},407:function(e,t,n){var r=n(408);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(222)("3bde3484",r,!0,{})},408:function(e,t,n){t=e.exports=n(221)(!1),t.push([e.i,"\nul[data-v-a4a111c6] {\n  list-style-type: none;\n  padding: 0;\n}\nli[data-v-a4a111c6] {\n  margin-bottom: 6px;\n}\n.title[data-v-a4a111c6] {\n  font-size: 14px;\n  color: gray;\n}\n.message-image[data-v-a4a111c6] {\n  width: 100%;\n}\n",""])},409:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div"),e._v(" "),n("div",[n("ul",e._l(e.messageList,function(t,r){return n("li",{key:r},[n("div",{staticClass:"title"},[n("span",[e._v("from: "+e._s(t.from)+" to: "+e._s(t.to))]),e._v(" ---- "),n("span",[e._v("time: "+e._s(new Date(t.timestamp).toLocaleTimeString()))])]),e._v(" "),t.content?n("div",[e._v(e._s(t.content))]):e._e(),e._v(" "),t.image?n("div",[n("img",{staticClass:"message-image",attrs:{src:t.image}})]):e._e(),e._v(" "),t.templateMessage?n("div",[n("div",[e._v("模版消息标题: "+e._s(t.templateMessage.title))]),e._v(" "),n("div",[e._v("模版消息内容: "+e._s(t.templateMessage.content))]),e._v(" "),t.templateMessage.miniprogramAppName?n("div",[e._v("外链小程序："+e._s(t.templateMessage.miniprogramAppName))]):e._e(),e._v(" "),n("div",[e._v("外链小程序页面地址: "+e._s(t.templateMessage.miniprogramPage))]),e._v(" "),t.templateMessage.outterUrl?n("div",[e._v("外链H5页面地址："+e._s(t.templateMessage.outterUrl))]):e._e()]):e._e()])}),0)])])},o=[],s={render:r,staticRenderFns:o};t.a=s}});
//# sourceMappingURL=3.2e004ea.js.map