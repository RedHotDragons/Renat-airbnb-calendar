// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/calendar', {useNewUrlParser: true}, {useUnifiedTopology: true});

// // Schema
// const reservationSchema = new mongoose.Schema({
//   reservationId: {type: Number},
//   year: { type: Number },
//   month: { type: Number },
//   dayStart: { type: Number },
//   dayEnd: { type: Number },
//   adults: {type: Number},
//   children: {type: Number},
//   infants: {type: Number},
//   listingId: {type: Number},
//   address: {type: String},
//   room: {type: String, enum : ["entire place", "private room", "shared room"] },
// });

// // Model
// // const dateModel = mongoose.model('datemodels', dateSchema);
// const reservationModel = mongoose.model('reservationmodels', reservationSchema);

// // listingSchema.find({reservations})

// // Given an array of objects, save all objects to database
// const saveMany = (reservation, callBack) => {

//   mongoose.connection.dropCollection('reservationmodels', (err) => {
//     if(err) {
//       console.log('error dropping reservationmodels');
//     }
//   })

//   reservationModel.create(reservation).then((data) => {
//     callBack(null, data)
//   })
//   .catch((error) => {
//     callBack(error);
//   })
// }

// const getAll = (callback) => {
//   reservationModel.find((err, data) => {
//     if (err) {callback(err)} else {callback(null, data);}
//   });
// }

// const getSome = (params, callback) => {
//   reservationModel.find( {month: Number(params.month), year: Number(params.year), reservationId: 9875812}, (err, data) => {
//     if (err) {
//     console.log('error getting', err);
//       callback(err)
//     } else {
//       callback(null, data);
//     }
//   });
// }

// const getReservations = (data,callback) => {
//  reservationModel.find({'listingId': data.id}, {'reservationId': 1}, function (err, data) {
//     if (err) {
//     console.log('error', err);
//     }else {
//       console.log('DATA FOR RESERVATIONS', data);
//     }
//   });
//   // ListingModel.findOne({'listingId': 9587089}, {reservations: 1});
// };

// const addReservation = (data, callback) => {
//   reservationModel.create()

// }

// // Post request

// const newEntry = (params, callback) => {
//   dateModel.create({year : Number(params.year), month: Number(params.month), day: 4}).then((data) => {
//     callback(null,data);
//   }).catch((err) => {
//     callback(err);
//   })
// }

// // patch request

// const updateEntry = (callBack) => {
//   dateModel.updateOne({year: 1997}, {day: 18}).then((data) => {
//     callBack(null, data);
//   }).catch((err) => {
//     callBack(err);
//   })
// }

// const deleteEntry = (callBack) => {
//   dateModel.deleteOne({year: 1997, day: 18}).then((data) => {
//     callBack(null, data);
//   }).catch((err) => {
//     callBack(err);
//   })
// }

// module.exports = {
//   saveMany,
//   getAll,
//   getSome,
//   getReservations,
//   newEntry,
//   updateEntry,
//   deleteEntry
// };