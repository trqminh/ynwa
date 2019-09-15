"use strict";
var faker = require("faker/locale/vi");
module.exports = {
  up: (queryInterface, Sequelize) => {
    var orderDetails = [];
    var i;
    for (i = 1; i < 50; i++) {
      var randomHour = faker.random.number({ min: 8, max: 21 });
      var orderDetail = {
        Date: faker.date
          .future(),
        start: `0${randomHour}:00:00`,
        end: `0${randomHour + 1}:00:00`,
        price: faker.finance.amount(),
        createdAt: Sequelize.literal("NOW()"),
        updatedAt: Sequelize.literal("NOW()"),
        OrderId: faker.random.number({ min: 1, max: 50 }),
        StadiumId: faker.random.number({ min: 1, max: 50 })
      };
      orderDetails.push(orderDetail);
    }

    return queryInterface.bulkInsert("OrderDetails", orderDetails, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("OrderDetails", null, {});
  }
};
