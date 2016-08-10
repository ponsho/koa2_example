import Koa from 'koa';
import logger from 'winston';
import morgan from 'koa-morgan';

const app = new Koa();

app.use(morgan('dev'));

app.use(async (ctx, next) => {
    // call the next middleware below
    await next();
});

app.use(async (ctx) => {
    // no more next();
    // head back up the stack
    logger.info('requested!');
    ctx.body = 'Hello world';
});

app.listen(3000);
logger.info("Server started in localhost:3000");
