const Koa = require('koa');
const serve = require('koa-static');
const path = require('path');
const app = new Koa();

const staticDirPath = path.join(__dirname, 'xiv-raid-hub');
app.use(serve(staticDirPath));
exports.default = app;
