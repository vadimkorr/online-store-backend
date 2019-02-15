const dbService = require('@services').dbService;
const consts = require('@consts');

module.exports = () => {
  dbService.initDb(consts.server.DB_PATH);
};
