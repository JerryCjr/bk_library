import { domain } from '../../src/domain';

describe('domain()_cover_test', () => {
  it('domain() should return expected value if the location.hostname === "10.10.120.110"', () => {
    const hostName = '10.10.120.110';
    expect(domain(hostName)).to.be.deep.equal({
      tld: '10.10.120.110',
    });
  });

  it('domain() should return expected value if the location.hostname === "localhost"', () => {
    expect(domain()).to.be.deep.equal({
      tld: 'localhost',
    });
  });

  it('domain() should return expected value if the location.hostname === "m.babyfs.cn"', () => {
    const hostName = 'm.babyfs.cn';
    expect(domain(hostName)).to.be.deep.equal({
      tld: 'cn',
      sld: 'babyfs',
      scd: 'babyfs.cn',
      thld: 'm',
      thcd: 'm.babyfs.cn',
    });
  });

  it('domain() should return expected value if the location.hostname === "m.lpt.babyfs.cn"', () => {
    const hostName = 'm.lpt.babyfs.cn';
    expect(domain(hostName)).to.be.deep.equal({
      tld: 'cn',
      sld: 'babyfs',
      scd: 'babyfs.cn',
      thld: 'lpt',
      thcd: 'lpt.babyfs.cn',
    });
  });

  it('domain() should return expected value if the location.hostname === "m.dev.babyfs.cn"', () => {
    const hostName = 'm.dev.babyfs.cn';
    expect(domain(hostName)).to.be.deep.equal({
      tld: 'cn',
      sld: 'babyfs',
      scd: 'babyfs.cn',
      thld: 'dev',
      thcd: 'dev.babyfs.cn',
    });
  });

  it('domain() should return expected value if the location.hostname === "m.bvt.babyfs.cn"', () => {
    const hostName = 'm.bvt.babyfs.cn';
    expect(domain(hostName)).to.be.deep.equal({
      tld: 'cn',
      sld: 'babyfs',
      scd: 'babyfs.cn',
      thld: 'bvt',
      thcd: 'bvt.babyfs.cn',
    });
  });

  it('domain() should return expected value if the location.hostname === "m.test.babyfs.cn"', () => {
    const hostName = 'm.test.babyfs.cn';
    expect(domain(hostName)).to.be.deep.equal({
      tld: 'cn',
      sld: 'babyfs',
      scd: 'babyfs.cn',
      thld: 'test',
      thcd: 'test.babyfs.cn',
    });
  });
});
