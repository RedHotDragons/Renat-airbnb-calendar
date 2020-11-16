const mongoose = require('mongoose');
const db = require('./index.js');

// make an array of objects to populate database for testing
const makeRandomReservations = () => {
  let reservations = [];
  const years = [2020, 2021];
  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  for (let year of years) {
    for (let month of months) {
      reservations.push({
          startYear: year,
          startMonth: month,
          startDay: 7,
          endYear: year,
          endMonth: month,
          endDay: 14,
          contains: [String(month) + String(year)],
      });
    }
  }
  reservations.push(
    {
      startYear: 2020,
      startMonth: 11,
      startDay: 29,
      endYear: 2021,
      endMonth: 0,
      endDay: 4,
      contains: ["112020", "02021"]
    }
  );

  reservations.push(
    {
      startYear: 2022,
      startMonth: 0,
      startDay: 29,
      endYear: 2022,
      endMonth: 6,
      endDay: 4,
      contains: ["02022", "12022", "22022", "32022", "42022", "52022", "62022"]
    }
  );
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
