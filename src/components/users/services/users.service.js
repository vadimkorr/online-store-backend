const usersDal = require('@users/dal/users.dal');

function findByLogin(login) {
  return usersDal.findByLogin(login);
}

function saveUser(user) {
  return usersDal.saveUser(user)
}

module.exports = {
  findByLogin,
  saveUser
};
