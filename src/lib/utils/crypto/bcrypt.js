import bcrypt from 'bcrypt-as-promised';

export async function hashWithSalt(pwd) {
  try {
    return await bcrypt.hash(pwd);
  } catch(err) {
    throw err;
  }
}

export async function compare(input, pw) {
  try {
    await bcrypt.compare(input, pw);
    return true;
  } catch (err) {
    if(err instanceof bcrypt.MISMATCH_ERROR) {
      return false;
    }
    throw err;
  }
}
