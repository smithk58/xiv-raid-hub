const Koa = require('koa');
const serve = require('koa-static');
const send = require('koa-send');
const respond = require('koa-respond');
const forceHTTPS = require('./force-https');
const helmet = require("koa-helmet");
const contentSecurityPolicy = require('helmet/dist/middlewares/content-security-policy');
const dotenv = require('dotenv').config();
const apiRouter = require('./routes');

const app = new Koa();
// Apply common security
const defaultCSP = contentSecurityPolicy.getDefaultDirectives();
// Add an exception for a piece of inline script we run for applying themes quickly
defaultCSP['script-src'].push("'sha256-pcK1NxX+YPEGXy+W+q6zsqDZEXvktWdW4g/136GHXPM='");
// Add our BE as a valid src for the FE
defaultCSP['default-src'].push(process.env.BACKEND_BASE_URL);
// Add discord avatars as a valid image src
defaultCSP['img-src'].push('https://cdn.discordapp.com/avatars/');
app.use(helmet({
  contentSecurityPolicy: defaultCSP
}));
// Redirect http -> https
if (process.env.NODE_ENV !== 'development') {
  app.use(forceHTTPS());
}
app.use(serve(__dirname));
// Easier responses https://www.npmjs.com/package/koa-respond
app.use(respond());
// API routes
app.use(apiRouter.routes());
app.use(apiRouter.allowedMethods());
// Redirect any 401s to index, so the angular frontend can handle them
app.use(async (ctx, next) => {
  await next();
  if(ctx.response.status === 404) {
    await send(ctx, '/dist/xiv-raid-hub/index.html');
  }
});
exports.default = app;
