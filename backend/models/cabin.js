var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var cabin =  new Schema({

 cabin : String,
 startTime : String,
 endTime : String
});



module.exports = mongoose.model('cabin', cabin); 