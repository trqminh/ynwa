var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var userController = require('../controllers/user');

router.get('/', (req, res) => {
    var cart = req.session.cart;
    //cart.items.push(1);
    //console.log(cart);
    res.locals.items = cart.getInfoAndTotalPrice().infoList;
    res.locals.totalPrice = cart.getInfoAndTotalPrice().totalPrice;
    res.locals.totalQuantity = cart.getInfoAndTotalPrice().totalQuantity;
    res.render('cart');
});

var stadiumController = require('../controllers/stadium');
router.post('/', urlencodedParser, (req, res) => {
    var stadiumId = req.body.stadiumId; //req.body['stadiumId'];
    var intervalList = req.body.intervalList;
    var datePicked = req.body.datePicked;
    
    if (intervalList == undefined){
        intervalList = [];
    }

    if (typeof(intervalList) == 'string'){
        var tmp = parseInt(intervalList);
        intervalList = [tmp];
    }

    stadiumController.getById(stadiumId, (stadium) => {
        for (var i = 0; i < intervalList.length; i++) {
            req.session.cart.add(stadium, parseInt(intervalList[i]), datePicked);    
        }
        res.status(204);
        res.end();
    });
});

router.delete('/', urlencodedParser, (req, res) => {

    var stadiumId = req.body.stadiumId;
    var intervalId = req.body.intervalId;
    var datePicked = req.body.datePicked;

    //console.log(stadiumId, intervalId, datePicked);
    req.session.cart.remove(stadiumId, intervalId, datePicked);
    res.status(204);
    res.end();
});

router.get('/payment', userController.isLoggedIn, (req, res)=> {
    res.render('payment');
});

var orderController = require('../controllers/order');
router.post('/payment', userController.isLoggedIn, (req, res) => {

    orderController.saveOrder(req.session.cart, req.session.user, ()=>{
        res.status(204);
        res.redirect('/');
    });
});


module.exports = router;