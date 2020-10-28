import { EnumEnv, EnumBusiness, checkEnv, resolveHost } from '../../src/host';

describe('checkEnv_cover_test', () => {
  it('checkEnv() should return expected value if the location.hostname === "10.10.120.110"', () => {
    const hostName = '10.10.120.110';
    expect(checkEnv(hostName)).to.be.equal(EnumEnv.local);
  });
  it('checkEnv() should return expected value if the location.hostname === "localhost"', () => {
    const hostName = 'localhost';
    expect(checkEnv(hostName)).to.be.equal(EnumEnv.local);
  });
  it('checkEnv() should return expected value if the location.hostname === "today.tomorrow.babyfs.cn"', () => {
    const hostName = 'm.today.tomorrow.babyfs.cn';
    expect(checkEnv(hostName)).to.be.equal(EnumEnv.online);
  });

  it('checkEnv() should return expected value if the location.hostname === "m.babyfs.cn"', () => {
    const hostName = 'm.babyfs.cn';
    expect(checkEnv(hostName)).to.be.equal(EnumEnv.online);
  });
  it('checkEnv() should return expected value if the location.hostname === "m.lpt.babyfs.cn"', () => {
    const hostName = 'm.lpt.babyfs.cn';
    expect(checkEnv(hostName)).to.be.equal(EnumEnv.lpt);
  });
  it('checkEnv() should return expected value if the location.hostname === "m.dev.babyfs.cn"', () => {
    const hostName = 'm.dev.babyfs.cn';
    expect(checkEnv(hostName)).to.be.equal(EnumEnv.dev);
  });
  it('checkEnv() should return expected value if the location.hostname === "m.test.babyfs.cn"', () => {
    const hostName = 'm.test.babyfs.cn';
    expect(checkEnv(hostName)).to.be.equal(EnumEnv.test);
  });
  it('checkEnv() should return expected value if the location.hostname === "m.exchange.babyfs.cn"', () => {
    const hostName = 'm.exchange.babyfs.cn';
    expect(checkEnv(hostName)).to.be.equal(EnumEnv.test);
  });
  it('checkEnv() should return expected value if the location.hostname === "m.bvt.babyfs.cn"', () => {
    const hostName = 'm.bvt.babyfs.cn';
    expect(checkEnv(hostName)).to.be.equal(EnumEnv.bvt);
  });
});

