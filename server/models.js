const mongoSeedModels = require('../database/seed.js');

const seed = (callback) => {
  mongoSeedModels.populate((err, data) => {
    if (err) {callback(err)} else {
      callback(null);
    }
    });
};

module.exports = {
  seed
};