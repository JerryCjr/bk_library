import { expect } from 'chai';
import { upload } from '../../src/index';
import ajax from 'babyfs-request';
import { mock } from 'mockjs';

describe('index_test', function () {
	before(function () {
    // 在本区块的所有测试用例之前执行
    mock(/api\/user\/log\/upload/, 'post', {
      code: 1,
      success: true
    });
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

	it('upload_post_should_be_return_correctly', done => {
    ajax
      .post('/api/user/log/upload')
      .then(res => {
        expect(res.code).to.be.equal(1);
        expect(res.success).to.be.equal(true);
        done();
      })
      .catch(error => {
        done(error);
      });
  });
});
