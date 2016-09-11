import passport from 'koa-passport';
import GoogleStrategy  from 'passport-google-oauth2';
import config from 'config';
import User from '../models/users';

const googleConfig = {
  clientID: config.get('googleAuth.clientId'),
  clientSecret: config.get('googleAuth.clientSecret'),
  callbackURL: config.get('googleAuth.callbackUrl'),
};

const strategy = new GoogleStrategy(googleConfig,
  async (token, refreshToken, profile, done) => {
    const { email, id } = profile;
    try {
      let user = await User.findOne({ 'google.id': id });
      if (user === null) {
        console.log('new user');
        user = new User();
        user.email = email;
        user.google.id = id;
        await user.save();
      }
      done(null, user);
    } catch(err) {
      console.log(err);
      throw err;
    }
  }
);

passport.use(strategy);
