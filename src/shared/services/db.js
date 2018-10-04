const loki = require('lokijs');

const _consts = require('@shared-consts');

let _db;

function _createCollIfNotExist(coll) {
  let isExist = _db.getCollection(coll);
  if (!isExist) {
    _db.addCollection(coll);
  }
}

function initDb(path) {
  _db = new loki(path, {
    env: 'NODEJS',
    autosave: true
  });
  _db.loadDatabase({}, () => {
    _createCollIfNotExist(_consts.collectionNames.USERS_COLL_NAME);
    _createCollIfNotExist(_consts.collectionNames.PRODUCTS_COLL_NAME);
    _createCollIfNotExist(_consts.collectionNames.ORDERS_COLL_NAME);
  });
}

function saveDb() {
  _db.saveDatabase();
}

function getById(collName, id) {
  return _db.getCollection(collName).get(id);
}

function getRange(collName, start, count) {
  return _db
    .getCollection(collName)
    .chain()
    .offset(start)
    .limit(count)
    .data();
}

function insert(collName, item) {
  _db.getCollection(collName).insert(item);
}

module.exports = {
  initDb: initDb,
  saveDb: saveDb,
  getById: getById,
  getRange: getRange,
  insert: insert
};
