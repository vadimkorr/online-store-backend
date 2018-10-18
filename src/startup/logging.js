const loggerService = require('@shared-services').loggerService;

module.exports = () => {
  process.on('uncaughtException', e => {
    loggerService.error(e.message, e);
  });
  process.on('unhandledRejection', e => {
    loggerService.error(e.message, e);
  });
};
