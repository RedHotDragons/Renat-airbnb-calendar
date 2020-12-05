const express = require('express');
const app = express();
const path = require('path');

const models = require('./models.js');
const db = require('../database/index.js');

// middleware
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());


// get all dates from database
app.get('/api/calendar/reservations', (req,res)=>{
  models.getAll((err, data) => {
    if (err) {res.sendStatus(500)} else {
      res.send(data);
    }
  });
});

// get dates from database with the given month and year
app.get('/api/calendar/reservations/:month/:year', (req, res) => {
  models.getSome(req.params, (err, data)=>{
    if (err) {
      console.log('error getting some', err);
      res.sendStatus(501);
    } else {
      res.send(data);
    }
  });
});

// READ operation
// get all dates from the database that correspond to the first month
app.get('/api/calendar/reservations/firstmonth', (req, res) => {
  models.getMonthOne((err, data) => {
    if(err) {
      console.error('error getting first month');
      res.sendStatus(501);
    } else {
      console.log('data has been retrieved', data);
      res.send(data);
    }
  });
});

// CREATE operation
// post date to the database that correspond to the first month
app.post('/api/calendar/reservations/:month/:year',(req, res) => {
  console.log('req params', req.params.month);
  console.log('req params2', req.params.year);
  db.newEntry(req.params, (err, data) => {
     if(err) {
       console.log('error at POST request is', err);
       res.sendStatus(504);
     } else {
       console.log('stored in db')
       res.send(data)
     }
  });
});

// update operation to the database
app.patch('/api/calendar/reservations/update',(req,res) => {
  db.updateEntry((err, data) => {
    if(err) {
      console.log('error here', err);
    } else {
      console.log('DB updated');
      res.send(data);
    }
  })
});

// delete operation to the database, which is crud
app.delete('/api/calendar/reservations/delete', (req, res) => {
  db.deleteEntry((err,data) => {
    if(err) {
      console.log('error here', err);
    } else {
      console.log('entry was deleted');
      res.send(data);
    }
  })
})



// start server
const port = 3002;
app.listen(port, () => {
  console.log ('Listening on port', port, '...');
});