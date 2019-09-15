var controller = {};
var Sequelize = require("sequelize");
var models = require("../models");
var Places = models.Place;

controller.createRecord = function(
  name,
  streetname,
  streetnumber,
  city,
  phone,
  district,
  callback
) {
  Places.create({
    name: name,
    streetname: streetname,
    streetnumber: streetnumber,
    city: city,
    phone: phone,
    district: district,
    imagepath: "../assets/img/place1.jpg"
  }).then(callback);
};

controller.getAll = function(callback) {
  Places.findAll().then(function(places) {
    callback(places);
  });
};

controller.getById = function(id, callback) {
  Places.findOne({
    where: { id: id },
    include: [models.Stadium]
  }).then(function(place) {
    callback(place);
  });
};

controller.updateById = (
  id,
  name,
  streetname,
  streetnumber,
  city,
  phone,
  district,
  callback
) => {
  Places.update(
    {
      name: name,
      phone: phone,
      streetnumber: streetnumber,
      streetname: streetname,
      district: district,
      city: city
    },
    { where: { id: id }, returning: true, plain: true }
  )
    .then(place => {
      callback(place);
    })
    .catch(err => {
      return err;
    });
};

controller.deleteById = (id, callback) => {
  Places.destroy({
    where: { id: id }
  }).then(callback);
};

controller.getDistinctDistrict = function(callback) {
  Places.findAll({
    attributes: [
      [Sequelize.fn("DISTINCT", Sequelize.col("district")), "district"]
    ]
  }).then(function(districts) {
    callback(districts);
  });
};
controller.getDistinctCity = function(callback) {
  Places.findAll({
    attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("city")), "city"]]
  }).then(function(cities) {
    callback(cities);
  });
};

module.exports = controller;
