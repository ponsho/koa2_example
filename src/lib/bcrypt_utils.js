import bcrypt from 'bcrypt-as-promised';


const saltFactor = 10;
async function t() {
  try {
    const salt = await bcrypt.genSalt(10);
    //console.log(salt);

    const hashedPwd = await bcrypt.hash('hello', salt);
    //console.log(hashedPwd);

    const isMatch = await bcrypt.compare('hello', hashedPwd);
    console.log('the fuck!');
  } catch(err) {
    console.log(err);
  }
}
//
//t();


async function salt() {
  try {
    return await bcrypt.genSalt(10);
  } catch(err) {
    throw err;
  }
}

export async function hashAndSalt(pwd) {
  try{
    return await bcrypt.hash(pwd, salt());
  } catch(err) {
    throw err;
  }
}


