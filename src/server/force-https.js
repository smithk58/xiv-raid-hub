/**
 * Force HTTPS connection on any incoming requests
 *
 * @param  {Number}   [port]
 * @param  {String}   [hostname]
 * @param  {Number}   [httpStatusCode=301]
 * @return {Function}
 */
module.exports = (port, hostname, httpStatusCode = 301) => (ctx, next) => {
  // Detect x-forwarded-proto as well: https://help.heroku.com/VKLSBMJS/why-am-i-getting-a-message-too-many-redirects
  if (ctx.secure || ctx.header['x-forwarded-proto'] === 'https') return next();

  const urlRedirect = ctx.request.URL;
  urlRedirect.protocol = 'https';
  if (port) urlRedirect.port = port;
  if (hostname) urlRedirect.hostname = hostname;

  ctx.response.status = httpStatusCode;
  ctx.response.redirect(urlRedirect.href);
};
