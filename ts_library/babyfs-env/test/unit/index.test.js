import env from '../../src/index';

describe('index_cover_test', () => {
  it('test qiniu business, eg: s0, s1, i_s, v_s, ap_s', () => {
    expect(env.host(env.EnumBusiness.s0)).to.be.equal('https://s0.babyfs.cn');
    expect(env.host(env.EnumBusiness.s1)).to.be.equal('https://s1.babyfs.cn');
    expect(env.host(env.EnumBusiness.i_s)).to.be.equal('https://i.s.babyfs.cn');
    expect(env.host(env.EnumBusiness.v_s)).to.be.equal('https://v.s.babyfs.cn');
    expect(env.host(env.EnumBusiness.ap_s)).to.be.equal('https://ap.s.babyfs.cn');
  });
  it('test m business when the env is local', () => {
    expect(env.host(env.EnumBusiness.m)).to.be.equal('http://localhost:8001');
  });
  it('test op business when the env is local', () => {
    expect(env.host(env.EnumBusiness.op)).to.be.equal('http://localhost:8002');
  });
  it('test m_mall business when the env is local', () => {
    expect(env.host(env.EnumBusiness.m_mall)).to.be.equal('http://localhost:8003');
  });
  it('test op_mall business when the env is local', () => {
    expect(env.host(env.EnumBusiness.op_mall)).to.be.equal('http://localhost:8004');
  });
  it('test wapi business when the env is local', () => {
    expect(env.host(env.EnumBusiness.wapi)).to.be.equal('http://localhost:8007');
  });
  it('test wapi_api business when the env is local', () => {
    expect(env.host(env.EnumBusiness.wapi_api)).to.be.equal('/api');
  });
  it('test wapi_act business when the env is local', () => {
    expect(env.host(env.EnumBusiness.wapi_act)).to.be.equal('/act');
  });
  it('test op_api business when the env is local', () => {
    expect(env.host(env.EnumBusiness.op_api)).to.be.equal('/op');
  });
  it('test op_mall_api business when the env is local', () => {
    expect(env.host(env.EnumBusiness.op_mall_api)).to.be.equal('/op/retailer');
  });
  it('test m_act business when the env is local', () => {
    expect(env.host(env.EnumBusiness.m_act)).to.be.equal('/act');
  });
  it('test m_library business when the env is local', () => {
    expect(env.host(env.EnumBusiness.m_library)).to.be.equal('http://localhost:8006');
  });

  // 下面这三条需要手动修改当前浏览器的ua再进行测试
  // Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36... babyfs/2.3.0(12345,3f5ce2842380a58f)
  // it('babyfs env test', () => {
  //   expect(env.app).to.be.equal(env.EnumApp['babyfs']);
  // });

  // Android/11.0.1(Huawei,TL000) babyfs/2.3.0(0,3f5ce2842380a58f,huawei) babyfs-rainbow/2.3.0  Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36... babyfs/2.3.0(12345,3f5ce,huawei) babyfs-rainbow/2.3.0
  // it('babyfs-rainbow env test', () => {
  //   expect(env.app).to.be.equal(env.EnumApp['babyfsRainbow']);
  // });

  // Android/11.0.1(Huawei,TL000) babyfs-leo/2.3.0(0,3f5ce2842380a58f,huawei)  Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36... babyfs-leo/2.3.0(12345,3f5ce,huawei)
  // it('babyfs-leo env test', () => {
  //   expect(env.app).to.be.equal(env.EnumApp['babyfsLeo']);
  // });

  // test babyfsVersion
  // Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36... babyfs/2.3.0(12345,3f5ce2842380a58f)
  // it('babyfs env test', () => {
  //   expect(env.babyfsVersion).to.be.equal('2.3.0');
  // });

  // test android
  // [Android/10(Xiaomi,MI+MAX+3) babyfs/49.0(778573,aae90ee663dc3a31,official)]
  it('babyfs/android version test', () => {
    expect(env.babyfsVersion).to.be.equal('49.0');
  });
});
