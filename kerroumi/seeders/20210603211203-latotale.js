'use strict';

let faker = require('faker');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    ///users
      let users=[];
      let N=20;
      let roles=["admin","author","guest"];
      for(let id1=1;id <=N;id++)
      {
        let u_name = faker.internet.userName();
        let email = faker.internet.email();
        let password=faker.internet.password();
        let date = faker.date.between(2000, 2021);
        let indice=faker.random.number(1, 3);
        users.push({
          id: id1,
          username: u_name,
          password:password,
          email: email,
          role:roles[indice],
          createdAt:date,
          updatedAt:date,
        });
      } 
      ///les articles
      let articles=[];
      for(let i=1 ; i<N ; i++)
      {
        let a=parseInt(Math.random()*8)+2;
        let date=users[i].createdAt;
        let PubAt=faker.date.between(date,2021);
        for(let j=1 ; j<=a ; j++)
        {
          articles.push({
            id:j+(i-1)*a,
            title: faker.lorem.sentence(),
            content: faker.lorem.paragraph(),
            createdAt: PubAt,
            updatedAt: PubAt,
            UserId: users[i].id,
          })
        }
      }
      ///les tags
      let tags=[];
      let N3=10;
      for(let i=1; i<=N3; i++)
      {
        let date=users[i].createdAt;
        let PubAt=faker.date.between(date,2021);
        tags.push({
          id:i,
          name:faker.lorem.sentence(3),
          createdAt: PubAt,
          updatedAt: PubAt,

        })
      }
    ///les tags de chaque article

    let articleTags = [];
    for(let i=1;i<=N;i++) {
      let a = parseInt(Math.random()*4 )+ 2;
      for(let j=1;j<=a;j++) {
        articleTags.push({
          createdAt: date,
          updatedAt: date,
          articleId: articles[amount].id,
          tagId: tags[parseInt(Math.random()*10)].id,
        })
      }
    }
    ///les commentaires de chaque article
    let comments = [];
    for(let i=1;i<=N;i++) {
      let a = parseInt(Math.random()*11);
      for(let j=1;j<=a;j++){
        comments.push({
          id: j+(i-1)*a,
          content: faker.lorem.paragraph(),
          createdAt: date,
          updatedAt: date,
          articleId: articles[numberOfComments].id
        })
      }
    }
      await queryInterface.bulkInsert('Users', users, {});
      await queryInterface.bulkInsert('Articles', articles, {});
      await queryInterface.bulkDelete('comments', null, {});
      await queryInterface.bulkDelete('tags', null, {});
      await queryInterface.bulkDelete('articletags', null, {});

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
