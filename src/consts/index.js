const collectionNames = require('./collection-names');
const server = require('./server');
const app = require('./app');
const roles = require('./roles');
const statuses = require('./statuses');

module.exports = {
  app,
  collectionNames,
  server,
  roles,
  statuses
};
