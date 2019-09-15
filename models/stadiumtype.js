'use strict';
module.exports = (sequelize, DataTypes) => {
  const StadiumType = sequelize.define('StadiumType', {
    name: DataTypes.STRING,
    basePrice: DataTypes.DECIMAL
  }, {});
  StadiumType.associate = function(models) {
    // associations can be defined here
    StadiumType.hasMany(models.Stadium);
  };
  return StadiumType;
};