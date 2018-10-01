const http = require('http');

const app = require('./app');
const consts = require('./shared');

const port = process.env.PORT || consts.PORT; // normalizePort(process.env.PORT || PORT);
app.set('port', port);

const server = http.createServer(app);
