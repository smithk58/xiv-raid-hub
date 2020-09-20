const app = require('./app');
const PORT = Number(process.env.PORT) || 4200;
app.default.listen(PORT);
