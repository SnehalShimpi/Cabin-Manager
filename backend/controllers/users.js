var userModel = require('../models/user');
var jwt = require('jwt-simple');
jwt1 = require('jsonwebtoken');
var config = require('../config/config');


var users = {

    /* All data of database */

    getAll: function (req, res) {
        console.log('inside the GetAll');
        userModel.find(function (err, docs) {
            if (err) {
                res.status(500).json({ status: 'error', message: 'Datebase Error:' + err, docs: '' });
            }
            else {
                res.status(200).json({ status: 'success', message: 'Success', docs: docs });


            }
        });
    },

   
    /* create new user */

    create: function (req, res) {
       
        var user = new userModel();
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.email = req.body.email;
        user.password = req.body.password;
       



        /* unique mail and unique email */

        userModel.find(function (err, docs) {
              var flag = null;
            if (err) {
                res.status(500).json({ status: 'error', message: 'Datebase Error:' + err, docs: '' });
            }
            else {

                for (i = 0; i < docs.length; i++) {
                    if (user.email === docs[i].email) {
                        console.log(docs[i]);
                        flag = 1;
                        break;
                    }
                    

                    else {
                        flag = 0;
                    }

                }
                //console.log(docs[0].username);
            }

            if (flag == 1) {

                console.log("already in use");
                res.status(200).json({ status: 1, err: " Email should be unique" });

            }
           
            else {
                console.log("unique");
                user.save(function (err) {
                    if (err) {
                        res.status(400).json({ status: 'error', message: 'Datebase Error:' + err, docs: '' });
                    }
                    else {
                        this.path = null;
                        res.status(200).json({ status: 123 , message: 'Added to Mongo successfully', doc: '' });
                    }

                });
            }
        });
    },

    /* User Login  */
    login: function (req, res) {

        userModel.findOne(
            {
                $and: [
                    { 'email': req.body.email},
                    { 'password': req.body.password }
                ]
            },
            function (err, user) {
                console.log(req.body.email)
                console.log(req.body.password)
                console.log("************");
                console.log(user);

                if (err || !user) {
                    res.status(200).json({ status: false, message: 'Authentication Error:', docs: '' });
                }
                else {
                    var payload = { email: user.email };
                    var token = jwt.encode(payload, config.secretKey);
                    jwt1.sign({
                        data: payload
                    }, 'secret', { expiresIn: '1h' });
                    res.status(200).json({ status: true, message: ' successfull', token: token });
                }

            });





    },
  
    
    
  
                










}
module.exports = users;
