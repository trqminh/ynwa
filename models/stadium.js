'use strict';
module.exports = (sequelize, DataTypes) => {
  const Stadium = sequelize.define('Stadium', {
    name: DataTypes.STRING,
    commonPrice: DataTypes.STRING
  }, {});
  Stadium.associate = function(models) {
    // associations can be defined here
    Stadium.belongsTo(models.Place);
    Stadium.belongsTo(models.StadiumType);
    Stadium.hasMany(models.OrderDetail);
  };
  return Stadium;
};