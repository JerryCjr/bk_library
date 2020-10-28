import { expect } from 'chai';
import urlHelper from '../../src/index';

describe('index_test', function () {
  it('anchor_url_should_add_some_parameters_correctly', () => {
    let url = '';
    const ts = +new Date();
    url = urlHelper.addParameter(
      { ts: ts },
      'http://m.lpt.babyfs.cn/#/learning_report_v2/preview?readonly=1&course_id=281&lesson_id=1978',
    );
    expect(url).to.be.equal(
      `http://m.lpt.babyfs.cn/?ts=${ts}#/learning_report_v2/preview?readonly=1&course_id=281&lesson_id=1978`,
    );

    url = urlHelper.addParameter(
      { ts: ts },
      'http://m.lpt.babyfs.cn/page=pageA?id=1#/learning_report_v2/preview?readonly=1&course_id=281&lesson_id=1978',
    );
    expect(url).to.be.equal(
      `http://m.lpt.babyfs.cn/page=pageA?id=1&ts=${ts}#/learning_report_v2/preview?readonly=1&course_id=281&lesson_id=1978`,
    );
  });

  it('anchor_url_should_remove_some_parameters_correctly', () => {
    let url = '';
    const ts = +new Date();
    url = urlHelper.removeParameter(
      ['ts'],
      `http://m.lpt.babyfs.cn/?ts=${ts}#/learning_report_v2/preview?readonly=1&course_id=281&lesson_id=1978`,
    );
    expect(url).to.be.equal(
      'http://m.lpt.babyfs.cn/#/learning_report_v2/preview?readonly=1&course_id=281&lesson_id=1978',
    );

    url = urlHelper.removeParameter(
      ['id'],
      `http://m.lpt.babyfs.cn/page=pageA?id=1&ts=${ts}#/learning_report_v2/preview?readonly=1&course_id=281&lesson_id=1978`,
    );
    expect(url).to.be.equal(
      `http://m.lpt.babyfs.cn/page=pageA?ts=${ts}#/learning_report_v2/preview?readonly=1&course_id=281&lesson_id=1978`,
    );

    url = urlHelper.removeParameter(
      ['id', 'ts'],
      `http://m.lpt.babyfs.cn/page=pageA?id=1&ts=${ts}#/learning_report_v2/preview?readonly=1&course_id=281&lesson_id=1978`,
    );
    expect(url).to.be.equal(
      'http://m.lpt.babyfs.cn/page=pageA#/learning_report_v2/preview?readonly=1&course_id=281&lesson_id=1978',
    );
  });

  it('url_should_add_some_parameters_correctly', () => {
    let url = urlHelper.addParameter({ a: 123, b: 'test' }, '/webapi/portal/get/');
    expect(url).to.be.equal('/webapi/portal/get/?a=123&b=test');

    url = urlHelper.addParameter({ a: 123, b: 'test' }, '/webapi/portal/get/#abc');
    expect(url).to.be.equal('/webapi/portal/get/?a=123&b=test#abc');

    url = urlHelper.addParameter({ a: 123, b: 'test' }, '/webapi/portal/get/?');
    expect(url).to.be.equal('/webapi/portal/get/?a=123&b=test');

    url = urlHelper.addParameter({ a: 123, b: 'test' }, '/webapi/portal/get/?c=sss');
    expect(url).to.be.equal('/webapi/portal/get/?c=sss&a=123&b=test');

    url = urlHelper.addParameter({ a: 123, b: 'test' }, '/webapi/portal/get/?c=sss#abc');
    expect(url).to.be.equal('/webapi/portal/get/?c=sss&a=123&b=test#abc');

    url = urlHelper.addParameter({ a: 123, b: 'test' }, '/m/?c=sss&ts=2143241#/portal/get/detail');
    expect(url).to.be.equal('/m/?c=sss&ts=2143241&a=123&b=test#/portal/get/detail');

    url = urlHelper.addParameter({ a: 123, b: 'test' }, '/m/#/portal/get/detail?name=damo');
    expect(url).to.be.equal('/m/?a=123&b=test#/portal/get/detail?name=damo');

    url = urlHelper.addParameter({ a: 123, b: 'test' }, '/m/#/portal/get/detail?name=damo', true);
    expect(url).to.be.equal('/m/#/portal/get/detail?name=damo&a=123&b=test');

    url = urlHelper.addParameter({ a: 123, b: 'test' }, '/m/#/portal/get/detail', true);
    expect(url).to.be.equal('/m/#/portal/get/detail?a=123&b=test');

    url = urlHelper.addParameter({ a: 123, b: 'test' }, '/m/?c=sss&ts=2143241', true);
    expect(url).to.be.equal('/m/?c=sss&ts=2143241&a=123&b=test');
  });

  it('url_should_remove_some_parameters_correctly', () => {
    let url = urlHelper.removeParameter(['a', 'c'], '/webapi/portal/?a=1&b=ttt&c=false');
    expect(url).to.be.equal('/webapi/portal/?b=ttt');

    url = urlHelper.removeParameter(['a', 'c'], '/webapi/portal/?a=1&b=ttt&c=false#but');
    expect(url).to.be.equal('/webapi/portal/?b=ttt#but');

    url = urlHelper.removeParameter(['a', 'c'], '/webapi/portal/#but');
    expect(url).to.be.equal('/webapi/portal/#but');

    url = urlHelper.removeParameter(['a', 'c'], '/webapi/portal/#but?a=1&b=2', true);
    expect(url).to.be.equal('/webapi/portal/#but?b=2');

    url = urlHelper.removeParameter(['a', 'b'], '/webapi/portal/#but?a=1&b=2', true);
    expect(url).to.be.equal('/webapi/portal/#but');

    url = urlHelper.removeParameter(['c'], '/webapi/portal/#but?a=1&b=2', true);
    expect(url).to.be.equal('/webapi/portal/#but?a=1&b=2');

    url = urlHelper.removeParameter(['a', 'c'], '/webapi/portal/?a=3&b=4#but?a=1&b=2');
    expect(url).to.be.equal('/webapi/portal/?b=4#but?a=1&b=2');

    url = urlHelper.removeParameter(['a', 'b'], '/webapi/portal/?a=3&b=4#but?a=1&b=2');
    expect(url).to.be.equal('/webapi/portal/#but?a=1&b=2');

    url = urlHelper.removeParameter(['c'], '/webapi/portal/?a=3&b=4#but?a=1&b=2&c=5');
    expect(url).to.be.equal('/webapi/portal/?a=3&b=4#but?a=1&b=2&c=5');
  });

  it('current_root_domain_should_be_localhost', () => {
    let rootDomain = urlHelper.rootDomain;
    expect(rootDomain).to.be.equal('localhost');
  });

  it('get_root_domain_should_be_babyfs_cn', () => {
    let rootDomain = urlHelper.getRootDomain('m.babyfs.cn');
    expect(rootDomain).to.be.equal('babyfs.cn');

    rootDomain = urlHelper.getRootDomain('m.dev.babyfs.cn');
    expect(rootDomain).to.be.equal('dev.babyfs.cn');

    rootDomain = urlHelper.getRootDomain('p.m.dev.babyfs.cn');
    expect(rootDomain).to.be.equal('m.dev.babyfs.cn');

    rootDomain = urlHelper.getRootDomain('babyfs.com.cn');
    expect(rootDomain).to.be.equal('babyfs.com.cn');

    rootDomain = urlHelper.getRootDomain('babyfs.net.cn');
    expect(rootDomain).to.be.equal('babyfs.net.cn');

    rootDomain = urlHelper.getRootDomain('babyfs.org.cn');
    expect(rootDomain).to.be.equal('babyfs.org.cn');

    rootDomain = urlHelper.getRootDomain('babyfs.gov.cn');
    expect(rootDomain).to.be.equal('babyfs.gov.cn');

    rootDomain = urlHelper.getRootDomain('m.dev.babyfs.com.cn');
    expect(rootDomain).to.be.equal('dev.babyfs.com.cn');

    rootDomain = urlHelper.getRootDomain('10.10.10.251');
    expect(rootDomain).to.be.equal('10.10.10.251');

    rootDomain = urlHelper.getRootDomain('');
    expect(rootDomain).to.be.equal('');
  });

  it('url_should_be_analyzed_correctly', () => {
    let result = urlHelper.analyze(
      'https://mp.weixin.qq.com/cgi-bin/announce?action=getannouncement&key=1463324905&version=1&lang=zh_CN&platform=2',
    );
    expect(result.isAbsoluteUrl).to.be.true;
    expect(result.host).to.be.equal('mp.weixin.qq.com');
    expect(result.path).to.be.equal(
      '/cgi-bin/announce?action=getannouncement&key=1463324905&version=1&lang=zh_CN&platform=2',
    );
    expect(result.sameDomain).to.be.false;
    expect(result.query.action).to.be.equal('getannouncement');
    expect(result.anchor).to.be.equal('');

    result = urlHelper.analyze(
      '/cgi-bin/announce?action=getannouncement&key=1463324905&version=1&lang=zh_CN&platform=2',
    );
    expect(result.isAbsoluteUrl).to.be.false;
    expect(result.host).to.be.equal('');
    expect(result.path).to.be.equal(
      '/cgi-bin/announce?action=getannouncement&key=1463324905&version=1&lang=zh_CN&platform=2',
    );
    expect(result.sameDomain).to.be.true;
    expect(result.query.action).to.be.equal('getannouncement');
    expect(result.anchor).to.be.equal('');

    result = urlHelper.analyze(
      'http://139.219.107.152:8888/cgi-bin/announce?action=getannouncement&key=1463324905&version=1&lang=zh_CN&platform=2',
    );
    expect(result.isAbsoluteUrl).to.be.true;
    expect(result.host).to.be.equal('139.219.107.152:8888');
    expect(result.path).to.be.equal(
      '/cgi-bin/announce?action=getannouncement&key=1463324905&version=1&lang=zh_CN&platform=2',
    );
    expect(result.sameDomain).to.be.false;
    expect(result.query.action).to.be.equal('getannouncement');
    expect(result.anchor).to.be.equal('');

    result = urlHelper.analyze('http://m.babyfs.cn');
    expect(result.isAbsoluteUrl).to.be.true;
    expect(result.host).to.be.equal('m.babyfs.cn');
    expect(result.path).to.be.equal('');
    expect(result.sameDomain).to.be.false;
    expect(Object.keys(result.query).length).to.be.equal(0);
    expect(result.anchor).to.be.equal('');

    result = urlHelper.analyze('http://m.babyfs.cn/');
    expect(result.isAbsoluteUrl).to.be.true;
    expect(result.host).to.be.equal('m.babyfs.cn');
    expect(result.path).to.be.equal('/');
    expect(result.sameDomain).to.be.false;
    expect(Object.keys(result.query).length).to.be.equal(0);
    expect(result.anchor).to.be.equal('');

    try {
      urlHelper.analyze('');
    } catch (e) {
      expect(e).to.be.an('error');
      expect(e.message).to.be.equal('url is error');
    }

    result = urlHelper.analyze('/');
    expect(result.isAbsoluteUrl).to.be.false;
    expect(result.host).to.be.equal('');
    expect(result.path).to.be.equal('/');
    expect(result.sameDomain).to.be.true;
    expect(Object.keys(result.query).length).to.be.equal(0);
    expect(result.anchor).to.be.equal('');

    try {
      urlHelper.analyze(
        'https://mp.weixin.qq.com//cgi-bin/announce?action=getannouncement&key=1463324905&version=1&lang=zh_CN&platform=2',
      );
    } catch (e) {
      expect(e).to.be.an('error');
      expect(e.message).to.be.equal('url is error');
    }

    result = urlHelper.analyze(
      'https://mp.weixin.qq.com/cgi-bin/announce?action=getannouncement&key=1463324905&version=1&lang=zh_CN&platform=2#title',
    );
    expect(result.isAbsoluteUrl).to.be.true;
    expect(result.host).to.be.equal('mp.weixin.qq.com');
    expect(result.path).to.be.equal(
      '/cgi-bin/announce?action=getannouncement&key=1463324905&version=1&lang=zh_CN&platform=2#title',
    );
    expect(result.sameDomain).to.be.false;
    expect(result.query.action).to.be.equal('getannouncement');
    expect(result.anchor).to.be.equal('title');

    result = urlHelper.analyze(
      '/cgi-bin/announce?action=getannouncement&key=1463324905&version=1&lang=zh_CN&platform=2#title',
    );
    expect(result.isAbsoluteUrl).to.be.false;
    expect(result.host).to.be.equal('');
    expect(result.path).to.be.equal(
      '/cgi-bin/announce?action=getannouncement&key=1463324905&version=1&lang=zh_CN&platform=2#title',
    );
    expect(result.sameDomain).to.be.true;
    expect(result.query.action).to.be.equal('getannouncement');
    expect(result.anchor).to.be.equal('title');

    result = urlHelper.analyze(
      'http://139.219.107.152:8888/cgi-bin/announce?action=getannouncement&key=1463324905&version=1&lang=zh_CN&platform=2#title',
    );
    expect(result.isAbsoluteUrl).to.be.true;
    expect(result.host).to.be.equal('139.219.107.152:8888');
    expect(result.path).to.be.equal(
      '/cgi-bin/announce?action=getannouncement&key=1463324905&version=1&lang=zh_CN&platform=2#title',
    );
    expect(result.sameDomain).to.be.false;
    expect(result.query.action).to.be.equal('getannouncement');
    expect(result.anchor).to.be.equal('title');

    result = urlHelper.analyze('http://m.babyfs.cn/#title');
    expect(result.isAbsoluteUrl).to.be.true;
    expect(result.host).to.be.equal('m.babyfs.cn');
    expect(result.path).to.be.equal('/#title');
    expect(result.sameDomain).to.be.false;
    expect(Object.keys(result.query).length).to.be.equal(0);
    expect(result.anchor).to.be.equal('title');

    try {
      urlHelper.analyze('');
    } catch (e) {
      expect(e).to.be.an('error');
      expect(e.message).to.be.equal('url is error');
    }

    result = urlHelper.analyze('/#title');
    expect(result.isAbsoluteUrl).to.be.false;
    expect(result.host).to.be.equal('');
    expect(result.path).to.be.equal('/#title');
    expect(result.sameDomain).to.be.true;
    expect(Object.keys(result.query).length).to.be.equal(0);
    expect(result.anchor).to.be.equal('title');

    try {
      urlHelper.analyze(
        'https://mp.weixin.qq.com//cgi-bin/announce?action=getannouncement&key=1463324905&version=1&lang=zh_CN&platform=2#title',
      );
    } catch (e) {
      expect(e).to.be.an('error');
      expect(e.message).to.be.equal('url is error');
    }
  });
});
