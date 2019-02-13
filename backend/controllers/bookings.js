var bookingModel = require('../models/booking');
var userModel = require('../models/user');
jwt1 = require('jsonwebtoken');
var config = require('../config/config');
var jwt = require('jwt-simple');
var moment = require('moment');
var nodemailer = require('nodemailer');
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
                console.log(decode.email)
                res.status(200).json({ status: 'success', message: 'Data set', docs : 'email' });
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
        booking.date = moment(req.body.date).format('D-MMM-YYYY');
        booking.startTime = req.body.startTime;
        booking.endTime = req.body.endTime;
        booking.firstname = this.firstname;
        bookingModel.find(
            {
                $and: [
                    { 'name': req.body.name },
                    { 'date': moment(req.body.date).format('D-MMM-YYYY') }
                ]
            },
            function (err, docs) {
                console.log(docs)

                if (docs.length < 1) {
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
                        else if( req.body.startTime === docs[i].startTime &&  
                                 req.body.endTime <= docs[i].endTime ){
                                    flag = 1;
                                    console.log("inside third if");
                                     break;
                
                                    }


                        else if (req.body.startTime >= docs[i].startTime &&
                                 req.body.startTime <= docs[i].endTime &&
                                 req.body.endTime >= docs[i].endTime) {
                            flag = 1;
                            console.log("inside second if");
                            break;
                        }
                        else {
                            flag = 0;
                            console.log("gjfnfn");
                            break;
                        }
                       
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
            doc.date = moment(req.body.date).format('D-MMM-YYYY');
            doc.startTime = req.body.startTime;
            doc.endTime = req.body.endTime


            //saving the doc in db
            // doc.save(function (err) {

            //     if (err) {
            //         res.status(500).json({ status: 'error', message: 'Datebase Error:' + err, docs: '' });
            //     }
            //     else {
            //         res.status(200).json({ status: true, message: 'user:Added to Mongo successfully', doc: '' });
            //     }

            // });

            bookingModel.find(
                {
                    $and: [
                        { 'name': req.body.name },
                        { 'date': moment(req.body.date).format('D-MMM-YYYY') }
                    ]
                },
                function (err, docs) {
                    console.log(docs)
    
                    if (docs.length < 1) {
                        flag = 0;
                    }
                    else {
                        console.log("inside else")
                        console.log(docs.length)
                        for (i = 0; i < docs.length; i++) {
                            console.log(req.params.id);
                            console.log(docs[i]._id);
                             if(docs[i]._id == req.params.id)
                             {
                                 flag = 0 ;
                                 console.log("insise same id")
                                 break;
                                 
                             }
                            // this if for extact same value
    
                            else if (req.body.startTime === docs[i].startTime &&
                                req.body.endTime === docs[i].endTime) {
                                console.log("inside first if")
                                flag = 1;
                                break;
                            }
    
    
                            else if (req.body.startTime >= docs[i].startTime &&
                                     req.body.startTime <= docs[i].endTime &&
                                     req.body.endTime >= docs[i].endTime) {
                                flag = 1;
                                console.log("inside second if");
                                break;
                            }
                            else{
                                flag = 0;
                                console.log("gjfnfn");
                                break;
                            }
                           
                        }
                    }
                    if(flag == 1){
                        res.status(200).json({ status: false , message: 'already book' , docs: '' });
                    }
    
                    if (flag == 0) {
                        console.log("saved");
                        doc.save(function (err) {
                            if (err) {
                                res.status(400).json({ status: false , message: 'Datebase Error:' + err, docs: '' });
                            }
                            else {
                                this.path = null;
                                res.status(200).json({ status: true, message: 'booking booked successfully', doc: '' });
    
                            }
    
                        });
                    }
                }

        );
            })
    
},
mail: function (req, res) {
    var flag = null;
    var user = new userModel()
    var token = req.body.token || req.headers['token'];
    var decode = jwt.decode(token, config.secretKey);
    
    console.log(token)
               var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'snehalshimpi11@gmail.com',
                    pass: 'laxman@11'
                }
            });

            var mailOptions = {
                
                from: "snehalshimpi11@gmail.com",
                to: decode.email,
           
                subject: 'Sending Email For booking',
                text: "you have booked cabin successfully"
            };
           
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    res.status(200).json({ status: false, message: 'error', docs: { Error: false } });

                }
                else {
                    console.log('Email sent: ');
                   console.log(decode.email);
                    res.status(200).json({ status: true, message: 'succes', docs: { success: true } });


                }
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
    },

}
module.exports = bookings;


