const express = require('express');
const app = express();
const path = require('path');

const models = require('./models.js');

// middleware
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// get all dates from database
app.get('/reservations', (req,res)=>{
  console.log('getting reservations');
  models.getAll((err, data) => {
    if (err) {res.sendStatus(500)} else {
      res.send(data);
    }
  });
});

// send a post request to /seed to seed the database with random data
app.post('/seed', (req, res) => {
  console.log('posting seed');
  models.seed((err) => {
  if (err) {res.sendStatus(500)} else {
    res.sendStatus(200);
  }
  });
});

// start server
const port = 3000;
app.listen(port, () => {
  console.log ('Listening on port', port, '...');
});