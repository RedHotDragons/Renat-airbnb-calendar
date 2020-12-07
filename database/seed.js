const mongoose = require('mongoose');
const faker = require('faker');
const db = require('./index.js');
const fs = require('fs');
const jsonData = require('../listings.json');

const makeRandomListings = () => {
  let listings = [];
  for(var i = 0; i < 1000; i++) {
  let listing = {};
  listing.address = faker.address.streetAddress();
  listing.reservations = makeRandomReservation();
  listing.room = faker.random.arrayElement(["entire place", "private room", "shared room"]);
  listings.push(listing);
  }
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

  const listings = makeRandomListings();
  // console.log('RESERVATIONS', reservations);
  // console.log('IS ARRAZY?', Array.isArray(reservations[0].reservations[0]));
  // console.log('THE OBJECT', reservations[0].reservations[0]);

  db.saveMany(listings, (err, data) => {
    if (err) { callback(err); } else {
      callback(null, data);
    }
  });
};

populate((err, data)=>{
 if(err) {
   console.log('error didnt populate')
 } else {
  console.log('populated data!');
}
});


// JSON

const writeFileListings = fs.createWriteStream('listings.json', { flags: 'r+', start: 1})

var writeTenMillionJsonListings = (writer, encoding, callBack) => {
    let i = 10000000;
    function write() {
        let ok = true;
        // var newArray = [];
        do {
        const address = faker.address.streetAddress();
        const reservations = makeRandomReservation();
        const room = faker.random.arrayElement(["entire place", "private room", "shared room"]);
        var newObj = {
          address: address,
          reservations: reservations,
          room: room
        }
        i--;
        // newArray.push(newObj);
        // console.log('NEW ARRAY WITH OBJ', newArray);
        var newJson = JSON.stringify(newObj) + ','
        if (i === 0) {
          writer.write(JSON.stringify(newObj) + ']', encoding, callBack);
        } else {
          // see if we should continue, or wait
          // don't pass the callback, because we're not done yet.
            ok = writer.write(newJson, encoding);
        }
        } while (i > 0 && ok);
          if (i > 0) {
        // had to stop early!
        // write some more once it drains
          writer.once('drain', write);
        }
    }
    write();
}

writeTenMillionJsonListings(writeFileListings, 'utf-8', () => {
  console.log('writing JSON listings!');
  writeFileListings.end();
});

// var dataToWrite = writeTenMillionJsonListings();




// fs.writeFile("listings.json", dataToWrite, (err,data) => {
//   if(err) {
//     console.log('error');
//   } else {
//     console.log('wrote to listings');
//   }
// });


writeTenMillionListings(writeListings, 'utf-8', () => {
  console.log('writing listings!');
  writeListings.end();
});




module.exports = { populate };
