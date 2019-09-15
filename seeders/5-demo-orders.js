"use strict";
var faker = require("faker/locale/vi");
module.exports = {
  up: (queryInterface, Sequelize) => {
    var orders = [];
    var i;

    for (i = 1; i <= 50; i++) {
      var order = {
        totalPrice: faker.finance.amount(),
        totalQuantity: faker.random.number({ min: 1, max: 10 }),
        paymentMethod: faker.random.arrayElement([
          "Cash",
          "Credit Card",
          "Bitcoin"
        ]),
        status: `OK`,
        createdAt: Sequelize.literal("NOW()"),
        updatedAt: Sequelize.literal("NOW()"),
        UserId: 1
      };

      orders.push(order);
    }

    return queryInterface.bulkInsert("Orders", orders, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Orders", null, {});
  }
};
