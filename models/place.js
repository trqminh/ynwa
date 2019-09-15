'use strict';
module.exports = (sequelize, DataTypes) => {
  const Place = sequelize.define('Place', {
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    opentime: DataTypes.STRING,
    imagepath: DataTypes.STRING,
    city: DataTypes.STRING,
    district: DataTypes.STRING,
    streetname: DataTypes.STRING,
    streetnumber: DataTypes.STRING
  }, {});
  Place.associate = function(models) {
    // associations can be defined here
    Place.hasMany(models.Stadium);
  };
  return Place;
};