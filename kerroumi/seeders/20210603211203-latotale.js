'use strict';

let faker = require('faker');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    ///users
      let users=[];
      let N=20;
      let roles=["admin","author","guest"];
      for(let id=1;id <=N;id++)
      {
        let u_name = faker.internet.userName();
        let email = faker.internet.email();
        let password=faker.internet.password();
        let date = faker.date.between(2000, 2021);
        let indice=faker.random.number({min:0, max:2});
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
      console.log(users['1']);
      ///les articles
      let articles=[];
      let numberOfArticles=0;
      for(let i=1 ; i<=N ; i++)
      {
        let a=parseInt(Math.random()*8)+2;
        let k=i-1;
        let date=users[k.toString()].createdAt;
        let PubAt=faker.date.between(date,2021);
        for(let j=1 ; j<=a ; j++)
        {
          numberOfArticles++;
          articles.push({
            id:numberOfArticles,
            title: faker.random.words()+`${j}`,
            content: faker.lorem.paragraph(),
            published:true,
            createdAt: PubAt,
            updatedAt: PubAt,
            UserId: users[k.toString()].id,
          })
        }
      }
      console.log(articles['1']);
      ///les tags
      let tags=[];
      let N3=10;
      for(let i=1; i<=N3; i++)
      {
        let k=i-1;
        let date=users[k.toString()].createdAt;
        let PubAt=faker.date.between(date,2021);
        tags.push({
          id:i,
          name:faker.lorem.sentence(3)+`${i}`,
          createdAt: PubAt,
          updatedAt: PubAt,

        })
      }
      console.log(users['1']);
    ///les tags de chaque article
    let articleTags = [];
    for(let i=1;i<=10;i++) {
      let a = parseInt(Math.random()*4 )+ 2;
      let k=i-1;
      let date=articles[k.toString()].createdAt;
      for(let j=1;j<=a;j++) {
        articleTags.push({
          createdAt: faker.date.between(date,2021),
          updatedAt: faker.date.between(date,2021),
          articleId: articles[k.toString()].id,
          tagId: tags[k.toString()].id,
        })
      }
    }
    console.log(users['1']);

    ///les commentaires de chaque article
    let comments = [];
    let numberOfComments =0;
    for(let i=1;i<numberOfArticles;i++) {
      let a = parseInt(Math.random()*11);
      let k=i;
      for(let j=1;j<=a;j++){
        numberOfComments++;
        let date=articles[k.toString()].createdAt;
        comments.push({
          id: numberOfComments,
          content: faker.lorem.paragraph(),
          createdAt: faker.date.between(date,2021),
          updatedAt: faker.date.between(date,2021),
          articleId: articles[k.toString()].id
        })
      }
    }
    console.log(comments['1']);
      console.log(1);
      await queryInterface.bulkInsert('articles', articles, {});
      console.log(33);
      await queryInterface.bulkInsert('comments', comments, {});
      console.log(2);
      await queryInterface.bulkInsert('tags', tags, {});
      console.log(3);
      await queryInterface.bulkInsert('articletags', articleTags, {});
      console.log(4);
      await queryInterface.bulkInsert('Users', users, {});
      console.log(5);
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
