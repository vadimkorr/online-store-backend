require('module-alias/register');

const http = require('http');

const app = require('./src/app');
const consts = require('@shared-consts');

const port = process.env.PORT || consts.server.PORT; // normalizePort(process.env.PORT || PORT);
app.set('port', port);

const server = http.createServer(app);

server.listen(app.get('port'), () => {
  console.log(`Server listening on port ${app.get('port')}`);
});