describe('resolveHost_cover_test', () => {
  it('test qiniu business, eg: s0, s1, i_s, v_s, ap_s', () => {
    expect(resolveHost(EnumBusiness.s0)).to.be.equal('https://s0.babyfs.cn');
    expect(resolveHost(EnumBusiness.s1)).to.be.equal('https://s1.babyfs.cn');
    expect(resolveHost(EnumBusiness.i_s)).to.be.equal('https://i.s.babyfs.cn');
    expect(resolveHost(EnumBusiness.v_s)).to.be.equal('https://v.s.babyfs.cn');
    expect(resolveHost(EnumBusiness.ap_s)).to.be.equal('https://ap.s.babyfs.cn');
  });

  // m
  it('test m business when the env is online', () => {
    expect(resolveHost(EnumBusiness.m, checkEnv('m.babyfs.cn'))).to.be.equal('https://m.babyfs.cn');
  });
  it('test m business when the env is lpt', () => {
    expect(resolveHost(EnumBusiness.m, checkEnv('m.lpt.babyfs.cn'))).to.be.equal('http://m.lpt.babyfs.cn');
  });
  it('test m business when the env is dev', () => {
    expect(resolveHost(EnumBusiness.m, checkEnv('m.dev.babyfs.cn'))).to.be.equal('http://m.dev.babyfs.cn');
  });
  it('test m business when the env is test', () => {
    expect(resolveHost(EnumBusiness.m, checkEnv('emily.test.babyfs.cn'))).to.be.equal('http://emily.test.babyfs.cn/m');
  });
  it('test m business when the env is local', () => {
    expect(resolveHost(EnumBusiness.m, checkEnv('localhost'))).to.be.equal('http://localhost:8001');
  });

  // op
  it('test op business when the env is online', () => {
    expect(resolveHost(EnumBusiness.op, checkEnv('op.babyfs.cn'))).to.be.equal('https://op.babyfs.cn');
  });
  it('test op business when the env is lpt', () => {
    expect(resolveHost(EnumBusiness.op, checkEnv('op.lpt.babyfs.cn'))).to.be.equal('http://op.lpt.babyfs.cn');
  });
  it('test op business when the env is dev', () => {
    expect(resolveHost(EnumBusiness.op, checkEnv('op.dev.babyfs.cn'))).to.be.equal('http://op.dev.babyfs.cn');
  });
  it('test op business when the env is test', () => {
    expect(resolveHost(EnumBusiness.op, checkEnv('emily.test.babyfs.cn'))).to.be.equal('http://emily.test.babyfs.cn');
  });
  it('test op business when the env is local', () => {
    expect(resolveHost(EnumBusiness.op, checkEnv('localhost'))).to.be.equal('http://localhost:8002');
  });

  // m_mall
  it('test m_mall business when the env is online', () => {
    expect(resolveHost(EnumBusiness.m_mall, checkEnv('mall.babyfs.cn'))).to.be.equal('https://mall.babyfs.cn');
  });
  it('test m_mall business when the env is lpt', () => {
    expect(resolveHost(EnumBusiness.m_mall, checkEnv('mall.lpt.babyfs.cn'))).to.be.equal('http://mall.lpt.babyfs.cn');
  });
  it('test m_mall business when the env is dev', () => {
    expect(resolveHost(EnumBusiness.m_mall, checkEnv('mall.dev.babyfs.cn'))).to.be.equal('http://mall.dev.babyfs.cn');
  });
  it('test m_mall business when the env is test', () => {
    expect(resolveHost(EnumBusiness.m_mall, checkEnv('exchange.babyfs.cn'))).to.be.equal(
      'http://exchange.babyfs.cn/m_mall',
    );
  });
  it('test m_mall business when the env is local', () => {
    expect(resolveHost(EnumBusiness.m_mall, checkEnv('localhost'))).to.be.equal('http://localhost:8003');
  });

  // op_mall
  it('test op_mall business when the env is online', () => {
    expect(resolveHost(EnumBusiness.op_mall, checkEnv('opmall.babyfs.cn'))).to.be.equal('https://opmall.babyfs.cn');
  });
  it('test op_mall business when the env is lpt', () => {
    expect(resolveHost(EnumBusiness.op_mall, checkEnv('opmall.lpt.babyfs.cn'))).to.be.equal(
      'http://opmall.lpt.babyfs.cn',
    );
  });
  it('test op_mall business when the env is dev', () => {
    expect(resolveHost(EnumBusiness.op_mall, checkEnv('opmall.test.babyfs.cn'))).to.be.equal(
      'http://opmall.test.babyfs.cn',
    );
  });
  it('test op_mall business when the env is test', () => {
    expect(resolveHost(EnumBusiness.op_mall, checkEnv('opmall.dev.babyfs.cn'))).to.be.equal(
      'http://opmall.dev.babyfs.cn',
    );
  });
  it('test op_mall business when the env is local', () => {
    expect(resolveHost(EnumBusiness.op_mall, checkEnv('localhost'))).to.be.equal('http://localhost:8004');
  });

  // * api
  // wapi
  it('test wapi business when the env is online', () => {
    expect(resolveHost(EnumBusiness.wapi, checkEnv('wapi.babyfs.cn'))).to.be.equal('https://wapi.babyfs.cn');
  });
  it('test wapi business when the env is lpt', () => {
    expect(resolveHost(EnumBusiness.wapi, checkEnv('wapi.lpt.babyfs.cn'))).to.be.equal('http://wapi.lpt.babyfs.cn');
  });
  it('test wapi business when the env is dev', () => {
    expect(resolveHost(EnumBusiness.wapi, checkEnv('wapi.test.babyfs.cn'))).to.be.equal('http://wapi.test.babyfs.cn');
  });
  it('test wapi business when the env is test', () => {
    expect(resolveHost(EnumBusiness.wapi, checkEnv('wapi.dev.babyfs.cn'))).to.be.equal('http://wapi.dev.babyfs.cn');
  });
  it('test wapi business when the env is local', () => {
    expect(resolveHost(EnumBusiness.wapi, checkEnv('localhost'))).to.be.equal('http://localhost:8007');
  });

  // wapi_api
  it('test wapi_api business when the env is online', () => {
    expect(resolveHost(EnumBusiness.wapi_api, checkEnv('wapi.babyfs.cn'))).to.be.equal('https://wapi.babyfs.cn/api');
  });
  it('test wapi_api business when the env is lpt', () => {
    expect(resolveHost(EnumBusiness.wapi_api, checkEnv('wapi.lpt.babyfs.cn'))).to.be.equal(
      'http://wapi.lpt.babyfs.cn/api',
    );
  });
  it('test wapi_api business when the env is dev', () => {
    expect(resolveHost(EnumBusiness.wapi_api, checkEnv('wapi.test.babyfs.cn'))).to.be.equal(
      'http://wapi.test.babyfs.cn/api',
    );
  });
  it('test wapi_api business when the env is test', () => {
    expect(resolveHost(EnumBusiness.wapi_api, checkEnv('wapi.dev.babyfs.cn'))).to.be.equal(
      'http://wapi.dev.babyfs.cn/api',
    );
  });
  it('test wapi_api business when the env is local', () => {
    expect(resolveHost(EnumBusiness.wapi_api, checkEnv('localhost'))).to.be.equal('/api');
  });

  // wapi_act
  it('test wapi_act business when the env is online', () => {
    expect(resolveHost(EnumBusiness.wapi_act, checkEnv('wapi.babyfs.cn'))).to.be.equal('https://wapi.babyfs.cn/act');
  });
  it('test wapi_act business when the env is lpt', () => {
    expect(resolveHost(EnumBusiness.wapi_act, checkEnv('wapi.lpt.babyfs.cn'))).to.be.equal(
      'http://wapi.lpt.babyfs.cn/act',
    );
  });
  it('test wapi_act business when the env is dev', () => {
    expect(resolveHost(EnumBusiness.wapi_act, checkEnv('wapi.test.babyfs.cn'))).to.be.equal(
      'http://wapi.test.babyfs.cn/act',
    );
  });
  it('test wapi_act business when the env is test', () => {
    expect(resolveHost(EnumBusiness.wapi_act, checkEnv('wapi.dev.babyfs.cn'))).to.be.equal(
      'http://wapi.dev.babyfs.cn/act',
    );
  });
  it('test wapi_act business when the env is local', () => {
    expect(resolveHost(EnumBusiness.wapi_act, checkEnv('localhost'))).to.be.equal('/act');
  });

  // op_api
  it('test op_api business when the env is online', () => {
    expect(resolveHost(EnumBusiness.op_api, checkEnv('op.babyfs.cn'))).to.be.equal('https://op.babyfs.cn/op');
  });
  it('test op_api business when the env is lpt', () => {
    expect(resolveHost(EnumBusiness.op_api, checkEnv('op.lpt.babyfs.cn'))).to.be.equal('http://op.lpt.babyfs.cn/op');
  });
  it('test op_api business when the env is dev', () => {
    expect(resolveHost(EnumBusiness.op_api, checkEnv('op.test.babyfs.cn'))).to.be.equal('http://op.test.babyfs.cn/op');
  });
  it('test op_api business when the env is test', () => {
    expect(resolveHost(EnumBusiness.op_api, checkEnv('op.dev.babyfs.cn'))).to.be.equal('http://op.dev.babyfs.cn/op');
  });
  it('test op_api business when the env is local', () => {
    expect(resolveHost(EnumBusiness.op_api, checkEnv('localhost'))).to.be.equal('/op');
  });

  // op_mall_api
  it('test op_mall_api business when the env is online', () => {
    expect(resolveHost(EnumBusiness.op_mall_api, checkEnv('opmall.babyfs.cn'))).to.be.equal(
      'https://op.babyfs.cn/op/retailer',
    );
  });
  it('test op_mall_api business when the env is lpt', () => {
    expect(resolveHost(EnumBusiness.op_mall_api, checkEnv('opmall.lpt.babyfs.cn'))).to.be.equal(
      'http://op.lpt.babyfs.cn/op/retailer',
    );
  });
  it('test op_mall_api business when the env is dev', () => {
    expect(resolveHost(EnumBusiness.op_mall_api, checkEnv('opmall.test.babyfs.cn'))).to.be.equal(
      'http://op.test.babyfs.cn/op/retailer',
    );
  });
  it('test op_mall_api business when the env is test', () => {
    expect(resolveHost(EnumBusiness.op_mall_api, checkEnv('opmall.dev.babyfs.cn'))).to.be.equal(
      'http://op.dev.babyfs.cn/op/retailer',
    );
  });
  it('test op_mall_api business when the env is local', () => {
    expect(resolveHost(EnumBusiness.op_mall_api, checkEnv('localhost'))).to.be.equal('/op/retailer');
  });

  // m_act
  it('test m_act business when the env is online', () => {
    expect(resolveHost(EnumBusiness.m_act, checkEnv('m.babyfs.cn'))).to.be.equal('https://m.babyfs.cn/act');
  });
  it('test m_act business when the env is lpt', () => {
    expect(resolveHost(EnumBusiness.m_act, checkEnv('m.lpt.babyfs.cn'))).to.be.equal('http://m.lpt.babyfs.cn/act');
  });
  it('test m_act business when the env is dev', () => {
    expect(resolveHost(EnumBusiness.m_act, checkEnv('m.test.babyfs.cn'))).to.be.equal('http://m.test.babyfs.cn/act');
  });
  it('test m_act business when the env is test', () => {
    expect(resolveHost(EnumBusiness.m_act, checkEnv('m.dev.babyfs.cn'))).to.be.equal('http://m.dev.babyfs.cn/act');
  });
  it('test m_act business when the env is local', () => {
    expect(resolveHost(EnumBusiness.m_act, checkEnv('localhost'))).to.be.equal('/act');
  });

  // m_library
  it('test m_library business when the env is online', () => {
    expect(resolveHost(EnumBusiness.m_library, checkEnv('library.babyfs.cn'))).to.be.equal('https://library.babyfs.cn');
  });
  it('test m_library business when the env is lpt', () => {
    expect(resolveHost(EnumBusiness.m_library, checkEnv('library.lpt.babyfs.cn'))).to.be.equal(
      'http://library.lpt.babyfs.cn',
    );
  });
  it('test m_library business when the env is dev', () => {
    expect(resolveHost(EnumBusiness.m_library, checkEnv('library.test.babyfs.cn'))).to.be.equal(
      'http://library.test.babyfs.cn',
    );
  });
  it('test m_library business when the env is test', () => {
    expect(resolveHost(EnumBusiness.m_library, checkEnv('library.dev.babyfs.cn'))).to.be.equal(
      'http://library.dev.babyfs.cn',
    );
  });
  it('test m_library business when the env is local', () => {
    expect(resolveHost(EnumBusiness.m_library, checkEnv('localhost'))).to.be.equal('http://localhost:8006');
  });
});
