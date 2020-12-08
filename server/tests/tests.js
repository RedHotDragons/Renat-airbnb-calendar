const chai = require('chai');
const {performance} = require('perf_hooks');
const mongoDB = require('../../database/index.js');
const postgresDB = require('../../database/postgres.js');
var expect = require('chai').expect;

// 1st query for Postgres
var newObj = {"id": 9875999}
var a = performance.now();
postgresDB.getReservations(newObj,(err, data) => {
  if(err) {
    console.log('error return reservations', err);
  } else {
    console.log('reservations got from PostgresDB');
  }
})
var b = performance.now();
    describe('testing query for all reservations in a listing POSTGRESDB', function() {
        it('should return all the reservations in a specific listing under 50ms', function() {
            expect(b - a).to.be.lt(.5);
        });
    });
console.log('get reservations query for postgresdb done in', b- a, 'milliseconds');

//2nd query for MongoDB
var a = performance.now();
postgresDB.getReservations(newObj,(err, data) => {
  if(err) {
    console.log('error return reservations', err);
  } else {
    console.log('reservations got from PostgresDB');
  }
})
var b = performance.now();
    describe('testing query for all reservations in a listing POSTGRESDB', function() {
        it('should return all the reservations in a specific listing under 50ms', function() {
            expect(b - a).to.be.lt(.5);
        });
    });
console.log('get reservations query for postgresdb done in', b- a, 'milliseconds');

