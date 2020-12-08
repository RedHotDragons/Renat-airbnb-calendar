const { Pool, Client } = require('pg')
const client = new Client({
  user: 'renatnorderhaug',
  host: 'localhost',
  database: 'calendar',
  password: 'rootpass',
  port: 5432,
})
client.connect();

const getReservations = (data, callBack) => {
client.query(`select reservationId from reservation inner join listing on reservation.listingId = listing.listingId where listing.listingId = ${data.id};`, (err, data) => {
  if(err) {
    callBack(err)
  } else {
    callBack(null, data);
  }
});
}


module.exports = {
  getReservations

}
