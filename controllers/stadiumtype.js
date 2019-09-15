var controller = {};
var Sequelize = require("sequelize");
var models = require("../models");
var stadiumTypeModel = models.StadiumType;

controller.getDistinctType = function(callback) {
  stadiumTypeModel.findAll({
    attributes: [
      [Sequelize.fn("DISTINCT", Sequelize.col("name")), "name"]
    ]
  }).then(function(type) {
    callback(type);
  });
};

controller.getById = function(id, callback) {
  stadiumTypeModel
    .findOne({
      where: { id: id }
    })
    .then(function(stadiumtype) {
      callback(stadiumtype);
    });
};

module.exports = controller;
