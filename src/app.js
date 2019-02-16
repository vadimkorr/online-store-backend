require('module-alias/register');
const express = require('express');
const http = require('http');
const app = express();
const loggerService = require('@services').loggerService;

const consts = require('@consts');
const port = process.env.PORT || consts.server.PORT;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});


require('./startup/routes')(app);
require('./startup/db')();
require('./startup/logging')();
require('./startup/swagger')(app);

const server = http.createServer(app);
server.listen(port, () => {
  loggerService.info(`Server listening on port ${port}`);
});
