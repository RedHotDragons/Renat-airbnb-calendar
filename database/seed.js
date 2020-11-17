const mongoose = require('mongoose');
const db = require('./index.js');

// make an array of objects to populate database for testing
const makeRandomReservations = () => {
  let reservations = [];
  const years = [2020, 2021];
  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  for (let year of years) {
    for (let month of months) {
      for (let day = 8; day < 16; day++) {
        reservations.push({
            year: year,
            month: month,
            day: day,
        });
      }
    }
  }
  return reservations;
};

// Run this function to populate the database with random dates
const populate = (callback) => {

  const reservations = makeRandomReservations();

  db.saveMany(reservations, (err, data) => {
    if (err) { callback(err); } else {
      callback(null, data);
    }
  });
};

populate((err, data)=>{console.log('populated');})

module.exports = { populate };
