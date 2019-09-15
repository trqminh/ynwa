var controller = {};

var models = require("../models");
var stadiumModel = models.Stadium;

// controller.getAll = function(callback){
//     Stadia
//     .findAll()
//     .then(function(places){
//         callback(places);
//     })
// };
controller.getById = function(id, callback) {
  stadiumModel
    .findOne({
      where: { id: id },
      include: [models.Place, models.StadiumType]
    })
    .then(function(stadium) {
      callback(stadium);
    });
};
controller.getByPlaceId = function(id, callback) {
  stadiumModel
    .findAll({
      where: { PlaceId: id },
      include: [models.Place, models.StadiumType]
    })
    .then(function(stadium) {
      callback(stadium);
    });
};

// controller.createRecord = function(
//   name,
//   streetname,
//   streetnumber,
//   city,
//   phone,
//   district,
//   callback
// ) {
//   Stadium.create({
//     name: name,
//     commonPrice: commonPrice,
//   }).then(callback);
// };
controller.updateById = (id, name, commonPrice, callback) => {
  stadiumModel
    .update(
      {
        name: name,
        commonPrice: commonPrice
      },
      { where: { id: id }, returning: true, plain: true }
    )
    .then(stadia => {
      callback(stadia);
    })
    .catch(err => {
      return err;
    });
};

controller.deleteById = (id, callback) => {
  stadiumModel
    .destroy({
      where: { id: id }
    })
    .then(callback);
};
module.exports = controller;
