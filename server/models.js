const mongoSeedModels = require('../database/seed.js');
const db = require('../database/index.js');

const seed = (callback) => {
  mongoSeedModels.populate((err, data) => {
    if (err) {callback(err)} else {
      callback(null);
    }
    });
};

const getAll = (callback) => {
  db.getAll((err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data)
    }
  })
}

module.exports = {
  seed,
  getAll
};