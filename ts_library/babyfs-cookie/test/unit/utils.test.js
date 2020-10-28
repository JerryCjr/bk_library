import { convert } from '../../src/utils';

describe('util_cover_test', () => {
  it("convert should return '' if the arguments[0] is undefined", () => {
    const options = undefined;
    expect(convert(options)).to.be.equal('');
  });
  it("convert should return ';path=/' if the arguments[0] is null", () => {
    const options = null;
    expect(convert(options)).to.be.equal('');
  });
  it("convert should return ';path=/' if the arguments[0] is {}", () => {
    const options = {};
    expect(convert(options)).to.be.equal(';path=/');
  });
  it('convert should return expected value', () => {
    const expires = new Date(-1);
    const path = '/';
    const domain = '.babyfs.cn';
    const secure = false;

    const options = {
      expires,
      path,
      domain,
      secure,
    };
    expect(convert(options)).to.be.equal(`;expires=${expires.toUTCString()};path=${path};domain=${domain}`);
  });
});
