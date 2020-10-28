import { expect } from 'chai';
import env from '../../src/index';

describe('index_test', function () {
	before(function () {
		// 在本区块的所有测试用例之前执行
	});

	after(function () {
		// 在本区块的所有测试用例之后执行
	});

	beforeEach(function () {
		// 在本区块的每个测试用例之前执行
	});

	afterEach(function () {
		// 在本区块的每个测试用例之后执行
	});

	it('test_agent', () => {
		expect(env.agent).to.be.equal(env.EnumAgent.other);
  });

	it('test_app', () => {
    expect(env.app).to.be.equal(env.EnumApp.safaribrowser);
  });

  it('test_babyfs', () => {
    // 需要手动改ua debug
    expect(env.app).to.be.equal(env.EnumApp.babyfs);
    expect(env.babyfsVersion).to.be.equal('15.2');
  });

  it('test_host', () => {
    //localhost
    expect(env.host(env.EnumBusiness.m)).to.be.equal('http://localhost:8001');
    expect(env.host(env.EnumBusiness.op)).to.be.equal('http://localhost:8002');
    expect(env.host(env.EnumBusiness.m_mall)).to.be.equal('http://localhost:8003');
    expect(env.host(env.EnumBusiness.op_mall)).to.be.equal('http://localhost:8004');
    expect(env.host(env.EnumBusiness.wapi)).to.be.equal('http://localhost:8007');
    expect(env.host(env.EnumBusiness.wapi_api)).to.be.equal('/api');
    expect(env.host(env.EnumBusiness.op_api)).to.be.equal('/op');
    expect(env.host(env.EnumBusiness.op_mall_api)).to.be.equal('/op/retailer');
    expect(env.host(env.EnumBusiness.m_library)).to.be.equal('http://localhost:8006');
    //dev
    // expect(env.host(env.EnumBusiness.m)).to.be.equal('http://m.dev.babyfs.cn');
    // expect(env.host(env.EnumBusiness.op)).to.be.equal('http://op.dev.babyfs.cn');
    // expect(env.host(env.EnumBusiness.m_mall)).to.be.equal('http://mall.dev.babyfs.cn');
    // expect(env.host(env.EnumBusiness.op_mall)).to.be.equal('http://opmall.dev.babyfs.cn');
    // expect(env.host(env.EnumBusiness.wapi)).to.be.equal('http://wapi.dev.babyfs.cn');
    // expect(env.host(env.EnumBusiness.wapi_api)).to.be.equal('http://wapi.dev.babyfs.cn/api');
    // expect(env.host(env.EnumBusiness.op_api)).to.be.equal('http://op.dev.babyfs.cn/op');
    // expect(env.host(env.EnumBusiness.op_mall_api)).to.be.equal('http://opmall.dev.babyfs.cn/op/retailer');
    // expect(env.host(env.EnumBusiness.m_library)).to.be.equal('http://library.dev.babyfs.cn');
    //test
    // expect(env.host(env.EnumBusiness.m)).to.be.equal('http://emily.test.babyfs.cn/m');
    // expect(env.host(env.EnumBusiness.op)).to.be.equal('http://emily.test.babyfs.cn');
    // expect(env.host(env.EnumBusiness.m_mall)).to.be.equal('http://mall.dev.babyfs-inc.cn/m_mall');
    // expect(env.host(env.EnumBusiness.op_mall)).to.be.equal('http://opmall.dev.babyfs-inc.cn');
    // expect(env.host(env.EnumBusiness.wapi)).to.be.equal('http://wapi.test.babyfs.cn');
    // expect(env.host(env.EnumBusiness.wapi_api)).to.be.equal('http://wapi.test.babyfs.cn/api');
    // expect(env.host(env.EnumBusiness.op_api)).to.be.equal('/op');
    // expect(env.host(env.EnumBusiness.op_mall_api)).to.be.equal('/op/retailer');
    // expect(env.host(env.EnumBusiness.m_library)).to.be.equal('http://library.test.babyfs.cn');
    //bvt
    // expect(env.host(env.EnumBusiness.m)).to.be.equal('http://m.bvt.babyfs.cn');
    // expect(env.host(env.EnumBusiness.op)).to.be.equal('http://op.bvt.babyfs.cn');
    // expect(env.host(env.EnumBusiness.m_mall)).to.be.equal('http://mall.bvt.babyfs.cn');
    // expect(env.host(env.EnumBusiness.op_mall)).to.be.equal('http://opmall.bvt.babyfs.cn');
    // expect(env.host(env.EnumBusiness.wapi)).to.be.equal('http://wapi.bvt.babyfs.cn');
    // expect(env.host(env.EnumBusiness.wapi_api)).to.be.equal('http://wapi.bvt.babyfs.cn/api');
    // expect(env.host(env.EnumBusiness.op_api)).to.be.equal('http://op.bvt.babyfs.cn/op');
    // expect(env.host(env.EnumBusiness.op_mall_api)).to.be.equal('http://opmall.bvt.babyfs.cn/op/retailer');
    // expect(env.host(env.EnumBusiness.m_library)).to.be.equal('http://library.bvt.babyfs.cn');
    //lpt
    // expect(env.host(env.EnumBusiness.m)).to.be.equal('http://m.lpt.babyfs.cn');
    // expect(env.host(env.EnumBusiness.op)).to.be.equal('http://op.lpt.babyfs.cn');
    // expect(env.host(env.EnumBusiness.m_mall)).to.be.equal('http://mall.lpt.babyfs.cn');
    // expect(env.host(env.EnumBusiness.op_mall)).to.be.equal('http://opmall.lpt.babyfs.cn');
    // expect(env.host(env.EnumBusiness.wapi)).to.be.equal('http://wapi.lpt.babyfs.cn');
    // expect(env.host(env.EnumBusiness.wapi_api)).to.be.equal('http://wapi.lpt.babyfs.cn/api');
    // expect(env.host(env.EnumBusiness.op_api)).to.be.equal('http://op.lpt.babyfs.cn/op');
    // expect(env.host(env.EnumBusiness.op_mall_api)).to.be.equal('http://opmall.lpt.babyfs.cn/op/retailer');
    // expect(env.host(env.EnumBusiness.m_library)).to.be.equal('http://library.lpt.babyfs.cn');
    //online
    // expect(env.host(env.EnumBusiness.m)).to.be.equal('https://m.babyfs.cn');
    // expect(env.host(env.EnumBusiness.op)).to.be.equal('https://op.babyfs.cn');
    // expect(env.host(env.EnumBusiness.m_mall)).to.be.equal('https://mall.babyfs.cn');
    // expect(env.host(env.EnumBusiness.op_mall)).to.be.equal('https://opmall.babyfs.cn');
    // expect(env.host(env.EnumBusiness.wapi)).to.be.equal('https://wapi.babyfs.cn');
    // expect(env.host(env.EnumBusiness.wapi_api)).to.be.equal('https://wapi.babyfs.cn/api');
    // expect(env.host(env.EnumBusiness.op_api)).to.be.equal('https://op.babyfs.cn/op');
    // expect(env.host(env.EnumBusiness.op_mall_api)).to.be.equal('https://opmall.babyfs.cn/op/retailer');
    // expect(env.host(env.EnumBusiness.m_library)).to.be.equal('https://library.babyfs.cn');
  });
});
