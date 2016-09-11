import bcrypt from 'bcrypt-as-promised';
import crypto from 'crypto';
import promisify from 'es6-promisify';

const randomBytes = promisify(crypto.randomBytes);

export async function hashWithSalt(pwd) {
  try {
    return await bcrypt.hash(pwd);
  } catch (err) {
    throw err;
  }
}

export async function compare(input, pw) {
  try {
    await bcrypt.compare(input, pw);
    return true;
  } catch (err) {
    if (err instanceof bcrypt.MISMATCH_ERROR) {
      return false;
    }
    throw err;
  }
}

export async function generateRandomBytes(n) {
  try{
    const buffer = await randomBytes(n);
    return buffer.toString('hex');
  } catch(err) {
    throw err;
  }
}
