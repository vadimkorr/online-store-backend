require('module-alias/register');
const express = require('express');
const http = require('http');
const app = express();
const loggerService = require('@shared-services').loggerService;

const consts = require('@shared-consts');
const port = process.env.PORT || consts.server.PORT;

require('./startup/routes')(app);
require('./startup/db')();
require('./startup/logging')();
require('./startup/swagger')(app);

const server = http.createServer(app);
server.listen(port, () => {
  loggerService.info(`Server listening on port ${port}`);
});
