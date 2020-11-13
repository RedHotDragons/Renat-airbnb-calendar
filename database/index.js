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
const dateModel = mongoose.model('dateModel', dateSchema);

// Given an array of objects, save all objects to database
const saveMany = (reservations, callback) => {
  dateModel.create(reservations)
    .then((data) => callback(null, data))
    .catch((error) => callback(error));
};

module.exports = {saveMany};