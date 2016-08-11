import * as bcrypt_utils from '../../src/lib/bcrypt_utils';
import chai, { expect } from 'chai';

describe('Example Node Server', () => {
  it('should return 200', async function() {
    const t = await bcrypt_utils.hashAndSalt('hello');
    console.log(t);
    expect(t).to.be.a('string');
  });
});
