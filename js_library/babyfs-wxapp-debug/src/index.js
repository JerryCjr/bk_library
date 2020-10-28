import env from 'babyfs-wxapp-env';
import mockWechat from 'babyfs-wxapp-mock';

let triggerShake = false;

function init() {
  // 摇一摇模拟
  wx.onAccelerometerChange(function (res) {
    if (res.x > 0.7 && res.y > 0.7) {
      if (triggerShake) {
        return;
      }
      triggerShake = true;
      wx.getClipboardData({
        success(copyData) {
          if (copyData.data === 'd921030b') {
            wx.showActionSheet({
              itemList: ['切换环境', '切换账户'],
              success(res) {
                if (res.tapIndex === 0) {
                  env.switchEnv(() => {
                    triggerShake = false;
                  });
                } else {
                  mockWechat.switchUser(() => {
                    triggerShake = false;
                  });
                }
              },
              fail(res) {
                triggerShake = false;
                // wx.showModal({
                //   title: '提示',
                //   content: res.errMsg,
                //   showCancel: false
                // });
              }
            });
          } else {
            triggerShake = false;
          }
        },
        fail(res) {
          triggerShake = false;
        }
      });
    }
  });
}

export default {
  init
};
