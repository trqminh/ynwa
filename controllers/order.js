var controller = {};
var models = require("../models");

controller.saveOrder = (cart, user, callback) => {
  var order = {
    totalPrice: cart.getInfoAndTotalPrice().totalPrice,
    totalQuantity: cart.getInfoAndTotalPrice().totalQuantity,
    paymentMethod: cart.paymentMethod,
    status: "Booked",
    UserId: user.id
  };

  models.Order.create(order).then(newOrder => {
    var items = cart.getInfoAndTotalPrice().infoList;
    items.forEach(item => {
      var orderDetail = item.orderDetail;
      orderDetail.OrderId = newOrder.id;

      models.OrderDetail.create(orderDetail);
    });

    cart.empty();
    callback();
  });
};
controller.getById = function(id, callback) {
  models.Order.findAll({
    where: { UserId: id }
  }).then(function(place) {
    callback(place);
  });
};
controller.deleteById = function(id, callback) {
  models.Order.destroy({ where: { id: id } }).then(() => {
    callback();
  });
};
module.exports = controller;
