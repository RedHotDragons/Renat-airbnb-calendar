const express = require('express');
const app = express();
const path = require('path');
const mongoDb = require('../database/index.js');
const postgresDb = require('../database/postgres.js');
const newrelic = require('newrelic');
const fs = require('fs');



// middleware
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// to keep original services functionality
app.get('/api/calendar/reservations/:month/:year', (req,res) => {
postgresDb.getDays(req.params, (err, data) => {
  if(err) {
    console.log('error getting days');
  } else {
    res.send(data);
  }
});
});

// get dates from database with the given listingId
app.get('/api/calendar/listings/:id', (req, res) => {
postgresDb.getReservations(req.params, (err, data)=>{
    if (err) {
      console.log('error getting some', err);
      res.sendStatus(501);
    } else {
      res.send(data);
    }
  });
});

app.post('/listings/:listingId/reservation',(req,res) => {
// LOOK INTO CODE HERE WHY IS POST REQUEST TAKING SO LONG
    postgresDb.sendReservation(req.body, req.params, (err,data) => {
      if(err) {
        console.log('error sending reservation to DB', err);
      } else {
        res.sendStatus(200);
      }
    })
  });

// update operation to the database
app.patch('/reservations/update/reservation/:reservationId',(req,res) => {
  postgresDb.updateReservation(req.body,req.params,(err, data) => {
    if(err) {
      console.log('error here', err);
    } else {
      console.log('DB updated reservation');
      res.send(data);
    }
  })
});

app.patch('/listings/update/:listingId',(req,res) => {
  postgresDb.updateListing(req.body,req.params,(err, data) => {
    if(err) {
      console.log('error here', err);
    } else {
      console.log('DB Listing updated');
    }
  })
});
// delete operation to the database, which is crud
app.delete('/reservations/delete/:reservationId', (req, res) => {
  postgresDb.deleteReservation(req.params,(err,data) => {
    if(err) {
      console.log('error deleting reservation', err);
    } else {
      console.log('reservation was deleted');
    }
  })
});

app.delete('/listings/delete/:listingId', (req, res) => {
  postgresDb.deleteListing(req.params, (err, data) => {
    if(err) {
      console.log('error deleting listing', err);
    } else {
      console.log('Listing was deleted');
    }
  })
})



// start server
const port = 3002;
app.listen(port, () => {
  console.log ('Listening on port', port, '...');
});