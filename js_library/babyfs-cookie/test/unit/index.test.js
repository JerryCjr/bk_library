import { expect } from 'chai';
import cookie from '../../src/index';

describe('v-cookie test', () => {
	let expires = null;

	before(() => {
		let d = new Date();
		let seconds = d.getSeconds();
		d.setSeconds(seconds + 10);
		expires = d;
	});

	it('cookie_should_be_set_correctly', () => {
		cookie.set('cookie_1', 'value1');
		expect(cookie.get('cookie_1')).to.be.equal('value1');

		cookie.set('cookie_2', 'value2', {
			expires: expires,
			path: '/',
			domain: location.hostname
		});
    expect(cookie.get('cookie_2')).to.be.equal('value2');

		cookie.set('cookie_3', 'value3', {
			expires: expires,
			path: '/',
			domain: 'babyfs.cn'
		});
		expect(cookie.get('cookie_3')).to.be.equal('');

		cookie.set('cookie_4', 'value4', {
			expires: expires,
			path: '/',
			domain: 'm.dev.babyfs.cn'
		});
		expect(cookie.get('cookie_4')).to.be.equal('');
	});

	it('cookie_should_be_removed_correctly', () => {
		cookie.remove('cookie_1');
		expect(cookie.get('cookie_1')).to.be.equal('');
		cookie.remove('cookie_2');
		expect(cookie.get('cookie_2')).to.be.equal('');
	});
});
