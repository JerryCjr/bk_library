import { expect } from 'chai';
import * as util from '../../src/util';

describe('util test', function() {
  it('test for is null or empty', function() {
    expect(util.isNullOrEmpty('')).to.be.equal(true);
    expect(util.isNullOrEmpty(undefined)).to.be.equal(true);
    expect(util.isNullOrEmpty(null)).to.be.equal(true);
    expect(util.isNullOrEmpty(0)).to.be.equal(false);
    expect(util.isNullOrEmpty(20)).to.be.equal(false);
    expect(util.isNullOrEmpty('this is world')).to.be.equal(false);
    expect(util.isNullOrEmpty(false)).to.be.equal(false);
    expect(util.isNullOrEmpty({ age: 30 })).to.be.equal(false);
  });
  it('test for filtering request parameters', function() {
    let result = null;

    result = util.filterRequestEmptyParams(true);
    expect(result).to.be.equal(true);

    result = util.filterRequestEmptyParams('test name');
    expect(result).to.be.equal('test name');

    result = util.filterRequestEmptyParams(['start', 'to', 'test']);
    expect(result[1]).to.be.equal('to');
    expect(result instanceof Array).to.be.equal(true);

    result = util.filterRequestEmptyParams(['start', '', 'test']);
    expect(result[1]).to.be.equal(''); // primitive value in array cannot be removed

    result = util.filterRequestEmptyParams({
      user: 'Alan',
      phone: '13450986436'
    });
    expect(result.user).to.not.be.equal('');
    expect(result.phone).to.not.be.equal('');

    result = util.filterRequestEmptyParams({
      user: 'Alan',
      phone: '',
      parents: ['Nancy', 'Boyd']
    });
    expect(result.phone).to.be.undefined;
    expect(result.parents.length).to.be.equal(2);
    expect(result.parents[1]).to.equal('Boyd');

    result = util.filterRequestEmptyParams([
      { bookName: 'Hello world', ISBN: '09001' },
      { bookName: 'Never give up', ISBN: '09002' },
      undefined
    ]);
    expect(result.length).to.be.equal(3);
    expect(result[1].ISBN).to.be.equal('09002');

    result = util.filterRequestEmptyParams([
      { bookName: 'Hello world', ISBN: '09001' },
      { bookName: 'Never give up', ISBN: '' }
    ]);
    expect(result.length).to.be.equal(2);
    expect(result[1].ISBN).to.be.undefined;
  });
});
