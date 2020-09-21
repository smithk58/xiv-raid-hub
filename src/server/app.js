const Koa = require('koa');
const serve = require('koa-static');
const send = require('koa-send');
const path = require('path');

const app = new Koa();
const staticDirPath = path.join(__dirname, 'xiv-raid-hub');
app.use(serve(staticDirPath));
// Redirect any 401s to index, so the angular frontend can handle them
app.use(async (ctx, next) => {
  await next();
  if(ctx.response.status === 404) {
    await send(ctx, '/dist/xiv-raid-hub/index.html');
  }
});
exports.default = app;
