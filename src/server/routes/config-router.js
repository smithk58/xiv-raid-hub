const Router = require('@koa/router')

const routerOpts = {prefix: '/config'};
const configRouter = new Router(routerOpts);
/**
 * Grant redirects here after a user has authed via discord. Should confirm the user is who they say they are, update
 * our local user, etc..
 */
configRouter.get('/', async (ctx) => {
    const config = {
      baseApiUrl: process.env.BACKEND_BASE_URL
    }
  ctx.ok(config);
});
module.exports = configRouter.routes();
