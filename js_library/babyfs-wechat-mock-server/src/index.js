/**
* 主模块文件
*/
import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
import userBusiness from './userBusiness';
import loginBusiness from './loginBusiness';
import messageBusiness from './messageBusiness';
import appManager from './appManager';
import store from './store';
import urlHelper from './urlHelper';

/**
 * 入口函数
 */
function main(...args) {
  let app = express();
  app.use(cookieParser());
  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  app.use('/mock/wx/ui/static', express.static(path.resolve(__dirname, '../content/static')));
  app.get(/\/mock\/wx\/ui/, function (req, res) {
    res.sendFile('index.html', {
      root: path.resolve(__dirname, '../content/')
    });
  });

  app.get('/mock/wx/user/new', async function (req, res) {
    let uid = req.query.userid;
    try {
      let user = await userBusiness.generateUser(uid);
      res.json({
        success: true,
        code: 0,
        msg: null,
        data: user
      });
    }
    catch (e) {
      res.json({
        success: false,
        code: 500,
        msg: e.message,
        data: null
      });
    }
  });

  app.get('/mock/wx/user/list', async function (req, res) {
    let userIds = await userBusiness.getUserIdList();
    if (userIds && userIds.length > 0) {
      res.json({
        success: true,
        code: 0,
        msg: null,
        data: userIds
      });
    }
    else {
      res.json({
        success: false,
        code: 500,
        msg: '不存在mock微信账户',
        data: null
      });
    }
  });

  app.get('/mock/wx/user/full/list', async function (req, res) {
    let userIds = await userBusiness.getFullUserData();
    if (userIds && userIds.length > 0) {
      res.json({
        success: true,
        code: 0,
        msg: null,
        data: userIds
      });
    }
    else {
      res.json({
        success: false,
        code: 500,
        msg: '不存在mock微信账户',
        data: null
      });
    }
  });

  app.get('/mock/wx/user/get', async function (req, res) {
    try {
      let userId = req.query.userid;
      let user = await userBusiness.getUser(userId);
      res.json({
        success: true,
        code: 0,
        msg: null,
        data: user
      });
    }
    catch (e) {
      res.json({
        success: false,
        code: 500,
        msg: e.message,
        data: null
      });
    }
  });

  app.get('/mock/wx/login', async function (req, res) {
    try {
      let uid = req.query.userid;
      let appid = req.query.appid;
      let code = await loginBusiness.login(uid, appid);
      res.json({
        success: true,
        code: 0,
        msg: null,
        data: code
      });
    }
    catch (e) {
      res.json({
        success: false,
        code: 500,
        msg: e.message,
        data: null
      });
    }
  });

  /**
   * server端调用，使用code获取session
   */
  app.get('/mock/wx/api/code2session', async function (req, res) {
    let data = await loginBusiness.code2Session(req.query.appid, req.query.secret, req.query.js_code, req.query.grant_type);
    res.json(data);
  });

  app.get('/mock/wx/getuserinfo', async function (req, res) {
    try {
      let uid = req.query.userid;
      let appid = req.query.appid;
      let data = await loginBusiness.getUserInfo(uid, appid);
      res.json({
        success: true,
        code: 0,
        msg: null,
        data
      });
    }
    catch (e) {
      res.json({
        success: false,
        code: 500,
        msg: e.message,
        data: null
      });
    }
  });

  /**
   * 模拟微信向pushUrl推送消息
   */
  app.post('/mock/wx/message/custom/post', async function (req, res) {
    try {
      let content = req.body['content'];
      let appName = req.body['wx_app'];
      let userId = req.body['userid'];
      let result = await messageBusiness.post(content, appName, userId);
      res.json({
        success: true,
        code: 0,
        msg: null,
        data: result
      });
    }
    catch (e) {
      res.json({
        success: false,
        code: 500,
        msg: e.message,
        data: null
      });
    }
  });

  /**
   * server端调用，模拟小程序回复客服消息接口
   */
  app.post('/mock/wx/message/custom/send', async function (req, res) {
    try {
      let accessToken = req.query.access_token;
      let toUserOpenId = req.body['touser'];
      let msgType = req.body['msgtype'];
      switch (msgType) {
        case 'text':
          let text = req.body['text'];
          let content = text.content;
          await userBusiness.replyText(toUserOpenId, content);
          break;
        case 'image':
          let image = req.body['image'];
          let mediaId = image.media_id;
          await userBusiness.replyImage(toUserOpenId, accessToken, mediaId);
          break;
        case 'link':
        case 'miniprogrampage':
        default:
          throw new Error(`该mock接口尚不支持发送类型为${msgType}的客服消息`);
      }
      res.json({
        errcode: 0,
        errmsg: 'ok'
      });
    }
    catch (e) {
      res.json({
        errcode: -1,
        errmsg: e.message ? e.message : '系统繁忙，此时请开发者稍候再试'
      });
    }
  });

  /**
   * server端调用，模拟小程序发送模版消息
   */
  app.post('/mock/wx/miniprogram/template/send', async function (req, res) {
    try {
      let accessToken = req.query.access_token;
      let toUserOpenId = req.body['touser'];
      let templateId = req.body['template_id'];
      let formId = req.body['form_id'];
      let miniprogramPage = req.body['page'];
      let data = req.body['data'];
      let emphasisKeyword = req.body['emphasis_keyword'];
      await messageBusiness.send(toUserOpenId, accessToken, templateId, data, miniprogramPage);
      res.json({
        errcode: 0,
        errmsg: 'ok',
        template_id: templateId
      });
    }
    catch (e) {
      res.json({
        errcode: -1,
        errmsg: e.message ? e.message : '系统繁忙，此时请开发者稍候再试'
      });
    }
  });

  /**
   * server端调用，模拟公众号发送模版消息
   */
  app.post('/mock/wx/officeaccount/template/send', async function (req, res) {
    try {
      let accessToken = req.query.access_token;
      let toUserOpenId = req.body['touser'];
      let templateId = req.body['template_id'];
      let outterUrl = req.body['url'];
      let miniprogram = req.body['miniprogram'];
      let miniprogramAppId = miniprogram.appid;
      let miniprogramPage = miniprogram.pagepath;
      let data = req.body['data'];
      await messageBusiness.send(toUserOpenId, accessToken, templateId, data, miniprogramPage, miniprogramAppId, outterUrl);
      res.json({
        errcode: 0,
        errmsg: 'ok',
        template_id: templateId
      });
    }
    catch (e) {
      res.json({
        errcode: -1,
        errmsg: e.message ? e.message : '系统繁忙，此时请开发者稍候再试'
      });
    }
  });

  app.get('/mock/wx/chatmessage/get', async function (req, res) {
    try {
      let userId = req.query.userid;
      let result = [];
      Object.values(appManager.appNameIds).forEach(appId => {
        result.push(...store.getMessageList(userId, appId));
      });
      result = result.sort((a, b) => a.timestamp - b.timestamp);
      res.json({
        success: true,
        code: 0,
        msg: null,
        data: result
      });
    }
    catch (e) {
      res.json({
        success: false,
        code: 500,
        msg: e.message,
        data: null
      });
    }
  });

  app.get('/mock/wx/ofa/apps/get', async function (req, res) {
    let ofaApps = Object.entries(appManager.appNameIds).filter(kvp => {
      return kvp[0].startsWith('wxa_') === false;
    });
    res.json({
      success: true,
      code: 0,
      msg: null,
      data: ofaApps
    });
  });

  // 模拟公众号网页授权登录接口  start
  /**
   * 微信的授权流程模拟
   */
  app.get('/mock/wx/authorize', async function (req, res) {
    try {
      let appIdFromQuery = req.query.appid;
      if (!appManager.ofaAppIds.includes(appIdFromQuery)) {
        throw new Error('授权使用的appId没有在mock系统中配置');
      }
      let appId = req.cookies['mock_app_id'];
      if (!appId) {
        throw new Error('请选择一个微信公众号的应用');
      }
      if (appId !== appIdFromQuery) {
        throw new Error('请选择正确的微信公众号的应用');
      }
      let redirectUri = req.query.redirect_uri;
      let responseType = req.query.response_type;
      let scope = req.query.scope;
      let state = req.query.state;
      let userId = req.cookies['mock_user_id'];
      if (!userId) {
        throw new Error('请选择一个mock微信账号');
      }

      let code = await loginBusiness.ofaLogin(userId, appId);
      let url = urlHelper.addParameter({
        code,
        state
      }, redirectUri);

      res.redirect(url);
    }
    catch (e) {
      res.json({
        errcode: -1,
        errmsg: e.message ? e.message : '系统繁忙，此时请开发者稍候再试'
      });
    }
  });

  /**
   * server端调用，使用code换取accessToken
   */
  app.get('/mock/wx/api/code2accesstoken', async function (req, res) {
    let data = await loginBusiness.code2AccessToken(req.query.appid, req.query.secret, req.query.code, req.query.grant_type);
    res.json(data);
  });

  /**
   * server端调用，获取用户信息
   */
  app.get('/mock/wx/api/getuserinfo', async function (req, res) {
    try {
      let accessToken = req.query.access_token;
      let openId = req.query.openid;
      let lang = req.query.lang;

      let { userId } = await userBusiness.getUserByOpenId(openId);
      let user = await userBusiness.getUser(userId);

      res.json({
        openid: openId,
        nickname: user.nickName,
        sex: user.gender,
        province: user.province,
        city: user.city,
        country: user.country,
        headimgurl: user.avatarUrl,
        privilege: [],
        unionid: user.unionId
      });
    }
    catch (e) {
      res.json({
        errcode: -1,
        errmsg: e.message ? e.message : '系统繁忙，此时请开发者稍候再试'
      });
    }
  });
  // 模拟公众号网页授权登录接口 end

  /**
   * mock授权登录的babyfs webapi
   */
  // app.post('/api/user/wxx_session', async function (req, res) {
  //   let code = req.body['wx_js_code'];
  //   let appName = req.body['wx_app'];
  //   let data = await loginBusiness.code2Session(appManager.appNameIds[appName], '', code, '');
  //   if (data.errcode === 0) {
  //     res.json({
  //       success: true,
  //       data: {
  //         session_id: 'test_session_id'
  //       }
  //     });
  //   }
  //   else {
  //     res.json({
  //       success: false,
  //       errorCode: data.errcode,
  //       errorMessage: data.errMsg
  //     });
  //   }
  // });
  /** end */

  let server = app.listen(3100, '0.0.0.0', function () {
    let host = server.address().address;
    // let host = 'fe.test.babyfs.cn';
    let port = server.address().port;

    console.log('Wechat-mocker is listening at http://%s:%s', host, port);
  });

	process.stdout.write('Starting wechat-mocker\n');
}

/**
 * 缺省执行main函数
 */
main(...process.argv.slice(2));
