import fs from 'fs';

let secrets = {};
try {
  secrets = JSON.parse(fs.readFileSync('/etc/secrets.json'));
} catch (err) {
  console.log(err);
  console.log('Error reading secrets file!');
}

console.log(secrets);
module.exports = {
  mongodb: {
    host: 'localhost',
    port: '27017',
    dbName: 'dev',
  },
  facebookAuth: {
    clientId: '205426656526909',
    clientSecret: secrets.facebookAuth.clientSecret,
    profileFields: ['id', 'email'],
    callbackUrl: 'http://localhost:3000/auth/facebook/callback',
  },
  googleAuth: {
    clientId: '843514366801-282g25funasrsum15df8o6tv2i3h7hvu.apps.googleusercontent.com',
    clientSecret: secrets.googleAuth.clientSecret,
    callbackUrl: 'http://localhost:3000/auth/google/callback',
  }
};
