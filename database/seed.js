const mongoose = require('mongoose');
const db = require('./index.js');

// make an array of objects to populate database for testing
const makeRandomReservations = () => {
  let reservations = [];
  const years = [2018, 2019, 2020, 2021, 2022];
  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  for (let year of years) {
    for (let month of months) {
      reservations.push(
        {
          startYear: year,
          startMonth: month,
          startDay: 1,
          endYear: year,
          endMonth: month,
          endDay: 6,
        }
      );

      reservations.push(
        {
          startYear: year,
          startMonth: month,
          startDay: 12,
          endYear: year,
          endMonth: month,
          endDay: 22,
        }
      );
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
