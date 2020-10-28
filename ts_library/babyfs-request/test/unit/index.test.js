import 'babel-polyfill';
import { expect } from 'chai';
import ajax, { RequestContentType, ApiError } from '../../src/index';
import { mock } from 'mockjs';

describe('index_test', function () {
  before(function () {
    //  在本区块的所有测试用例之前执行
    mock(/getdata\/success/, 'get', {
      id: 123,
      name: 'inn',
    });
    mock(/getdata\/fail/, 'get', {
      isSuccess: false,
      errorCode: 1000,
      message: 'get  error',
    });
    mock(/postdata\/success/, 'post', {
      isSuccess: true,
    });
    mock(/postdata\/fail$/, 'post', {
      isSuccess: false,
      errorCode: 1100,
      message: 'post  error',
    });
    mock(/postdata\/fail400$/, 'post', {
      isSuccess: false,
      errorCode: 400,
    });

    mock(/postdata\/fail401$/, 'post', {
      isSuccess: false,
      errorCode: 401,
    });

    mock(/postdata\/fail403$/, 'post', {
      isSuccess: false,
      errorCode: 403,
    });

    mock(/postdata\/fail404$/, 'post', {
      isSuccess: false,
      errorCode: 404,
    });

    mock(/postdata\/fail408$/, 'post', {
      isSuccess: false,
      errorCode: 408,
    });

    mock(/postdata\/fail500$/, 'post', {
      isSuccess: false,
      errorCode: 500,
    });

    mock(/postdata\/fail502$/, 'post', {
      isSuccess: false,
      errorCode: 502,
    });

    mock(/postdata\/fail503$/, 'post', {
      isSuccess: false,
      errorCode: 503,
    });

    mock(/postdata\/fail504$/, 'post', {
      isSuccess: false,
      errorCode: 504,
    });

    mock(/postdata\/fail505$/, 'post', {
      isSuccess: false,
      errorCode: 505,
    });

  });

  after(function () {
    //  在本区块的所有测试用例之后执行
  });

  beforeEach(function () {
    //  在本区块的每个测试用例之前执行
  });

  afterEach(function () {
    //  在本区块的每个测试用例之后执行
  });

  it('get_success_should_return_correctly', (done) => {
    ajax
      .get('/getdata/success')
      .then((data) => {
        expect(data.id).to.be.equal(123);
        expect(data.name).to.be.equal('inn');
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it('get_fail_should_return_correctly', (done) => {
    ajax
      .get('/getdata/fail')
      .then((data) => {
        expect(data.isSuccess).to.be.false;
        expect(data.errorCode).to.be.equal(1000);
        expect(data.message).to.be.equal('get  error');
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it('post_success_should_return_correctly', (done) => {
    ajax
      .post('/postdata/success')
      .then((data) => {
        expect(data.isSuccess).to.be.true;
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it('post_fail_should_return_correctly', (done) => {
    ajax
      .post('/postdata/fail')
      .then((data) => {
        expect(data.isSuccess).to.be.false;
        expect(data.errorCode).to.be.equal(1100);
        expect(data.message).to.be.equal('post  error');
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it('get_fail400_should_return_correctly', (done) => {
    ajax
      .post('/postdata/fail400')
      .then((data) => {
        expect(data.isSuccess).to.be.false;
        expect(data.errorCode).to.be.equal(400);
        expect(ApiError.createBuiltInApiError(data.errorCode).message).to.be.equal('错误的请求');
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it('get_fail401_should_return_correctly', (done) => {
    ajax
      .post('/postdata/fail401')
      .then((data) => {
        expect(data.isSuccess).to.be.false;
        expect(data.errorCode).to.be.equal(401);
        expect(ApiError.createBuiltInApiError(data.errorCode).message).to.be.equal('未授权，请登录');
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it('get_fail401_should_return_correctly', (done) => {
    ajax
      .post('/postdata/fail401')
      .then((data) => {
        expect(data.isSuccess).to.be.false;
        expect(data.errorCode).to.be.equal(401);
        expect(ApiError.createBuiltInApiError(data.errorCode).message).to.be.equal('未授权，请登录');
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it('get_fail403_should_return_correctly', (done) => {
    ajax
      .post('/postdata/fail403')
      .then((data) => {
        expect(data.isSuccess).to.be.false;
        expect(data.errorCode).to.be.equal(403);
        expect(ApiError.createBuiltInApiError(data.errorCode).message).to.be.equal('服务器拒绝访问');
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it('get_fail404_should_return_correctly', (done) => {
    ajax
      .post('/postdata/fail404')
      .then((data) => {
        expect(data.isSuccess).to.be.false;
        expect(data.errorCode).to.be.equal(404);
        expect(ApiError.createBuiltInApiError(data.errorCode).message).to.be.equal('服务器未找到资源');
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it('get_fail408_should_return_correctly', (done) => {
    ajax
      .post('/postdata/fail408')
      .then((data) => {
        expect(data.isSuccess).to.be.false;
        expect(data.errorCode).to.be.equal(408);
        expect(ApiError.createBuiltInApiError(data.errorCode).message).to.be.equal('请求超时');
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it('get_fail500_should_return_correctly', (done) => {
    ajax
      .post('/postdata/fail500')
      .then((data) => {
        expect(data.isSuccess).to.be.false;
        expect(data.errorCode).to.be.equal(500);
        expect(ApiError.createBuiltInApiError(data.errorCode).message).to.be.equal('服务器内部错误');
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it('get_fail502_should_return_correctly', (done) => {
    ajax
      .post('/postdata/fail502')
      .then((data) => {
        expect(data.isSuccess).to.be.false;
        expect(data.errorCode).to.be.equal(502);
        expect(ApiError.createBuiltInApiError(data.errorCode).message).to.be.equal('网关错误');
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it('get_fail503_should_return_correctly', (done) => {
    ajax
      .post('/postdata/fail503')
      .then((data) => {
        expect(data.isSuccess).to.be.false;
        expect(data.errorCode).to.be.equal(503);
        expect(ApiError.createBuiltInApiError(data.errorCode).message).to.be.equal('服务不可用');
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it('get_fail504_should_return_correctly', (done) => {
    ajax
      .post('/postdata/fail504')
      .then((data) => {
        expect(data.isSuccess).to.be.false;
        expect(data.errorCode).to.be.equal(504);
        expect(ApiError.createBuiltInApiError(data.errorCode).message).to.be.equal('网关超时');
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it('get_fail505_should_return_correctly', (done) => {
    ajax
      .post('/postdata/fail505')
      .then((data) => {
        expect(data.isSuccess).to.be.false;
        expect(data.errorCode).to.be.equal(505);
        expect(ApiError.createBuiltInApiError(data.errorCode).message).to.be.equal('抱歉出错了');
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it('url_empty', done => {
    ajax.get().then().catch(error => {
      expect(error.message).to.be.equal('url is empty!')
      done();
    })
  })
});

describe('config_sw_test', () => {
  before(() => {
    mock(/rawresponse/, 'get', {
      code: 0,
      success: true,
    });

    ajax.switch({
      returnRawRes: true,
    });
  });

  it('shouldnt_return_raw_response', (done) => {
    ajax.get('/rawresponse').then((res) => {
      expect(res.status).to.be.equal(200);
      done();
    });
  });
});

describe('config  axios  before  send  request  and  receive  respons', function () {
  let errorHandlerCallTimes = 0;

  //  const  requestInterceptor  =  ()  =>  {};

  const responseInterceptor = () => {
    return {
      id: 10001,
      name: 'frank',
    };
  };

  const errorHandler = function (error) {
    //  error  handler  only  process  error  not  return  anything
    errorHandlerCallTimes += 1;
    throw error;
  };

  before(() => {
    //  ajax.configAjax(requestInterceptor,  responseInterceptor,  errorHandler);
    ajax.registerResponseInterceptor(responseInterceptor, errorHandler);
    ajax.switch({
      returnRawRes: false,
    });
  });
  before(() => {
    mock(/getdata\/success/, 'get', {
      id: 123,
      name: 'inn',
    });
    mock(/getdata\/fail/, 'get', {
      code: -1,
      message: 'get  error',
    });
    mock(/postdata\/success/, 'post', {
      isSuccess: true,
    });
    mock(/postdata\/fail/, 'post', {
      isSuccess: false,
      errorCode: 1100,
      message: 'post  error',
    });
    mock(/postdata\/user\/info/, 'post', null);
  });
  beforeEach(() => {
    errorHandlerCallTimes = 0;
  });
  it('get_success_should_return_correctly_with_config', (done) => {
    ajax
      .get('/getdata/success')
      .then((data) => {
        expect(data.id).to.be.equal(10001);
        expect(data.name).to.be.equal('frank');
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it('get_fail_should_return_correctly_with_404', (done) => {
    ajax.get('/user/fail').catch(() => {
      expect(errorHandlerCallTimes).to.be.equal(1);
      done();
    });
  });

  it('post_success_should_return_correctly_with_config', (done) => {
    ajax.post('/postdata/success').then((data) => {
      expect(data.id).to.be.equal(10001);
      expect(data.name).to.be.equal('frank');
      done();
    });
  });

  it('post_fail_should_return_correctly_with_404', (done) => {
    ajax.post('/user/add').catch(() => {
      expect(errorHandlerCallTimes).to.be.equal(1);
      done();
    });
  });

  it('post_success_should_return correctly_with_data_to_null', (done) => {
    ajax.post('/postdata/user/info').catch(() => {
      expect(errorHandlerCallTimes).to.be.equal(1);
      done();
    });
  });
});

describe('send request with filtering empty params', function () {
  let params = null;

  before(() => {
    mock(/getdata\/success/, 'get', {
      id: 123,
      name: 'inn',
    });
    mock(/postdata\/success/, 'post', {
      isSuccess: true,
    });
  });

  before(() => {
    ajax.registerRequestInterceptor((request) => {
      if (request.method === 'get') {
        params = request.params;
      } else {
        if (request.data) {
          params = request.data;
        }
      }
      return request;
    });
  });

  beforeEach(() => {
    params = null;
  });

  it('"get" request with filterEmptyParams=true', (done) => {
    ajax
      .get('/getdata/success', {
        userName: '',
        age: null,
      })
      .then(() => {
        expect(params.userName).to.be.equal(undefined);
        done();
      });
  });

  it('"post" request with filterEmptyParams=true', (done) => {
    ajax
      .post('/postdata/success', {
        userName: 'yes',
        age: undefined,
      })
      .then(() => {
        expect(params).to.be.equal('userName=yes');
        done();
      });
  });
});

describe('send request with different content type', function () {
  let params = null;
  const ajaxInstance = ajax.createInstance();

  before(() => {
    mock(/postdata\/success/, 'post', {
      isSuccess: true,
    });
  });

  before(() => {
    ajaxInstance.registerRequestInterceptor((request) => {
      if (request.method === 'get') {
        params = request.params;
      } else {
        if (request.data) {
          params = request.data;
        }
      }
      return request;
    });
  });

  beforeEach(() => {
    params = null;
  });

  it('"post" request without content type', (done) => {
    ajaxInstance
      .post('/postdata/success', {
        userName: 'George',
        age: undefined,
      })
      .then(() => {
        expect(params).to.be.equal('userName=George');
        done();
      });
  });
  it('"post" request with content type of json', (done) => {
    ajaxInstance
      .post(
        '/postdata/success',
        {
          userName: 'George',
          age: undefined,
        },
        {
          contentType: RequestContentType.JSON,
        },
      )
      .then(() => {
        expect(params.userName).to.be.equal('George');
        done();
      });
  });
  it('"post" request without content type', (done) => {
    ajaxInstance
      .post('/postdata/success', {
        userName: 'George',
        age: undefined,
      })
      .then(() => {
        expect(params).to.be.equal('userName=George');
        done();
      });
  });
});

describe('partial interceptor', () => {
  before(() => {
    mock(/getdata\/success/, 'get', {
      id: 123,
      name: 'inn',
    });
  });
  before(() => {
    ajax.registerResponseInterceptor(() => {
      return {
        userId: 10001,
        userName: 'Jarod',
      };
    }, null);
    ajax.registerPartialResponseInterceptor('user-management', () => {
      return {
        userId: 10002,
        userName: 'Jason',
      };
    });
  });

  it('get data normally', (done) => {
    ajax.get('/getdata/success').then((data) => {
      expect(data.userId).to.be.equal(10001);
      expect(data.userName).to.be.equal('Jarod');
      done();
    });
  });

  it('get data within a specific context', (done) => {
    ajax
      .getContext('user-management')
      .get('/getdata/success')
      .then((data) => {
        expect(data.userId).to.be.equal(10002);
        expect(data.userName).to.be.equal('Jason');
        done();
      });
  });
});

describe('white_list_test', () => {
  before(() => {
    mock(/user/, 'post', {
      code: 1,
      success: true,
    });

    mock(/login/, 'post', {
      code: 0,
      success: false,
    });

    mock(/user\/login/, 'post', {
      code: 1,
      success: true,
    });
  });

  it('user_params_should_be_recorded', (done) => {
    ajax
      .post('/user', {
        account: 'Babyfs',
      })
      .then(() => {
        done();
      });
  });

  it('login_params_should_not_be_recorded', (done) => {
    ajax
      .post('/login', {
        username: 'Luo Yonghao',
        password: 'chuizi',
      })
      .then(() => {
        done();
      });
  });

  it('user_login_params_should_not_be_recorded', (done) => {
    ajax.post('/user/login').then(() => {
      done();
    });
  });
});
