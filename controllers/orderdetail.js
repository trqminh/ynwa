var models = require("../models");
var orderDetailModel = models.OrderDetail;

var controller = {};

controller.getAll = (callback) => {
  orderDetailModel
    .findAll()
    .then((orderDetails)=>{
      callback(orderDetails);
    });
};

controller.getByStadiumId = function(StadiumId, callback) {
  orderDetailModel
    .findAll({
      where: { StadiumId: StadiumId }
    })
    .then(function(orderDetail) {
      callback(orderDetail);
    });
};
controller.getByOrderId = function(OrderId, callback) {
  orderDetailModel
    .findAll({ where: { OrderId: OrderId }, include: [models.Stadium] })
    .then(orderDetail => {
      callback(orderDetail);
    });
};
module.exports = controller;
