import wx from '@babyfs/babyfs-wechat-jssdk';

interface shareOptions {
  title: string;
  desc: string;
  link: string;
  imgUrl: string;
}

wx.share = (options: shareOptions): void => {
  const { title, desc, link } = {
    ...options,
  };

  if (title === '') {
    throw new Error('分享标题不能为空');
  }

  if (link === '') {
    throw new Error('分享链接不能为空');
  }

  let { imgUrl } = { ...options };

  if (imgUrl === '') {
    imgUrl = 'https://i.s.babyfs.cn/op/1/47ff244ff71b478f9586f0b095fb0f94.jpg';
  }

  wx.updateAppMessageShareData({
    title,
    desc,
    link,
    imgUrl,
  });

  wx.updateTimelineShareData({
    title,
    link,
    imgUrl,
  });
};

export default {
  wx,
  apiList: [
    'closeWindow',

    'hideMenuItems',
    'showMenuItems',

    'updateAppMessageShareData',
    'updateTimelineShareData',

    'getNetworkType',

    'startRecord',
    'stopRecord',

    'uploadVoice',
    'stopVoice',
  ],
  openTagList: ['wx-open-launch-weapp', 'wx-open-launch-app'],
};
