const { Pool, Client } = require('pg')
const client = new Client({
  user: 'postgres',
  host: 'ec2-54-193-22-9.us-west-1.compute.amazonaws.com',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
})
client.connect();

const getDays = (data, callBack) => {
client.query(`select * from reservation where listingId < 280 and month = ${data.month} and year = ${data.year};`, (err, data) => {
  if(err) {
    console.log('error getting days from database', err);
    callBack(err);
  } else {
    console.log('data from database recieved')
    callBack(null, data);
  }
})
};

const getReservations = (data, callBack) => {
client.query(`select * from reservation inner join listing on reservation.listingId = listing.listingId where listing.listingId = ${data.id};`, (err, data) => {
  if(err) {
    console.log('error getting reservation')
    callBack(err)
  } else {
    callBack(null, data);
  }
});
}
var reservationId = Math.floor(Math.random() * 2000 + 100000002);
var listingId = Math.floor(Math.random() * 15 + 9980910);
const sendReservation = (data, params, callBack) => {
  client.query(`insert into reservation(reservationId, dayStart, dayEnd, year, month, adults, children, infants, listingId) values (${reservationId},${data.dayStart},${data.dayEnd},${data.year},${data.month},${data.adults}, ${data.children},${data.infants}, ${params.listingId})`, (err, data) => {
    if(err) {
      console.log('error querying');
      callBack(err);
    } else {
      reservationId++;
      console.log('inserted!');
      callBack(null, data);
    }
  });
}

const updateReservation = (data, params, callBack) => {
  client.query(`update reservation SET dayStart = ${data.dayStart}, dayEnd = ${data.dayEnd},  year = ${data.year},  month = ${data.month},  adults = ${data.adults},  children = ${data.children},  infants = ${data.infants} WHERE reservationId = ${params.reservationId}`,(err, data) => {
    if(err) {
      console.log('error updating reservation');
      callBack(err);
    } else {
      callBack(null, data);
    }
  })
};

const updateListing = (data, params, callBack) => {
  client.query(`update listing SET address = '${data.address}', room = '${data.rooms}' WHERE listingId = ${params.listingId}`, (err, data) => {
    if(err) {
      console.log('error updating listing');
      callBack(err);
    } else {
      console.log('updated listing!')
      callBack(null, data);
    }
  })
};
const deleteReservation = (data, callBack) => {
  client.query(`delete from reservation where reservationId = ${data.reservationId}`, (err,data) => {
    if(err) {
      console.log('error deleting reservation', err);
      callBack(err);
    } else {
      console.log('deleted reservation from DB');
      callBack(null, data);
    }
  })
}
const deleteListing = (data, callBack) => {
  client.query(`delete from reservation where listingid in (select listingId from listing where listingId = ${data.listingId})`, (err,data) => {
    if(err) {
      console.log('error deleting reservation', err);
      callBack(err);
    } else {
      console.log('deleted listing from DB');
      callBack(null, data);
    }
  })
}


module.exports = {
  getReservations,
  getDays,
  sendReservation,
  updateReservation,
  updateListing,
  deleteReservation,
  deleteListing
}
