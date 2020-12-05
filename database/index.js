const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/calendar', {useNewUrlParser: true}, {useUnifiedTopology: true});

// Schema

// contains is an array of strings specifying all the months
// that are in this reservation
// ex. ["92020", "102020"] means that month 9 of 2020 and month 10 of 2020
//     have days that will be reserved

const listingSchema = mongoose.Schema({
  address: {type: String},
  reservations: [{
  year: { type: Number },
  month: { type: Number },
  dayStart: { type: Number },
  dayEnd: { type: Number },
  adults: {type: Number},
  children: {type: Number},
  infants: {type: Number},
  }],
  room: {type: String, enum : ["entire place", "private room", "shared room"] }
});

// var query = listingModel.find({})

// query.select('reservations')

/* query.exec(function (err, reservation) {
  if (err) {
    return handleError(err);
  }
  else {
    res.send(reservation.dayStart, reservation.dayEnd)
  }
  console.log('%s %s is a %s.', reservation.name.first, person.name.last,
    person.occupation);
});

*/

// Model
// const dateModel = mongoose.model('datemodels', dateSchema);
const listingModel = mongoose.model('listingmodels', listingSchema);

// listingSchema.find({reservations})

// Given an array of objects, save all objects to database
const saveMany = (listing, callBack) => {

  mongoose.connection.dropCollection('listingModel', (err) => {
    if(err) {
      console.log('error dropping listingModel');
    }
  })

  listingModel.create(listing).then((data) => {
    callBack(null, data)
  })
  .catch((error) => {
    callBack(error);
  })
}

const getAll = (callback) => {
  dateModel.find((err, data) => {
    if (err) {callback(err)} else {callback(null, data);}
  });
}

const getSome = (params, callback) => {
  dateModel.find( {month: Number(params.month), year: Number(params.year)}, (err, data) => {
    if (err) {callback(err)} else {callback(null, data);}
  });
}

const getMonthOne = (callback) => {
  dateModel.find({month: 1}, (err, data) => {
    if(err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

// Post request

const newEntry = (params, callback) => {
  dateModel.create({year : Number(params.year), month: Number(params.month), day: 4}).then((data) => {
    callback(null,data);
  }).catch((err) => {
    callback(err);
  })
}

// patch request

const updateEntry = (callBack) => {
  dateModel.updateOne({year: 1997}, {day: 18}).then((data) => {
    callBack(null, data);
  }).catch((err) => {
    callBack(err);
  })
}

const deleteEntry = (callBack) => {
  dateModel.deleteOne({year: 1997, day: 18}).then((data) => {
    callBack(null, data);
  }).catch((err) => {
    callBack(err);
  })
}

module.exports = {
  saveMany,
  getAll,
  getSome,
  getMonthOne,
  newEntry,
  updateEntry,
  deleteEntry
};