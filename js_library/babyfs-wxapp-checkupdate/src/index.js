import ajax from 'babyfs-wxapp-request';

// getUpdateManager 基础库版本限制 1.9.90

/**
 * @func 获取kvconf配置 自动更新配置
 * @param {String} _id 小程序的key值 eg: wxa_primer
 * @return {Boolean} 自动更新的键值
 */
const pullConf = async function (_id) {
  let r;
  try {
    r = await ajax.GET({
      url: '/api/wx/getwxaconf',
      data: {
        wx_app: _id
      }
    });
  } catch (error) {
    console.log(error);
  }
  if (r) {
    return r.autoUpdate;
  } else {
    console.log('getwxaconf server error');
  }
};

/**
 * @func 获取kvconf配置 所有配置
 * @param {String} _id 小程序的key值 eg: wxa_primer
 * @return {Object} 所有配置
 */
const pullAllConfs = async function (_id) {
  let r;
  try {
    r = await ajax.GET({
      url: '/api/wx/getwxaconf',
      data: {
        wx_app: _id
      }
    });
  } catch (error) {
    console.log(error);
  }
  if (r) {
    return r;
  } else {
    console.log('getwxaconf server error');
  }
};

const update = async function () {
  if (wx.canIUse('getUpdateManager')) {
    // 版本监测
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      if (res.hasUpdate) {
        // 判断是否有新版本待更新
        updateManager.onUpdateReady(function () {
          // 新的版本已经下载好
          wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            showCancel: false, // 是否放开取消按钮（看力度）
            success: function (res) {
              if (res.confirm) {
                wx.clearStorageSync();
                updateManager.applyUpdate(); // 调用 applyUpdate 应用新版本并重启
              }
            }
          });
        });
        updateManager.onUpdateFailed(function () {
          // 新的版本下载失败
          wx.showModal({
            title: '已经有新版本了哟~',
            content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
          });
        });
      }
    });
  } else {
    // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
    // wx.showModal({
    //   title: '提示',
    //   content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
    // });
  }
};

export default {
  pullConf,
  pullAllConfs,
  update
};
