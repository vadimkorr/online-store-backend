const dbService = require('@services/db');
const consts = require('@consts');

function findByLogin(login) {
  return dbService.findBy(
    consts.collectionNames.USERS_COLL_NAME,
    'login',
    login
  );
}

function saveUser(user) {
  dbService.insert(consts.collectionNames.USERS_COLL_NAME, user);
}

module.exports = {
  findByLogin,
  saveUser
};
