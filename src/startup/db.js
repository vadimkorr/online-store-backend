const dbService = require('@shared-services').dbService;
const consts = require('@shared-consts');

module.exports = () => {
  dbService.initDb(consts.server.DB_PATH);
};
