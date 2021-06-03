'use strict';
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
  let N=20;
  let users=[];
  let roles=["admin","author","guest"];
  for(let id=1;id <= 20;id++)
  {
    let u_name = faker.internet.userName();
    let email = faker.internet.email();
    let password=faker.internet.password();
    let date = faker.date.between(1970, 2021);
    let indice=faker.random.number(1, 3);
    users.push({
      id: id,
      username: u_name,
      password:password,
      email: email,
      role:roles[indice],
      createdAt:date,
      updatedAt:date,
    });
  } 
  var x1 = await queryInterface.bulkInsert('users', users, {});
  return Promise.all([x1]);

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
