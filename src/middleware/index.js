const errorHandling = require('./errorHandling');
const auth = require('./auth');

module.exports = {
  auth,
  withErrorHandling: errorHandling.withErrorHandling,
  handleError: errorHandling.handleError
};
