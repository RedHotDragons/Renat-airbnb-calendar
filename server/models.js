const db = require('../database/index.js');


const getAll = (callback) => {
  db.getAll((err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data)
    }
  })
}

const getSome = (params, callback) => {
  db.getSome( params, (err, data)=>{
    if (err) {callback(err);} else {
      callback(null, data);
    }
  });
}

const getMonthOne = (callback) => {
  db.getMonthOne((err,data) => {
    if(err) {
      callback(err);
    } else {
      callback(null, data);
    }
  })
}

const updateEntry = (params, callback) => {
  db.updateEntry(params, (err, data) => {
    if(err) {
      callback(err);
    } else {
      callback(null, data);
    }
  })
}

module.exports = {
  getAll,
  getSome,
  getMonthOne,
  updateEntry
};