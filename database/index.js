const mongoose = require('mongoose');

// Schema
const dateSchema = mongoose.Schema({
  startYear: { type: Number },
  startMonth: { type: Number },
  startDay: { type: Number },
  endYear: { type: Number },
  endMonth: { type: Number },
  endDay: { type: Number },
});

// Model
const dateModel = mongoose.model('datemodels', dateSchema);

// Given an array of objects, save all objects to database
const saveMany = (reservations, callback) => {
  mongoose.connect('mongodb://localhost/calendar');

  mongoose.connection.dropCollection('datemodels', (err) => {
    if (err) {
      console.log('error dropping', err);
    }
  });

  dateModel.create(reservations)
    .then((data) => {
      mongoose.connection.close();
      callback(null, data)
    })
    .catch((error) => {
      mongoose.connection.close();
      callback(error)
    });
};

const getAll = (callback) => {
  mongoose.connect('mongodb://localhost/calendar');
  dateModel.find((err, data) => {
    mongoose.connection.close();
    if (err) {callback(err)} else {callback(null, data);}
  });
}

module.exports = {
  saveMany,
  getAll
};
