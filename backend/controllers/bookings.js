var bookingModel = require('../models/booking');
var userModel = require('../models/user');
jwt1 = require('jsonwebtoken');
var config = require('../config/config');
var jwt = require('jwt-simple');
var moment = require('moment');
var firstname;
var bookings = {

    /* All data of database */

    getAll: function (req, res) {
        console.log('inside the GetAll');
        bookingModel.find(function (err, docs) {
            if (err) {
                res.status(500).json({ status: 'error', message: 'Datebase Error:' + err, docs: '' });
            }
            else {
                res.status(200).json({ status: 'success', message: 'Success', docs: docs });


            }
        });
    },

    firstname: function (req, res) {
        var token = req.body.token || req.headers['token'];
        var decode = jwt.decode(token, config.secretKey);
        userModel.findOne(
            {
                $and: [
                    { 'email': decode.email },
                ]
            },
            function (err, user) {
                this.firstname = user.firstname;
                res.status(200).json({ status: 'success', message: 'Data set', docs: '' });
                console.log("data set");
            }



        );

    },


    /* create new booking */


    create: function (req, res) {
        var flag;
        var booking = new bookingModel();
    
        booking.name = req.body.name;
        booking.purpose = req.body.purpose;
        booking.date = moment(req.body.date).format('ll');
        booking.startTime = req.body.startTime;
        booking.endTime = req.body.endTime;
        booking.firstname = this.firstname;
        bookingModel.find(
            {
                $and: [
                    { 'name': req.body.name },
                    { 'date': moment(req.body.date).format('ll') }
                ]
            },
            function (err, docs) {
                console.log(docs)

                if (docs == null) {
                    flag = 0;
                }
                else {
                    console.log("inside else")
                    console.log(docs.length)
                    for (i = 0; i < docs.length; i++) {

                        // this if for extact same value

                        if (req.body.startTime === docs[i].startTime &&
                            req.body.endTime === docs[i].endTime) {
                            console.log("inside first if")
                            flag = 1;
                            break;
                        }


                        else if (req.body.startTime >= docs[i].startTime &&
                                 req.body.startTime <= docs[i].endTime &&
                                 req.body.endTime >= docs[i].endTime) {
                            flag = 1;
                            console.log("inside third if");
                            break;
                        }
                        else {
                            flag = 0;
                        }
                        console.log("already exist");

                    }
                }

                if (flag == 0) {
                    console.log("saved");
                    booking.save(function (err) {
                        if (err) {
                            res.status(400).json({ status: 'error', message: 'Datebase Error:' + err, docs: '' });
                        }
                        else {
                            this.path = null;
                            res.status(200).json({ status: 123, message: 'booking booked successfully', doc: '' });

                        }

                    });
                }
                if (flag == 1) {
                    res.status(200).json({ status: 3, message: 'Datebase Error:' + err, docs: '' });
                }


            });

    },



    

    Delete: function (req, res) {

        bookingModel.remove({ _id: req.params.id }, function (err, user) {
            console.log(user);
            if (err) {
                res.status(500).json({ status: 'error', message: 'Datebase Error:' + err, docs: '' });
            }
            else {
                res.status(200).json({ status: true, message: 'user delete:Removed from Mongo successfully', doc: '' });
            }
        });
    },

    Update: function (req, res) {

        bookingModel.findById(req.params.id, function (err, doc) {
            if (err) {
                res.status(500).json({ status: 'error', message: 'Datebase Error:' + err, docs: '' });
            }
            doc.name = req.body.name;
            doc.purpose = req.body.purpose;
            doc.date = req.body.date;
            doc.startTime = req.body.startTime;
            doc.endTime = req.body.endTime


            //saving the doc in db
            doc.save(function (err) {

                if (err) {
                    res.status(500).json({ status: 'error', message: 'Datebase Error:' + err, docs: '' });
                }
                else {
                    res.status(200).json({ status: true, message: 'user:Added to Mongo successfully', doc: '' });
                }

            });

        });
    },

    getBookinById: function (req, res) {
        bookingModel.findById(req.params.id, function (err, doc) {
            if (err) {
                res.status(500).json({ status: 'error', message: 'Datebase Error:' + err, docs: '' });
            }
            console.log(doc);
            res.status(200).json({ status: 'success', message: "Data By id", doc: doc });

        })
    }














}
module.exports = bookings;


// this if for time should not be same

                    // else if (  req.body.date === docs[i].date &&
                    //            req.body.startTime >= docs[i].startTime && 
                    //            req.body.endTime <= docs[i].endTime &&
                    //            req.body.name === docs[i].name) {
                    //     flag = 2;
                    //     console.log("inside second if")
                    //     break;
                    // }

                    //this if for start time is but end time is more 

            //         else if( req.body.startTime === docs[i].startTime &&  
            //                  req.body.endTime >= docs[i].endTime &&
            //                  req.body.date === docs[i].date &&
            //                  req.body.name === docs[i].name){
            //                      flag = 3;
            //                      console.log("inside third if");
            //                      break;

            //         }

            //         // this if for start time is more and end time is same

            //         else if( req.body.startTime <= docs[i].startTime &&  
            //             req.body.endTime === docs[i].endTime &&
            //             req.body.date === docs[i].date &&
            //             req.body.name === docs[i].name){
            //                 flag = 3;
            //                 console.log("inside fourth if");
            //                 break;

            //    }