var controller = {};
var Sequelize = require("sequelize");

var models = require("../models");
var Places = models.Place;
const Op = Sequelize.Op;
controller.search = function(query, callback) {
  Places.findAll({
    where: {
      [Op.or]: [
        {
          name: {
            [Op.like]: `%${query}%`
          }
        },
        {
          city: {
            [Op.like]: `%${query}%`
          }
        },
        {
          district: {
            [Op.like]: `%${query}%`
          }
        },
        {
          streetname: {
            [Op.like]: `%${query}%`
          }
        },
        {
          streetnumber: {
            [Op.like]: `%${query}%`
          }
        }
      ]
    }
  }).then(function(places) {
    callback(places);
  });
};

module.exports = controller;
