"use strict";
var faker = require("faker/locale/vi");
module.exports = {
  up: (queryInterface, Sequelize) => {
    var stadiums = [];
    var i;

    for (i = 1; i <= 50; i++) {
      var stadium = {
        name: `Stadium ${i}`,
        commonPrice: faker.random.arrayElement(["100-300k","100-400k","200-300k","200-400k"]),
        StadiumTypeId: faker.random.number({min: 1, max: 3}),
        PlaceId: faker.random.number({ min: 1, max: 50 }),
        createdAt: Sequelize.literal("NOW()"),
        updatedAt: Sequelize.literal("NOW()")
      };
      stadiums.push(stadium);
    }
      return queryInterface.bulkInsert("Stadia", stadiums, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Stadia", null, {});
  }
};
