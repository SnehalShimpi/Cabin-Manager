var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var booking =  new Schema({

 name : String,
 firstname : String,
 purpose : String,
 date : String,
 startTime : String,
 endTime : String,
 
});



module.exports = mongoose.model('booking', booking); 