import * as bcrypt_utils from '../../src/lib/bcrypt_utils';
import * as bcrypt from 'bcrypt-as-promised';


describe('Hash with Salt', () => {
  let sandbox;
  beforeEach(function () {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('should return a string', async function() {
    const hashedPw = await bcrypt_utils.hashWithSalt('mypw');
    expect(hashedPw).to.be.a('string');
  });

  it('throw an error ', function() {
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
});
