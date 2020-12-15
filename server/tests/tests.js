const chai = require('chai');
const {performance} = require('perf_hooks');
const mongoDB = require('../../database/index.js');
const postgresDB = require('../../database/postgres.js');
const faker = require('faker');
var expect = require('chai').expect;

// 1st query for Postgres
var id = faker.random.number({'min': 1, 'max': 10000000})
var newObj = {"id": id}
var time1Postgres = performance.now();
postgresDB.getReservations(newObj,(err, data) => {
  if(err) {
    console.log('error return reservations', err);
  } else {
    console.log('reservations got from PostgresDB');
  }
})
var time2Postgres = performance.now();
    describe('testing query for all reservations in a listing POSTGRESDB', function() {
        it('should return all the reservations in a specific listing under 50ms', function() {
            expect(time2Postgres - time1Postgres).to.be.lt(.5);
        });
    });
console.log('get reservations query for postgresdb done in', time2Postgres - time1Postgres, 'seconds');



