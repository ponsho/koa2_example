import Koa from 'koa';
import logger from 'winston';

const app = new Koa();

app.use(async (ctx, next) => {
    // call the next middleware below
    await next();
});

app.use(async (ctx) => {
    // no more next();
    // head back up the stack
    ctx.body = 'Hello world';
});

app.listen(3000);
logger.info("Server started in localhost:3000");
