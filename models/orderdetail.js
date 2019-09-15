'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderDetail = sequelize.define('OrderDetail', {
    Date: DataTypes.DATE,
    start: DataTypes.TIME,
    end: DataTypes.TIME,
    price: DataTypes.DECIMAL
  }, {});
  OrderDetail.associate = function(models) {
    // associations can be defined here
    OrderDetail.belongsTo(models.Stadium);
    OrderDetail.belongsTo(models.Order);
  };
  return OrderDetail;
};