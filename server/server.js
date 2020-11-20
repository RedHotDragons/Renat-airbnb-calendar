const express = require('express');
const app = express();
const path = require('path');

const models = require('./models.js');

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


// start server
const port = 3002;
app.listen(port, () => {
  console.log ('Listening on port', port, '...');
});