// To write to a CSV file
const fs = require('fs');
const faker = require('faker');
const db = require('./postgres.js');



const makeRandomListings = () => {
  let listings = [];
  for(var i = 0; i < 1000; i++) {
  let listing = {};
  listing.listingId = 0;
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


const writeListings = fs.createWriteStream('../listings.csv')
writeListings.write('listingId,address,room\n', 'utf8');

function writeTenMillionListings(writer, encoding, callback) {
  let i = 10000000;
  var listingId = 1;
  function write() {
    let ok = true;
    do {
      i -= 1;
      const address = faker.address.streetAddress();
      const room = faker.random.arrayElement(["entire place", "private room", "shared room"]);
      const data = `${listingId},${address},${room}\n`;
      if (i === 0) {
        listingId += 1;
        writer.write(data, encoding, callback);
      } else {
// see if we should continue, or wait
// don't pass the callback, because we're not done yet.
        listingId += 1;
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
// had to stop early!
// write some more once it drains
      writer.once('drain', write);
    }
  }
write()
}

writeTenMillionListings(writeListings, 'utf-8', (err, data) => {
  if(err) {
    console.log('error writing')
  } else {
    console.log('wrote to file listings');
  }
});


const writeReservations= fs.createWriteStream('../reservations.csv')
writeReservations.write('reservationId,dayStart,dayEnd,year,month, adults, children, infants,listingId\n', 'utf8');

function writeTenMillionReservations(writer, encoding, callback) {
  let i = 30000000;
  var listingId = 1;
  var reservationId = 1;
  function write() {
    let ok = true;
    do {
      i -= 1;
        let year = faker.random.number({'min': 1997, 'max': 2020});
        let month = faker.random.number({'min': 1, 'max': 12});
        let dayStart = faker.random.number({'min': 1, 'max': 17});
        let dayEnd = faker.random.number({'min': 18, 'max': 31});
        let adults = faker.random.number({'min': 1, 'max': 3});
        let children = faker.random.number({'min': 1, 'max': 2});
        let infants = faker.random.number({'min': 1, 'max': 10});
      const data = `${reservationId},${dayStart},${dayEnd},${year},${month},${adults},${children},${infants},${listingId}\n`;
      if (i === 0) {
        if(listingId !== 10000000) {
        listingId += 1;
        } else {
         listingId = 1;
        }
        reservationId += 1;
        writer.write(data, encoding, callback);
      } else {
// see if we should continue, or wait
// don't pass the callback, because we're not done yet.
        if(listingId !== 10000000) {
        listingId += 1;
        } else {
          listingId = 1;
        }
        reservationId += 1;
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
// had to stop early!
// write some more once it drains
      writer.once('drain', write);
    }
  }
write()
}

writeTenMillionReservations(writeReservations, 'utf-8', (err, data) => {
  if(err) {
    console.log('error writing')
  } else {
    console.log('wrote to file reservations');
  }
})



