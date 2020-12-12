const chai = require('chai');
const {performance} = require('perf_hooks');
const mongoDB = require('../../database/index.js');
const postgresDB = require('../../database/postgres.js');
const faker = require('faker');
var expect = require('chai').expect;

//2nd query for MongoDB
var id = faker.random.number({'min': 1, 'max': 10000000})
var newObj = {"id": id}
var time1Mongo = performance.now();
mongoDB.getReservations(newObj,(err, data) => {
  if(err) {
    console.log('error return reservations', err);
  } else {
    console.log('reservations got from MongoDB', data);
  }
})
var time2Mongo = performance.now();
    describe('testing query for all reservations in a listing MONGODB', function() {
        it('should return all the reservations in a specific listing under 50ms', function() {
            expect(time2Mongo - time1Mongo).to.be.lt(.5);
        });
    });
console.log('get reservations query for mongodb done in',time2Mongo - time1Mongo, 'seconds');