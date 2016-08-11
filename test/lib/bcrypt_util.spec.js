import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import * as bcrypt_utils from '../../src/lib/bcrypt_utils';
import * as bcrypt from 'bcrypt-as-promised';

require('sinon-as-promised');

chai.use(chaiAsPromised);
chai.use(sinonChai);

describe('Bcrypt utils', () => {
  let sandbox;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('Hash with Salt', () => {

    it('should return a string', async function() {
      const hashedPw = await bcrypt_utils.hashWithSalt('mypw');
      expect(hashedPw).to.be.a('string');
    });

    it('should rethrow any error happening in the bcrypt hash function', function() {
      sandbox.stub(bcrypt.default, 'hash').rejects('fail');
      return expect(bcrypt_utils.hashWithSalt('wtf')).to.rejectedWith(Error);
    });
  });

  describe('Compare', () => {
    it('should return true for a valid password', async function() {
      const pw = 'mypassword';
      const hashedPw = await bcrypt_utils.hashWithSalt(pw);
      const result = await bcrypt_utils.compare(pw,hashedPw);
      expect(result).to.be.true;
    });

    it('should return false for an invalid password', async function() {
      const hashedPw = await bcrypt_utils.hashWithSalt('myRealPassword');
      const result = await bcrypt_utils.compare('notMyPassword',hashedPw);
      expect(result).to.be.false;
    });

    it('should rethrow any error happening in the bcrypt compare function ', function() {
      sandbox.stub(bcrypt.default, 'compare').rejects('fail');
      return expect(bcrypt_utils.compare('a','b')).to.rejectedWith(Error);
    });
  });

});
