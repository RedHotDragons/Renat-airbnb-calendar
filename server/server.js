const express = require('express');
const app = express();
const path = require('path');

// middleware
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// start server
const port = 3000;
app.listen(port, ()=>{
  console.log('Listening on port', port, '...');
});