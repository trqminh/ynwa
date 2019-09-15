var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});

var orderDetailController = require('../controllers/orderdetail')

router.get('/:id', (req, res) => {
    var stadiumId = req.params.id;

    orderDetailController.getByStadiumId(stadiumId, (orderDetail) => {

        var today = new Date();
        today = today.toString().slice(0,15);
        
        var data = [];
        for (var i = 0; i < orderDetail.length; i++) {
            if (today == orderDetail[i].Date.toString().slice(0,15)) {
                data.push(orderDetail[i]);
            }
        }
        
        res.json(data);
    });


});

router.post('/:id/product', urlencodedParser, (req, res) => {
    var stadiumId = req.params.id;
    //console.log(req.body);

    orderDetailController.getByStadiumId(stadiumId, (orderDetail) => {

        var chosenDay = req.body['date'];
        
        var data = [];
        for (var i = 0; i < orderDetail.length; i++) {
            if (chosenDay == orderDetail[i].Date.toString().slice(0,15)) {
                data.push(orderDetail[i]);
            }
        }
        
        res.json(data);
    });


});

module.exports = router;