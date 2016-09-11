import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import passport from 'koa-passport';

const router = require('koa-router')();
import './src/auth/fb';
import './src/auth/local';
import './src/auth/google';

import User from './src/models/users';

const app = new Koa();

app.use(bodyParser());
app.use(passport.initialize());

router.post('/register', async () => {

})

const sessionless = { session: false };
router.get('/auth/facebook', passport.authenticate('facebook', sessionless ));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', sessionless),
  function(ctx) {
    ctx.body = 'Yei';
    console.log(ctx.req.user);
  },
  function(err) {
    console.log('ERROR!');
    console.log(err);
  }
);

router.post('/sign-up', async (ctx) => {
  const body = ctx.request.body;
  const user = new User(body);
  try {
    await user.save();
  } catch (err) {
    console.log(err);
  }
});

router.get('/', async ctx => ctx.body = 'Hello' );
router.post('/auth/local',
  passport.authenticate('local', sessionless),
  function(ctx) {
    ctx.boy = 'Yei'
});


router.get('/auth/google', passport.authenticate('google', { session: false, scope : ['profile', 'email'] }));
router.get('/auth/google/callback',
  passport.authenticate('google', sessionless),
  function(ctx) {
    ctx.body = 'Yei';
    console.log(ctx.req.user);
  },
  function(err) {
    console.log('ERROR!');
    console.log(err);
  }
);
app.use(router.routes());

app.listen(3000);
console.info('Server started in localhost:3000');
process.on('uncaughtException', err => console.error('uncaught exception:', err));
process.on('unhandledRejection', error => console.error('unhandled rejection:', error));
