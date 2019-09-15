"use strict";
var faker = require("faker/locale/vi");
module.exports = {
  up: (queryInterface, Sequelize) => {
    var places = [];
    var i;

    for (i = 1; i <= 50; i++) {
      var place = {
        name: faker.name.findName(),
        imagepath: `../assets/img/place${i % 12 + 1}.jpg`,
        phone: faker.phone.phoneNumber(),
        opentime: "Open at " + faker.random.number({ min: 5, max: 8 }),
        city: "TP. Hồ Chí Minh",
        district: faker.random.arrayElement(["Quận 1","Quận 2","Quận 3","Quận 4","Quận 5","Quận 6", "Quận Thủ Đức", "Quận Bình Thạnh", "Quận Gò Vấp"]),
        streetname: faker.address.streetName(),
        streetnumber: faker.random.number(1000),
        createdAt: Sequelize.literal("NOW()"),
        updatedAt: Sequelize.literal("NOW()")
      };
      places.push(place);
    }
    return queryInterface.bulkInsert("Places", places, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Places", null, {});
  }
};