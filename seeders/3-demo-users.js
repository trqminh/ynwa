'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    var users = [];
    var user1 = {
      name: `Nguyen Van An`,
      email: `vananbebong@gmail.com`,
      password: `anthichlan`,
      address: `227 Nguyen Van Cu TP.HCM`,
      phone: `0909900009`,
      imagepath: `../assets/img/user${1}.jpg`,
      isAdmin:false,
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    }
    users.push(user1);

    return queryInterface.bulkInsert('Users', users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {}); 
  }
};
