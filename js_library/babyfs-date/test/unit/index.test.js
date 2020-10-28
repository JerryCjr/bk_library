import { expect } from 'chai';
import dateHelper from '../../src/index';

describe('date_test', function () {
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

	it('should_be_format_correctly', () => {
    let d = new Date(2018, 8, 30, 2, 20, 32, 123);
    expect(dateHelper.format(d)).to.be.equal('2018-09-30');
    expect(dateHelper.format(d, 'yyyy-MM-dd hh:mm:ss')).to.be.equal('2018-09-30 02:20:32');
    expect(dateHelper.format(d, 'yyyyy-MMM-ddd hhh:mmm:sss')).to.be.equal('02018-009-030 002:020:032');
    expect(dateHelper.format(d, 'yy-M-d h:m:s')).to.be.equal('2018-9-30 2:20:32');
  });

  it('should_be_parse_correctly', () => {
    let d = new Date(2018, 8, 30, 2, 20, 32);
    expect(dateHelper.parse('2018-09-30 02:20:32', 'yyyy-MM-dd hh:mm:ss').getTime()).to.be.equal(d.getTime());
    expect(dateHelper.parse('02018-009-030 002:020:032', 'yyyyy-MMM-ddd hhh:mmm:sss').getTime()).to.be.equal(d.getTime());
    expect(dateHelper.parse('2018-9-30 2:20:32', 'yy-M-d h:m:s').getTime()).to.be.equal(d.getTime());
  });
});
