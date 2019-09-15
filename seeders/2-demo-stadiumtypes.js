'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    var types = [];
    var type5 = {
      name: 'Sân 5',
      basePrice:150000,
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    }
    var type7 = {
      name: 'Sân 7',
      basePrice:200000,
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    }
    var type11 = {
      name: 'Sân 11',
      basePrice:250000,
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    }
    
    types.push(type5);
    types.push(type7);
    types.push(type11);

    return queryInterface.bulkInsert('StadiumTypes', types, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('StadiumTypes', null, {}); 
  }
};
