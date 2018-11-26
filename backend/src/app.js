const Koa = require('koa');
const cors = require('@koa/cors');
const koaBody = require('koa-bodyparser');
const logger = require('koa-logger');
const session = require('koa-session');
const passport = require('koa-passport');

const app = module.exports = new Koa();

app.keys = ['put secret key here'];

app.use(koaBody());
app.use(logger());
app.use(session(app));
app.use(passport.initialize());
app.use(passport.session());

app.use(async function(ctx) {
  ctx.body = 'Hello World';
});

if (!module.parent) {
  app.listen(3000, () => {
    console.log(
      `Server is listening on localhost:3000`
    )
  });
}

