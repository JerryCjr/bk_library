<<<<<<< HEAD
/* eslint-disable */

!(function(e, n) {
  module.exports = n(e);
})(window, function(o, e) {
=======
!(function (e, n) {
  module.exports = n(e);
})(window, function (o, e) {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
  if (!o.jWeixin) {
    var n,
      c = {
        config: "preVerifyJSAPI",
        onMenuShareTimeline: "menu:share:timeline",
        onMenuShareAppMessage: "menu:share:appmessage",
        onMenuShareQQ: "menu:share:qq",
        onMenuShareWeibo: "menu:share:weiboApp",
        onMenuShareQZone: "menu:share:QZone",
        previewImage: "imagePreview",
        getLocation: "geoLocation",
        openProductSpecificView: "openProductViewWithPid",
        addCard: "batchAddCard",
        openCard: "batchViewCard",
        chooseWXPay: "getBrandWCPayRequest",
        openEnterpriseRedPacket: "getRecevieBizHongBaoRequest",
        startSearchBeacons: "startMonitoringBeacons",
        stopSearchBeacons: "stopMonitoringBeacons",
        onSearchBeacons: "onBeaconsInRange",
        consumeAndShareCard: "consumedShareCard",
<<<<<<< HEAD
        openAddress: "editAddress"
      },
      a = (function() {
=======
        openAddress: "editAddress",
      },
      a = (function () {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
        var e = {};
        for (var n in c) e[c[n]] = n;
        return e;
      })(),
      i = o.document,
      t = i.title,
      r = navigator.userAgent.toLowerCase(),
      s = navigator.platform.toLowerCase(),
      d = !(!s.match("mac") && !s.match("win")),
      u = -1 != r.indexOf("wxdebugger"),
      l = -1 != r.indexOf("micromessenger"),
      p = -1 != r.indexOf("android"),
      f = -1 != r.indexOf("iphone") || -1 != r.indexOf("ipad"),
      m = (n =
        r.match(/micromessenger\/(\d+\.\d+\.\d+)/) ||
        r.match(/micromessenger\/(\d+\.\d+)/))
        ? n[1]
        : "",
      g = {
        initStartTime: L(),
        initEndTime: 0,
        preVerifyStartTime: 0,
<<<<<<< HEAD
        preVerifyEndTime: 0
=======
        preVerifyEndTime: 0,
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
      },
      h = {
        version: 1,
        appId: "",
        initTime: 0,
        preVerifyTime: 0,
        networkType: "",
        isPreVerifyOk: 1,
        systemType: f ? 1 : p ? 2 : -1,
        clientVersion: m,
<<<<<<< HEAD
        url: encodeURIComponent(location.href)
=======
        url: encodeURIComponent(location.href),
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
      },
      v = {},
      S = { _completes: [] },
      y = { state: 0, data: {} };
<<<<<<< HEAD
    O(function() {
=======
    O(function () {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
      g.initEndTime = L();
    });
    var I = !1,
      _ = [],
      w = {
<<<<<<< HEAD
        config: function(e) {
          B("config", (v = e));
          var t = !1 !== v.check;
          O(function() {
=======
        config: function (e) {
          B("config", (v = e));
          var t = !1 !== v.check;
          O(function () {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
            if (t)
              M(
                c.config,
                {
                  verifyJsApiList: C(v.jsApiList),
<<<<<<< HEAD
                  verifyOpenTagList: C(v.openTagList)
                },
                (function() {
                  (S._complete = function(e) {
                    (g.preVerifyEndTime = L()), (y.state = 1), (y.data = e);
                  }),
                    (S.success = function(e) {
                      h.isPreVerifyOk = 0;
                    }),
                    (S.fail = function(e) {
=======
                  verifyOpenTagList: C(v.openTagList),
                },
                (function () {
                  (S._complete = function (e) {
                    (g.preVerifyEndTime = L()), (y.state = 1), (y.data = e);
                  }),
                    (S.success = function (e) {
                      h.isPreVerifyOk = 0;
                    }),
                    (S.fail = function (e) {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
                      S._fail ? S._fail(e) : (y.state = -1);
                    });
                  var t = S._completes;
                  return (
<<<<<<< HEAD
                    t.push(function() {
                      !(function() {
=======
                    t.push(function () {
                      !(function () {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
                        if (
                          !(
                            d ||
                            u ||
                            v.debug ||
                            m < "6.0.2" ||
                            h.systemType < 0
                          )
                        ) {
                          var i = new Image();
                          (h.appId = v.appId),
                            (h.initTime = g.initEndTime - g.initStartTime),
                            (h.preVerifyTime =
                              g.preVerifyEndTime - g.preVerifyStartTime),
                            w.getNetworkType({
                              isInnerInvoke: !0,
<<<<<<< HEAD
                              success: function(e) {
=======
                              success: function (e) {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
                                h.networkType = e.networkType;
                                var n =
                                  "https://open.weixin.qq.com/sdk/report?v=" +
                                  h.version +
                                  "&o=" +
                                  h.isPreVerifyOk +
                                  "&s=" +
                                  h.systemType +
                                  "&c=" +
                                  h.clientVersion +
                                  "&a=" +
                                  h.appId +
                                  "&n=" +
                                  h.networkType +
                                  "&i=" +
                                  h.initTime +
                                  "&p=" +
                                  h.preVerifyTime +
                                  "&u=" +
                                  h.url;
                                i.src = n;
<<<<<<< HEAD
                              }
=======
                              },
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
                            });
                        }
                      })();
                    }),
<<<<<<< HEAD
                    (S.complete = function(e) {
=======
                    (S.complete = function (e) {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
                      for (var n = 0, i = t.length; n < i; ++n) t[n]();
                      S._completes = [];
                    }),
                    S
                  );
                })()
              ),
                (g.preVerifyStartTime = L());
            else {
              y.state = 1;
              for (var e = S._completes, n = 0, i = e.length; n < i; ++n)
                e[n]();
              S._completes = [];
            }
          }),
            w.invoke ||
<<<<<<< HEAD
              ((w.invoke = function(e, n, i) {
                o.WeixinJSBridge && WeixinJSBridge.invoke(e, x(n), i);
              }),
              (w.on = function(e, n) {
                o.WeixinJSBridge && WeixinJSBridge.on(e, n);
              }));
        },
        ready: function(e) {
          0 != y.state ? e() : (S._completes.push(e), !l && v.debug && e());
        },
        error: function(e) {
          m < "6.0.2" || (-1 == y.state ? e(y.data) : (S._fail = e));
        },
        checkJsApi: function(e) {
          M(
            "checkJsApi",
            { jsApiList: C(e.jsApiList) },
            ((e._complete = function(e) {
=======
              ((w.invoke = function (e, n, i) {
                o.WeixinJSBridge && WeixinJSBridge.invoke(e, x(n), i);
              }),
              (w.on = function (e, n) {
                o.WeixinJSBridge && WeixinJSBridge.on(e, n);
              }));
        },
        ready: function (e) {
          0 != y.state ? e() : (S._completes.push(e), !l && v.debug && e());
        },
        error: function (e) {
          m < "6.0.2" || (-1 == y.state ? e(y.data) : (S._fail = e));
        },
        checkJsApi: function (e) {
          M(
            "checkJsApi",
            { jsApiList: C(e.jsApiList) },
            ((e._complete = function (e) {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
              if (p) {
                var n = e.checkResult;
                n && (e.checkResult = JSON.parse(n));
              }
<<<<<<< HEAD
              e = (function(e) {
=======
              e = (function (e) {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
                var n = e.checkResult;
                for (var i in n) {
                  var t = a[i];
                  t && ((n[t] = n[i]), delete n[i]);
                }
                return e;
              })(e);
            }),
            e)
          );
        },
<<<<<<< HEAD
        onMenuShareTimeline: function(e) {
          P(
            c.onMenuShareTimeline,
            {
              complete: function() {
=======
        onMenuShareTimeline: function (e) {
          P(
            c.onMenuShareTimeline,
            {
              complete: function () {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
                M(
                  "shareTimeline",
                  {
                    title: e.title || t,
                    desc: e.title || t,
                    img_url: e.imgUrl || "",
                    link: e.link || location.href,
                    type: e.type || "link",
<<<<<<< HEAD
                    data_url: e.dataUrl || ""
                  },
                  e
                );
              }
=======
                    data_url: e.dataUrl || "",
                  },
                  e
                );
              },
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
            },
            e
          );
        },
<<<<<<< HEAD
        onMenuShareAppMessage: function(n) {
          P(
            c.onMenuShareAppMessage,
            {
              complete: function(e) {
=======
        onMenuShareAppMessage: function (n) {
          P(
            c.onMenuShareAppMessage,
            {
              complete: function (e) {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
                "favorite" === e.scene
                  ? M("sendAppMessage", {
                      title: n.title || t,
                      desc: n.desc || "",
                      link: n.link || location.href,
                      img_url: n.imgUrl || "",
                      type: n.type || "link",
<<<<<<< HEAD
                      data_url: n.dataUrl || ""
=======
                      data_url: n.dataUrl || "",
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
                    })
                  : M(
                      "sendAppMessage",
                      {
                        title: n.title || t,
                        desc: n.desc || "",
                        link: n.link || location.href,
                        img_url: n.imgUrl || "",
                        type: n.type || "link",
<<<<<<< HEAD
                        data_url: n.dataUrl || ""
                      },
                      n
                    );
              }
=======
                        data_url: n.dataUrl || "",
                      },
                      n
                    );
              },
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
            },
            n
          );
        },
<<<<<<< HEAD
        onMenuShareQQ: function(e) {
          P(
            c.onMenuShareQQ,
            {
              complete: function() {
=======
        onMenuShareQQ: function (e) {
          P(
            c.onMenuShareQQ,
            {
              complete: function () {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
                M(
                  "shareQQ",
                  {
                    title: e.title || t,
                    desc: e.desc || "",
                    img_url: e.imgUrl || "",
<<<<<<< HEAD
                    link: e.link || location.href
                  },
                  e
                );
              }
=======
                    link: e.link || location.href,
                  },
                  e
                );
              },
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
            },
            e
          );
        },
<<<<<<< HEAD
        onMenuShareWeibo: function(e) {
          P(
            c.onMenuShareWeibo,
            {
              complete: function() {
=======
        onMenuShareWeibo: function (e) {
          P(
            c.onMenuShareWeibo,
            {
              complete: function () {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
                M(
                  "shareWeiboApp",
                  {
                    title: e.title || t,
                    desc: e.desc || "",
                    img_url: e.imgUrl || "",
<<<<<<< HEAD
                    link: e.link || location.href
                  },
                  e
                );
              }
=======
                    link: e.link || location.href,
                  },
                  e
                );
              },
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
            },
            e
          );
        },
<<<<<<< HEAD
        onMenuShareQZone: function(e) {
          P(
            c.onMenuShareQZone,
            {
              complete: function() {
=======
        onMenuShareQZone: function (e) {
          P(
            c.onMenuShareQZone,
            {
              complete: function () {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
                M(
                  "shareQZone",
                  {
                    title: e.title || t,
                    desc: e.desc || "",
                    img_url: e.imgUrl || "",
<<<<<<< HEAD
                    link: e.link || location.href
                  },
                  e
                );
              }
=======
                    link: e.link || location.href,
                  },
                  e
                );
              },
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
            },
            e
          );
        },
<<<<<<< HEAD
        updateTimelineShareData: function(e) {
=======
        updateTimelineShareData: function (e) {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
          M(
            "updateTimelineShareData",
            { title: e.title, link: e.link, imgUrl: e.imgUrl },
            e
          );
        },
<<<<<<< HEAD
        updateAppMessageShareData: function(e) {
=======
        updateAppMessageShareData: function (e) {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
          M(
            "updateAppMessageShareData",
            { title: e.title, desc: e.desc, link: e.link, imgUrl: e.imgUrl },
            e
          );
        },
<<<<<<< HEAD
        startRecord: function(e) {
          M("startRecord", {}, e);
        },
        stopRecord: function(e) {
          M("stopRecord", {}, e);
        },
        onVoiceRecordEnd: function(e) {
          P("onVoiceRecordEnd", e);
        },
        playVoice: function(e) {
          M("playVoice", { localId: e.localId }, e);
        },
        pauseVoice: function(e) {
          M("pauseVoice", { localId: e.localId }, e);
        },
        stopVoice: function(e) {
          M("stopVoice", { localId: e.localId }, e);
        },
        onVoicePlayEnd: function(e) {
          P("onVoicePlayEnd", e);
        },
        uploadVoice: function(e) {
=======
        startRecord: function (e) {
          M("startRecord", {}, e);
        },
        stopRecord: function (e) {
          M("stopRecord", {}, e);
        },
        onVoiceRecordEnd: function (e) {
          P("onVoiceRecordEnd", e);
        },
        playVoice: function (e) {
          M("playVoice", { localId: e.localId }, e);
        },
        pauseVoice: function (e) {
          M("pauseVoice", { localId: e.localId }, e);
        },
        stopVoice: function (e) {
          M("stopVoice", { localId: e.localId }, e);
        },
        onVoicePlayEnd: function (e) {
          P("onVoicePlayEnd", e);
        },
        uploadVoice: function (e) {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
          M(
            "uploadVoice",
            {
              localId: e.localId,
<<<<<<< HEAD
              isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
=======
              isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1,
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
            },
            e
          );
        },
<<<<<<< HEAD
        downloadVoice: function(e) {
=======
        downloadVoice: function (e) {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
          M(
            "downloadVoice",
            {
              serverId: e.serverId,
<<<<<<< HEAD
              isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
=======
              isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1,
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
            },
            e
          );
        },
<<<<<<< HEAD
        translateVoice: function(e) {
=======
        translateVoice: function (e) {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
          M(
            "translateVoice",
            {
              localId: e.localId,
<<<<<<< HEAD
              isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
=======
              isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1,
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
            },
            e
          );
        },
<<<<<<< HEAD
        chooseImage: function(e) {
=======
        chooseImage: function (e) {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
          M(
            "chooseImage",
            {
              scene: "1|2",
              count: e.count || 9,
              sizeType: e.sizeType || ["original", "compressed"],
<<<<<<< HEAD
              sourceType: e.sourceType || ["album", "camera"]
            },
            ((e._complete = function(e) {
=======
              sourceType: e.sourceType || ["album", "camera"],
            },
            ((e._complete = function (e) {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
              if (p) {
                var n = e.localIds;
                try {
                  n && (e.localIds = JSON.parse(n));
                } catch (e) {}
              }
            }),
            e)
          );
        },
<<<<<<< HEAD
        getLocation: function(e) {},
        previewImage: function(e) {
          M(c.previewImage, { current: e.current, urls: e.urls }, e);
        },
        uploadImage: function(e) {
=======
        getLocation: function (e) {},
        previewImage: function (e) {
          M(c.previewImage, { current: e.current, urls: e.urls }, e);
        },
        uploadImage: function (e) {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
          M(
            "uploadImage",
            {
              localId: e.localId,
<<<<<<< HEAD
              isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
=======
              isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1,
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
            },
            e
          );
        },
<<<<<<< HEAD
        downloadImage: function(e) {
=======
        downloadImage: function (e) {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
          M(
            "downloadImage",
            {
              serverId: e.serverId,
<<<<<<< HEAD
              isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
=======
              isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1,
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
            },
            e
          );
        },
<<<<<<< HEAD
        getLocalImgData: function(e) {
=======
        getLocalImgData: function (e) {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
          !1 === I
            ? ((I = !0),
              M(
                "getLocalImgData",
                { localId: e.localId },
<<<<<<< HEAD
                ((e._complete = function(e) {
=======
                ((e._complete = function (e) {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
                  if (((I = !1), 0 < _.length)) {
                    var n = _.shift();
                    wx.getLocalImgData(n);
                  }
                }),
                e)
              ))
            : _.push(e);
        },
<<<<<<< HEAD
        getNetworkType: function(e) {
          M(
            "getNetworkType",
            {},
            ((e._complete = function(e) {
              e = (function(e) {
=======
        getNetworkType: function (e) {
          M(
            "getNetworkType",
            {},
            ((e._complete = function (e) {
              e = (function (e) {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
                var n = e.errMsg;
                e.errMsg = "getNetworkType:ok";
                var i = e.subtype;
                if ((delete e.subtype, i)) e.networkType = i;
                else {
                  var t = n.indexOf(":"),
                    o = n.substring(t + 1);
                  switch (o) {
                    case "wifi":
                    case "edge":
                    case "wwan":
                      e.networkType = o;
                      break;
                    default:
                      e.errMsg = "getNetworkType:fail";
                  }
                }
                return e;
              })(e);
            }),
            e)
          );
        },
<<<<<<< HEAD
        openLocation: function(e) {
=======
        openLocation: function (e) {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
          M(
            "openLocation",
            {
              latitude: e.latitude,
              longitude: e.longitude,
              name: e.name || "",
              address: e.address || "",
              scale: e.scale || 28,
<<<<<<< HEAD
              infoUrl: e.infoUrl || ""
=======
              infoUrl: e.infoUrl || "",
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
            },
            e
          );
        },
<<<<<<< HEAD
        getLocation: function(e) {
          M(
            c.getLocation,
            { type: (e = e || {}).type || "wgs84" },
            ((e._complete = function(e) {
=======
        getLocation: function (e) {
          M(
            c.getLocation,
            { type: (e = e || {}).type || "wgs84" },
            ((e._complete = function (e) {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
              delete e.type;
            }),
            e)
          );
        },
<<<<<<< HEAD
        hideOptionMenu: function(e) {
          M("hideOptionMenu", {}, e);
        },
        showOptionMenu: function(e) {
          M("showOptionMenu", {}, e);
        },
        closeWindow: function(e) {
          M("closeWindow", {}, (e = e || {}));
        },
        hideMenuItems: function(e) {
          M("hideMenuItems", { menuList: e.menuList }, e);
        },
        showMenuItems: function(e) {
          M("showMenuItems", { menuList: e.menuList }, e);
        },
        hideAllNonBaseMenuItem: function(e) {
          M("hideAllNonBaseMenuItem", {}, e);
        },
        showAllNonBaseMenuItem: function(e) {
          M("showAllNonBaseMenuItem", {}, e);
        },
        scanQRCode: function(e) {
=======
        hideOptionMenu: function (e) {
          M("hideOptionMenu", {}, e);
        },
        showOptionMenu: function (e) {
          M("showOptionMenu", {}, e);
        },
        closeWindow: function (e) {
          M("closeWindow", {}, (e = e || {}));
        },
        hideMenuItems: function (e) {
          M("hideMenuItems", { menuList: e.menuList }, e);
        },
        showMenuItems: function (e) {
          M("showMenuItems", { menuList: e.menuList }, e);
        },
        hideAllNonBaseMenuItem: function (e) {
          M("hideAllNonBaseMenuItem", {}, e);
        },
        showAllNonBaseMenuItem: function (e) {
          M("showAllNonBaseMenuItem", {}, e);
        },
        scanQRCode: function (e) {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
          M(
            "scanQRCode",
            {
              needResult: (e = e || {}).needResult || 0,
<<<<<<< HEAD
              scanType: e.scanType || ["qrCode", "barCode"]
            },
            ((e._complete = function(e) {
=======
              scanType: e.scanType || ["qrCode", "barCode"],
            },
            ((e._complete = function (e) {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
              if (f) {
                var n = e.resultStr;
                if (n) {
                  var i = JSON.parse(n);
                  e.resultStr = i && i.scan_code && i.scan_code.scan_result;
                }
              }
            }),
            e)
          );
        },
<<<<<<< HEAD
        openAddress: function(e) {
          M(
            c.openAddress,
            {},
            ((e._complete = function(e) {
              e = (function(e) {
=======
        openAddress: function (e) {
          M(
            c.openAddress,
            {},
            ((e._complete = function (e) {
              e = (function (e) {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
                return (
                  (e.postalCode = e.addressPostalCode),
                  delete e.addressPostalCode,
                  (e.provinceName = e.proviceFirstStageName),
                  delete e.proviceFirstStageName,
                  (e.cityName = e.addressCitySecondStageName),
                  delete e.addressCitySecondStageName,
                  (e.countryName = e.addressCountiesThirdStageName),
                  delete e.addressCountiesThirdStageName,
                  (e.detailInfo = e.addressDetailInfo),
                  delete e.addressDetailInfo,
                  e
                );
              })(e);
            }),
            e)
          );
        },
<<<<<<< HEAD
        openProductSpecificView: function(e) {
=======
        openProductSpecificView: function (e) {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
          M(
            c.openProductSpecificView,
            {
              pid: e.productId,
              view_type: e.viewType || 0,
<<<<<<< HEAD
              ext_info: e.extInfo
=======
              ext_info: e.extInfo,
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
            },
            e
          );
        },
<<<<<<< HEAD
        addCard: function(e) {
=======
        addCard: function (e) {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
          for (var n = e.cardList, i = [], t = 0, o = n.length; t < o; ++t) {
            var r = n[t],
              a = { card_id: r.cardId, card_ext: r.cardExt };
            i.push(a);
          }
          M(
            c.addCard,
            { card_list: i },
<<<<<<< HEAD
            ((e._complete = function(e) {
=======
            ((e._complete = function (e) {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
              var n = e.card_list;
              if (n) {
                for (var i = 0, t = (n = JSON.parse(n)).length; i < t; ++i) {
                  var o = n[i];
                  (o.cardId = o.card_id),
                    (o.cardExt = o.card_ext),
                    (o.isSuccess = !!o.is_succ),
                    delete o.card_id,
                    delete o.card_ext,
                    delete o.is_succ;
                }
                (e.cardList = n), delete e.card_list;
              }
            }),
            e)
          );
        },
<<<<<<< HEAD
        chooseCard: function(e) {
=======
        chooseCard: function (e) {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
          M(
            "chooseCard",
            {
              app_id: v.appId,
              location_id: e.shopId || "",
              sign_type: e.signType || "SHA1",
              card_id: e.cardId || "",
              card_type: e.cardType || "",
              card_sign: e.cardSign,
              time_stamp: e.timestamp + "",
<<<<<<< HEAD
              nonce_str: e.nonceStr
            },
            ((e._complete = function(e) {
=======
              nonce_str: e.nonceStr,
            },
            ((e._complete = function (e) {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
              (e.cardList = e.choose_card_info), delete e.choose_card_info;
            }),
            e)
          );
        },
<<<<<<< HEAD
        openCard: function(e) {
=======
        openCard: function (e) {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
          for (var n = e.cardList, i = [], t = 0, o = n.length; t < o; ++t) {
            var r = n[t],
              a = { card_id: r.cardId, code: r.code };
            i.push(a);
          }
          M(c.openCard, { card_list: i }, e);
        },
<<<<<<< HEAD
        consumeAndShareCard: function(e) {
=======
        consumeAndShareCard: function (e) {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
          M(
            c.consumeAndShareCard,
            { consumedCardId: e.cardId, consumedCode: e.code },
            e
          );
        },
<<<<<<< HEAD
        chooseWXPay: function(e) {
          M(c.chooseWXPay, V(e), e);
        },
        openEnterpriseRedPacket: function(e) {
          M(c.openEnterpriseRedPacket, V(e), e);
        },
        startSearchBeacons: function(e) {
          M(c.startSearchBeacons, { ticket: e.ticket }, e);
        },
        stopSearchBeacons: function(e) {
          M(c.stopSearchBeacons, {}, e);
        },
        onSearchBeacons: function(e) {
          P(c.onSearchBeacons, e);
        },
        openEnterpriseChat: function(e) {
=======
        chooseWXPay: function (e) {
          M(c.chooseWXPay, V(e), e);
        },
        openEnterpriseRedPacket: function (e) {
          M(c.openEnterpriseRedPacket, V(e), e);
        },
        startSearchBeacons: function (e) {
          M(c.startSearchBeacons, { ticket: e.ticket }, e);
        },
        stopSearchBeacons: function (e) {
          M(c.stopSearchBeacons, {}, e);
        },
        onSearchBeacons: function (e) {
          P(c.onSearchBeacons, e);
        },
        openEnterpriseChat: function (e) {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
          M(
            "openEnterpriseChat",
            { useridlist: e.userIds, chatname: e.groupName },
            e
          );
        },
<<<<<<< HEAD
        launchMiniProgram: function(e) {
=======
        launchMiniProgram: function (e) {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
          M(
            "launchMiniProgram",
            {
              targetAppId: e.targetAppId,
<<<<<<< HEAD
              path: (function(e) {
=======
              path: (function (e) {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
                if ("string" == typeof e && 0 < e.length) {
                  var n = e.split("?")[0],
                    i = e.split("?")[1];
                  return (n += ".html"), void 0 !== i ? n + "?" + i : n;
                }
              })(e.path),
<<<<<<< HEAD
              envVersion: e.envVersion
=======
              envVersion: e.envVersion,
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
            },
            e
          );
        },
<<<<<<< HEAD
        openBusinessView: function(e) {
=======
        openBusinessView: function (e) {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
          M(
            "openBusinessView",
            {
              businessType: e.businessType,
              queryString: e.queryString || "",
<<<<<<< HEAD
              envVersion: e.envVersion
            },
            ((e._complete = function(n) {
=======
              envVersion: e.envVersion,
            },
            ((e._complete = function (n) {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
              if (p) {
                var e = n.extraData;
                if (e)
                  try {
                    n.extraData = JSON.parse(e);
                  } catch (e) {
                    n.extraData = {};
                  }
              }
            }),
            e)
          );
        },
        miniProgram: {
<<<<<<< HEAD
          navigateBack: function(e) {
            (e = e || {}),
              O(function() {
=======
          navigateBack: function (e) {
            (e = e || {}),
              O(function () {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
                M(
                  "invokeMiniProgramAPI",
                  { name: "navigateBack", arg: { delta: e.delta || 1 } },
                  e
                );
              });
          },
<<<<<<< HEAD
          navigateTo: function(e) {
            O(function() {
=======
          navigateTo: function (e) {
            O(function () {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
              M(
                "invokeMiniProgramAPI",
                { name: "navigateTo", arg: { url: e.url } },
                e
              );
            });
          },
<<<<<<< HEAD
          redirectTo: function(e) {
            O(function() {
=======
          redirectTo: function (e) {
            O(function () {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
              M(
                "invokeMiniProgramAPI",
                { name: "redirectTo", arg: { url: e.url } },
                e
              );
            });
          },
<<<<<<< HEAD
          switchTab: function(e) {
            O(function() {
=======
          switchTab: function (e) {
            O(function () {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
              M(
                "invokeMiniProgramAPI",
                { name: "switchTab", arg: { url: e.url } },
                e
              );
            });
          },
<<<<<<< HEAD
          reLaunch: function(e) {
            O(function() {
=======
          reLaunch: function (e) {
            O(function () {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
              M(
                "invokeMiniProgramAPI",
                { name: "reLaunch", arg: { url: e.url } },
                e
              );
            });
          },
<<<<<<< HEAD
          postMessage: function(e) {
            O(function() {
=======
          postMessage: function (e) {
            O(function () {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
              M(
                "invokeMiniProgramAPI",
                { name: "postMessage", arg: e.data || {} },
                e
              );
            });
          },
<<<<<<< HEAD
          getEnv: function(e) {
            O(function() {
              e({ miniprogram: "miniprogram" === o.__wxjs_environment });
            });
          }
        }
=======
          getEnv: function (e) {
            O(function () {
              e({ miniprogram: "miniprogram" === o.__wxjs_environment });
            });
          },
        },
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
      },
      T = 1,
      k = {};
    return (
      i.addEventListener(
        "error",
<<<<<<< HEAD
        function(e) {
=======
        function (e) {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
          if (!p) {
            var n = e.target,
              i = n.tagName,
              t = n.src;
            if ("IMG" == i || "VIDEO" == i || "AUDIO" == i || "SOURCE" == i)
              if (-1 != t.indexOf("wxlocalresource://")) {
                e.preventDefault(), e.stopPropagation();
                var o = n["wx-id"];
                if ((o || ((o = T++), (n["wx-id"] = o)), k[o])) return;
                (k[o] = !0),
<<<<<<< HEAD
                  wx.ready(function() {
                    wx.getLocalImgData({
                      localId: t,
                      success: function(e) {
                        n.src = e.localData;
                      }
=======
                  wx.ready(function () {
                    wx.getLocalImgData({
                      localId: t,
                      success: function (e) {
                        n.src = e.localData;
                      },
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
                    });
                  });
              }
          }
        },
        !0
      ),
      i.addEventListener(
        "load",
<<<<<<< HEAD
        function(e) {
=======
        function (e) {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
          if (!p) {
            var n = e.target,
              i = n.tagName;
            n.src;
            if ("IMG" == i || "VIDEO" == i || "AUDIO" == i || "SOURCE" == i) {
              var t = n["wx-id"];
              t && (k[t] = !1);
            }
          }
        },
        !0
      ),
      e && (o.wx = o.jWeixin = w),
      w
    );
  }
  function M(n, e, i) {
    o.WeixinJSBridge
<<<<<<< HEAD
      ? WeixinJSBridge.invoke(n, x(e), function(e) {
=======
      ? WeixinJSBridge.invoke(n, x(e), function (e) {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
          A(n, e, i);
        })
      : B(n, i);
  }
  function P(n, i, t) {
    o.WeixinJSBridge
<<<<<<< HEAD
      ? WeixinJSBridge.on(n, function(e) {
=======
      ? WeixinJSBridge.on(n, function (e) {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
          t && t.trigger && t.trigger(e), A(n, e, i);
        })
      : B(n, t || i);
  }
  function x(e) {
    return (
      ((e = e || {}).appId = v.appId),
      (e.verifyAppId = v.appId),
      (e.verifySignType = "sha1"),
      (e.verifyTimestamp = v.timestamp + ""),
      (e.verifyNonceStr = v.nonceStr),
      (e.verifySignature = v.signature),
      e
    );
  }
  function V(e) {
    return {
      timeStamp: e.timestamp + "",
      nonceStr: e.nonceStr,
      package: e.package,
      paySign: e.paySign,
<<<<<<< HEAD
      signType: e.signType || "SHA1"
=======
      signType: e.signType || "SHA1",
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
    };
  }
  function A(e, n, i) {
    ("openEnterpriseChat" != e && "openBusinessView" !== e) ||
      (n.errCode = n.err_code),
      delete n.err_code,
      delete n.err_desc,
      delete n.err_detail;
    var t = n.errMsg;
    t ||
      ((t = n.err_msg),
      delete n.err_msg,
<<<<<<< HEAD
      (t = (function(e, n) {
=======
      (t = (function (e, n) {
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
        var i = e,
          t = a[i];
        t && (i = t);
        var o = "ok";
        if (n) {
          var r = n.indexOf(":");
          "confirm" == (o = n.substring(r + 1)) && (o = "ok"),
            "failed" == o && (o = "fail"),
            -1 != o.indexOf("failed_") && (o = o.substring(7)),
            -1 != o.indexOf("fail_") && (o = o.substring(5)),
            ("access denied" !=
              (o = (o = o.replace(/_/g, " ")).toLowerCase()) &&
              "no permission to execute" != o) ||
              (o = "permission denied"),
            "config" == i && "function not exist" == o && (o = "ok"),
            "" == o && (o = "fail");
        }
        return (n = i + ":" + o);
      })(e, t)),
      (n.errMsg = t)),
      (i = i || {})._complete && (i._complete(n), delete i._complete),
      (t = n.errMsg || ""),
      v.debug && !i.isInnerInvoke && alert(JSON.stringify(n));
    var o = t.indexOf(":");
    switch (t.substring(o + 1)) {
      case "ok":
        i.success && i.success(n);
        break;
      case "cancel":
        i.cancel && i.cancel(n);
        break;
      default:
        i.fail && i.fail(n);
<<<<<<< HEAD
    }
    i.complete && i.complete(n);
  }
  function C(e) {
    if (e) {
      for (var n = 0, i = e.length; n < i; ++n) {
        var t = e[n],
          o = c[t];
        o && (e[n] = o);
      }
      return e;
    }
=======
    }
    i.complete && i.complete(n);
  }
  function C(e) {
    if (e) {
      for (var n = 0, i = e.length; n < i; ++n) {
        var t = e[n],
          o = c[t];
        o && (e[n] = o);
      }
      return e;
    }
>>>>>>> cdf30d85436e7fbe731d5b2e646953e8215fe84e
  }
  function B(e, n) {
    if (!(!v.debug || (n && n.isInnerInvoke))) {
      var i = a[e];
      i && (e = i),
        n && n._complete && delete n._complete,
        console.log('"' + e + '",', n || "");
    }
  }
  function L() {
    return new Date().getTime();
  }
  function O(e) {
    l &&
      (o.WeixinJSBridge
        ? e()
        : i.addEventListener &&
          i.addEventListener("WeixinJSBridgeReady", e, !1));
  }
});
