var controller = {};
var Sequelize = require("sequelize");
var models = require("../models");
var Place = models.Place;
var Order = models.Order;
var StadiumType = models.StadiumType;
var OrderDetail = models.OrderDetail;
var Stadium = models.Stadium;
var Op = Sequelize.Op;
controller.getStatisticalDataType1 = function(
  place,
  type,
  startDay,
  endDay,
  callback
) {
  if (place == "Tất cả các sân") {
    startDay = new Date(
      startDay.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")
    );
    endDay = new Date(endDay.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
    Place.findAll().then(allPlace => {
      var arr_promise = [];
      for (let i = 0; i < allPlace.length; i++) {
        arr_promise.push(
          Place.findOne({ where: { name: allPlace[i].name } })
            .then(places => {
              return places.get();
            })
            .then(places => {
              let where = {
                PlaceId: places.id
              };
              if (type != "Tất cả các loại sân") {
                where["$StadiumType.name$"] = type;
              }
              return Stadium.findAll({
                include: [{ model: models.StadiumType, as: "StadiumType" }],
                where: where
              });
            })
            .then(stadia => {
              let orders = [];
              for (let i = 0; i < stadia.length; i++) {
                orders.push(
                  OrderDetail.findAll({
                    where: {
                      StadiumId: stadia[i].id,
                      createdAt: {
                        [Op.and]: [{ [Op.gt]: startDay }, { [Op.lt]: endDay }]
                      }
                    }
                  })
                );
              }
              let orderDetails = Promise.all(orders)
                .then(response => {
                  return response;
                })
                .catch(err => {
                  console.error(err);
                });
              return orderDetails;
            })
            .then(orderDetails => {
              let totalPrice = 0;
              let count = 0;
              for (let i = 0; i < orderDetails.length; i++) {
                for (let j = 0; j < orderDetails[i].length; j++) {
                  totalPrice += parseFloat(orderDetails[i][j].price);
                  count++;
                }
              }
              var data = {
                doanhThu: totalPrice.toFixed(2),
                daThanhToan: count,
                luotDat: count
              };
              return data;
            })
        );
      }
      Promise.all(arr_promise).then(response => {
        var doanhThu = 0,
          daThanhToan = 0,
          luotDat = 0;
        for (let i = 0; i < response.length; i++) {
          doanhThu += parseFloat(response[i].doanhThu);
          luotDat += parseInt(response[i].luotDat);
          daThanhToan += parseInt(response[i].daThanhToan);
        }
        var data = {
          doanhThu: doanhThu,
          daThanhToan: daThanhToan,
          luotDat: luotDat
        };
        callback(data);
      });
    });
  } else {
    var promise = Place.findOne({ where: { name: place } })
      .then(places => {
        return places;
      })
      .then(places => {
        let where = {
          PlaceId: places.id
        };
        if (type != "Tất cả các loại sân") {
          where["$StadiumType.name$"] = type;
        }
        return Stadium.findAll({
          include: [{ model: models.StadiumType, as: "StadiumType" }],
          where: where
        });
      })
      .then(stadia => {
        startDay = new Date(
          startDay.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")
        );
        endDay = new Date(
          endDay.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")
        );

        let orders = [];
        for (let i = 0; i < stadia.length; i++) {
          orders.push(
            OrderDetail.findAll({
              where: {
                StadiumId: stadia[i].id,
                createdAt: {
                  [Op.and]: [{ [Op.gt]: startDay }, { [Op.lt]: endDay }]
                }
              }
            })
          );
        }
        let orderDetails = Promise.all(orders)
          .then(response => {
            return response;
          })
          .catch(err => {
            console.error(err);
          });
        return orderDetails;
      })
      .then(orderDetails => {
        let totalPrice = 0;
        let count = 0;
        for (let i = 0; i < orderDetails.length; i++) {
          for (let j = 0; j < orderDetails[i].length; j++) {
            totalPrice += parseFloat(orderDetails[i][j].price);
            count++;
          }
        }
        var data = {
          doanhThu: totalPrice.toFixed(2),
          daThanhToan: count,
          luotDat: count
        };
        return data;
      });
    Promise.all([promise]).then(response => {
      callback(response[0]);
    });
  }
};

controller.getStatisticalDataType2 = function(startDay, endDay, callback) {
  startDay = new Date(startDay.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
  endDay = new Date(endDay.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
  var promise5 = OrderDetail.findAll({
    where: {
      createdAt: {
        [Op.and]: [{ [Op.gt]: startDay }, { [Op.lt]: endDay }]
      }
    }
  }).then(orders => {
    return Stadium.findAll({ where: { StadiumTypeId: 1 } }).then(stadia => {
      var money = 0;
      for (let i = 0; i < orders.length; i++) {
        for (let j = 0; j < stadia.length; j++) {
          if (orders[i].StadiumId == stadia[j].id) {
            money += parseFloat(orders[i].price);
          }
        }
      }
      return money;
    });
  });
  var promise7 = OrderDetail.findAll({
    where: {
      createdAt: {
        [Op.and]: [{ [Op.gt]: startDay }, { [Op.lt]: endDay }]
      }
    }
  }).then(orders => {
    return Stadium.findAll({ where: { StadiumTypeId: 2 } }).then(stadia => {
      var money = 0;
      for (let i = 0; i < orders.length; i++) {
        for (let j = 0; j < stadia.length; j++) {
          if (orders[i].StadiumId == stadia[j].id) {
            money += parseFloat(orders[i].price);
          }
        }
      }
      return money;
    });
  });
  var promise11 = OrderDetail.findAll({
    where: {
      createdAt: {
        [Op.and]: [{ [Op.gt]: startDay }, { [Op.lt]: endDay }]
      }
    }
  }).then(orders => {
    return Stadium.findAll({ where: { StadiumTypeId: 3 } }).then(stadia => {
      var money = 0;
      for (let i = 0; i < orders.length; i++) {
        for (let j = 0; j < stadia.length; j++) {
          if (orders[i].StadiumId == stadia[j].id) {
            money += parseFloat(orders[i].price);
          }
        }
      }
      return money;
    });
  });
  Promise.all([promise5, promise7, promise11]).then(response => {
    for (let i = 0; i < response.length; i++) {
      response[i] = response[i].toFixed(2);
    }
    callback(response);
  });
};


controller.getStatisticalDataType3 = function(startDay, endDay, callback) {
  startDay = new Date(startDay.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
  endDay = new Date(endDay.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
  OrderDetail.findAll({
    where: {
      createdAt: {
        [Op.and]: [{ [Op.gt]: startDay }, { [Op.lt]: endDay }]
      }
    }
  })
  .then(orders => {
    var data = [];
    for(let i = 0; i < orders.length; i++){
      var x = orders[i].updatedAt;
      var y = orders[i].price;
      data.push({x, y})
    }
    callback(data);
  })
};
module.exports = controller;
