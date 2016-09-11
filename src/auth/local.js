import passport from 'koa-passport';
import LocalStrategy from 'passport-local';
import User from '../models/users';

const options = {
  usernameField: 'email',
  session: false,
};

async function strategyCallback(email, password, done) {
  try {
    console.log(email, password);
    const user = await User.findOne({ email });
    console.log(user);
    console.log(password);
    if (!user) {
      return done(null, false);
    }
    const passwordMatch = await user.verifyPassword(password);

    if (!passwordMatch) {
      console.log('Bad password!!!');
      return done(null, false);
    }

    return done(null, user);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

const localStrategy = new LocalStrategy(options, strategyCallback);
passport.use(localStrategy);
