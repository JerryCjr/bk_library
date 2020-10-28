import { isEnabled, get, set, remove } from '../../src/index';

describe('isEnabled()', () => {
  it('should return true if the cookie is enabled', () => {
    expect(isEnabled()).to.be.equal(true);
  });
});

describe('get()', () => {
  // return null cases
  it('should return null if empty string passed', () => {
    document.cookie = 'onlyvalue';
    expect(get('')).to.be.equal(null);
    document.cookie = '=tiny=cookie';
    expect(get('')).to.be.equal(null);
  });

  it("should return null if the cookie key isn't exist", () => {
    expect(get('nokey')).to.be.equal(null);
  });

  // whitespace
  it('should return right value if cookie key contains whitespace', () => {
    const key = 'he   lllo';
    const value = 'world';
    document.cookie = key + '=' + value;
    expect(get(key)).to.be.equal(value);
  });

  it('should return right value if cookie value contains whitespace', () => {
    const key = 'whitespacevalue';
    const value = 'va    lue';
    document.cookie = key + '=' + value;
    expect(get(key)).to.be.equal(value);
  });

  // normal cases
  it("should return 'tom' if 'name' passed", () => {
    document.cookie = 'name=tom';
    document.cookie = 'namename=tomtom';
    expect(get('name')).to.be.equal('tom');
  });

  it('should return an empty string if only key is set', () => {
    document.cookie = 'onlykey=';
    expect(get('onlykey')).to.be.equal('');
  });
});

describe('set()', () => {
  it('should return the set cookie value', () => {
    set('someKey', 'someValue');
    expect(get('someKey')).to.be.equal('someValue');
  });

  it('should return the set cookie value', () => {
    set('someKey', 'true');
    expect(get('someKey')).to.be.equal('true');
  });

  it('should return null when cookie path is restricted', () => {
    set('path_cookie', 'some_value', { path: '/the-other-path/' });
    expect(get('path_cookie')).to.equal(null);
  });
});

describe('remove()', () => {
  it("should return null when remove 'removeKey' cookie ", () => {
    set('removeKey', 'removeValue', {
      path: '/',
      domain: '',
    });
    remove('removeKey');
    expect(get('removeKey')).to.be.equal(null);
  });
  it("should return null when remove 'removeKeyUnderPath' cookie under the specified path ", () => {
    set('removeKeyUnderPath', 'removeValueUnderPath', {
      path: '/underPath',
    });
    remove('removeKeyUnderPath', {
      path: '/underPath',
    });
    expect(get('removeKeyUnderPath')).to.be.equal(null);
  });
  it("should return null when remove 'removeKeyUnderDomain' cookie under the specified domain ", () => {
    set('removeKeyUnderDomain', 'removeValueUnderDomain', {
      domain: 'localhost',
    });
    remove('removeKeyUnderDomain', {
      domain: 'localhost',
    });
    expect(get('removeKeyUnderDomain')).to.be.equal(null);
  });
});
