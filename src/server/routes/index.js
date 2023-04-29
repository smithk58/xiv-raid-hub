const Router = require('@koa/router')

const ConfigRouter = require('./config-router');

const apiRouter = new Router({prefix: '/api'});
apiRouter.use(ConfigRouter);
module.exports = apiRouter;
