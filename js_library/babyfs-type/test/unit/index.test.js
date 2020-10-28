import { expect } from 'chai';
import $ from '../../src/index';

describe('babyfs type test', function () {
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

	it('checktype_should_return_correctly', () => {
		let typ = $.getType(function () {});
		expect(typ).to.be.equal($.EnumType.bFunction);

		expect($.getType(undefined)).to.be.equal($.EnumType.bUndefined);
		expect($.getType(null)).to.be.equal($.EnumType.bNull);
		expect($.getType(34)).to.be.equal($.EnumType.bNumber);
		expect($.getType(true)).to.be.equal($.EnumType.bBoolean);
		expect($.getType(/\d/g)).to.be.equal($.EnumType.bRegExp);
		expect($.getType([1, 'w', false])).to.be.equal($.EnumType.bArray);
		expect($.getType(new Date())).to.be.equal($.EnumType.bDate);
		expect($.getType(new Error('test error'))).to.be.equal($.EnumType.bError);
		expect($.getType(document.createElement('div'))).to.be.equal($.EnumType.bElement);
		expect($.getType({
			length: 3,
			'1': 'a',
			2: true
		})).to.be.equal($.EnumType.bArraylist);
		expect($.getType({})).to.be.equal($.EnumType.bObject);
	});

	it('isObjectNull_should_return_correctly', () => {
		expect($.isObjectNullOrUndefined(undefined)).to.be.true;
		expect($.isObjectNullOrUndefined(null)).to.be.true;
		expect($.isObjectNullOrUndefined({})).to.be.false;
	});

	it('isNullOrUndefined_should_return_correctly', () => {
		expect($.isNullOrUndefined(null)).to.be.true;
		expect($.isNullOrUndefined(undefined)).to.be.true;
		expect($.isNullOrUndefined('')).to.be.false;
	});

	it('checkFloat_should_return_correctly', () => {
		let result = $.getFloatInfo(1.05483);
		expect(result.isFloat).to.be.true;
		expect(result.isNumber).to.be.true;
    expect(result.pointRightCount).to.be.equal(5);

		result = $.getFloatInfo(NaN);
		expect(result.isFloat).to.be.false;
		expect(result.isNumber).to.be.false;
		expect(result.pointRightCount).to.be.equal(0);

		result = $.getFloatInfo(5);
		expect(result.isFloat).to.be.false;
		expect(result.isNumber).to.be.true;
		expect(result.pointRightCount).to.be.equal(0);
	});

	it('isStringEmpty_should_return_correctly', () => {
		expect($.isStringEmpty(null)).to.be.true;
		expect($.isStringEmpty(undefined)).to.be.true;
		expect($.isStringEmpty('')).to.be.true;
		expect($.isStringEmpty('null')).to.be.false;

		try {
      $.isStringEmpty({});
		}
		catch (e) {
			expect(e).to.be.an('error');
			expect(e.message).to.be.equal('Parameter is not a string!');
		}
	});

	it('isObject_should_return_correctly', () => {
		expect($.isObject({})).to.be.true;
		expect($.isObject(undefined)).to.be.false;
		expect($.isObject(null)).to.be.true;
		expect($.isObject(true)).to.be.false;
		expect($.isObject('undefined')).to.be.false;
	});
});
