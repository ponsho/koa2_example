import passport from 'koa-passport';
import FacebookStrategy from 'passport-facebook';
// import logger from 'winston';
import config from 'config';
import db from '../db/db';

const fbConfig = {
  clientID: config.get('facebookAuth.clientId'),
  clientSecret: config.get('facebookAuth.clientSecret'),
  callbackURL: config.get('facebookAuth.callbackUrl'),
  profileFields: config.get('facebookAuth.profileFields'),
  enableProof: true,
};

const strategy = new FacebookStrategy(fbConfig,
  async (token, tokenSecret, profile, done) => {
    try {
      let user = await db.User.findOne({ 'facebook.id': profile.id });
      if (user === null) {
        console.log('new user');
        console.log(profile);
        user = new db.User();
        user.email = profile.emails[0].value;
        user.facebook.id = profile.id;
        await user.save();
      }
      // logger.log(token);
      done(null, user);
    } catch (err) {
      // logger.log(err);
      throw err;
    }
  }
);

passport.use(strategy);
