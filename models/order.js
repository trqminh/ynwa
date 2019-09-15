'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    totalPrice: DataTypes.DECIMAL,
    totalQuantity: DataTypes.INTEGER,
    paymentMethod: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
    Order.hasMany(models.OrderDetail,  { onDelete: 'cascade', hooks: true });
    Order.belongsTo(models.User);
  };
  return Order;
};