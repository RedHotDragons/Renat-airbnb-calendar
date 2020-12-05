const mongoose = require('mongoose');
const faker = require('faker');
const db = require('./index.js');

const makeRandomListings = () => {
  let listings = [];
  for(var i = 0; i < 10; i++) {
  let listing = {};
  listing.address = faker.address.streetAddress();
  listing.reservation = makeRandomReservation();
  listing.room = faker.random.arrayElement(["entire place", "private room", "shared room"]);
  listings.push(listing);
  }
  console.log(listings[0].reservation);
  return listings;
}

const makeRandomReservation = () => {
  let reservations = [];
  let randomRange = faker.random.number({'min': 5, 'max': 10});
  for(var i = 0; i <randomRange; i++) {
  let reservationObj = {
    "year": faker.random.number({'min': 1997, 'max': 2020}),
    "month" : faker.random.number({'min': 1, 'max': 12}),
    "dayStart" : faker.random.number({'min': 1, 'max': 17}),
    "dayEnd"  : faker.random.number({'min': 18, 'max': 31}),
    "adults" :faker.random.number({'min': 1, 'max': 3}),
    "children" : faker.random.number({'min': 1, 'max': 2}),
    "infants" : faker.random.number({'min': 1, 'max': 10}),
  }
  reservations.push(reservationObj);
  }
  return reservations;
}

// make an array of objects to populate database for testing

// Run this function to populate the database with random dates
const populate = (callback) => {

  const reservations = makeRandomListings();

  db.saveMany(reservations, (err, data) => {
    if (err) { callback(err); } else {
      callback(null, data);
    }
  });
};

populate((err, data)=>{
 if(err) {
   console.log('error didnt populate')
 } else {
  console.log('populated');
}
})

module.exports = { populate };
