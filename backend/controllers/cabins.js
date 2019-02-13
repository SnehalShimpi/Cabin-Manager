var cabinModel = require('../models/cabin');
var moment = require('moment');
var cabins = {
    show: function (req, res) {
        res.status(200).json({ status: 'success', message: 'Success' });
    },

    getAll: function (req, res) {
        console.log('inside the GetAll');
        cabinModel.find(function (err, docs) {
            if (err) {
                res.status(500).json({ status: 'error', message: 'Datebase Error:' + err, docs: '' });
            }
            else {
                res.status(200).json({ status: 'success', message: 'Success', docs: docs });
            }
        });
    },
       create: function (req, res) {
        var cabin = new cabinModel();
        cabin.cabin = req.body.cabin;
        cabin.startTime = req.body.startTime;
        cabin.endTime = req.body.endTime;
       

        


        cabin.save(function (err) {
            if (err) {
                res.status(500).json({ status: 'error', message: 'Datebase Error:' + err, docs: '' });
            }
            else {
                res.status(200).json({ status: 'success', message: 'Added to Mongo successfully', doc: '' });
            }

        });

       
    },
    find: function (req,res){
        cabinModel.find(
            {
                $and: [
                    { 'cabin': req.body.cabin },
                
                ]
            },
            function (err, docs) {
                  console.log(docs)
                   // var currentTime = req.body.startTime;
                    var sTime = docs[0].startTime;
                    var eTime = docs[0].endTime;
                    if( moment(req.body.startTime, 'hh:mm').isBetween( moment(sTime , 'hh:mm'), moment(eTime,'hh:mm'))){
                       this.flag = true;
                       
                    }
                    else if(moment(req.body.startTime, 'hh:mm').isSame( moment(sTime , 'hh:mm'), moment(eTime,'hh:mm'))){
                        this.flag=true;

                    }
                   

                    else{
                        this.flag = false;
                    }
                    // this.flag = moment(req.body.startTime, 'hh:mm').isBetween( moment(sTime , 'hh:mm'), moment(eTime,'hh:mm'));
                    // this.flag = moment(req.body.startTime, 'hh:mm').isSame( moment(sTime , 'hh:mm'), moment(eTime,'hh:mm'))
                  
                    //console.log(sTime +"  " + eTime + "   "+ req.body.startTime);
                    //this.flag = true;
                    console.log(this.flag);
                   
                
                
           console.log(docs)
           if(this.flag == true){
            res.status(200).json({ status: true, message: 'it is reserved', doc: this.flag});
           }
           else
           {
            res.status(200).json({ status: false , message: 'it is not reserved', doc: this.flag});
           }

           
           


            });

    },




    
}
module.exports = cabins;
