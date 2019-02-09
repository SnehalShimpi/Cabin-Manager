var express = require('express');
var router = express.Router();
var users = require('./controllers/users.js');
var bookings = require('./controllers/bookings.js')
var userInfo = require('./controllers/UserInfo.js')


console.log(router);

router.get('/myapi/users/', users.getAll);
router.post('/myapi/user/',users.create);
router.post('/secure/booking/',bookings.create);
router.post('/secure/bookings',bookings.getAll);
 router.post('/myapi/login/',users.login);
 router.post('/secure/userInfo',userInfo.userInfo);
router.post('/secure/firstname',bookings.firstname);
router.delete('/secure/delete/:id',bookings.Delete);
router.put('/secure/update/:id',bookings.Update);
router.post('/secure/getUserByID/:id',bookings.getBookinById);



module.exports = router;