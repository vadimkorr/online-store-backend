const loggerService = require('@shared-services').loggerService;

function withErrorHandling(handler) {
  return (req, res, next) => {
    try {
      handler(req, res);
    } catch (e) {
      next(e);
    }
  };
}

function handleError(err, req, res, next) {
  loggerService.error(err.message, err);
  res.status(500).send('Something went wrong');
}

module.exports = {
  withErrorHandling: withErrorHandling,
  handleError: handleError
};
