const router = require('express').Router();
const articlessRepo = require('../respositories/users.js');


/* GET users listing. */
router.get('/', function(req, res, next) {
      articlessRepo.getAllArticles()
      .then((articles) => res.status(200).json(articles))
      .catch(err => console.log(err));
  });
  
  router.get('/articles', async function(req, res, next) {
    try {
      let offset=parseInt(req.query.offset);
      let limit=parseInt(req.query.limit);
      res.send(await usersRepo.getUsers(offset,limit));
    } catch (err) {
      console.error(`Error`, err.message);
      next(err);
    }
  });
  
  router.get('/articles/:id', async function(req, res, next) {
    try {
      let id=req.params.id;
      res.send(await articlessRepo.getArticle(id));
    } catch (err) {
      console.error(`Error`, err.message);
      next(err);
    }
  });
  
  router.get('/articles/title/:title', async function(req, res, next) {
    try {
      let title=req.params.title;
      res.send(await articlessRepo.getArticlesByTitle(title));
    } catch (err) {
      console.error(`Error`, err.message);
      next(err);
    }
  });
  
  router.get('articles/user/:userId', async function(req, res, next) {
    try {
        let userId=req.params.userId;
        res.send(await articlessRepo.getArticleByUserId(userId));
    } catch (err) {
      console.error(`Error`, err.message);
      next(err);
    }
  });

  router.post('/articles/add', async function(req, res, next) {
    try {
      const {title, content, UserId} = req.body;
      if(!title) {
          res.status(500).json({message:"le champs titre ne doit pas étre vide"});
      } 
      else
      {
        const NewArticle = {
            title,
            content,
            UserId,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        
          articlesRepo.addUser(NewArticle);
          res.status(200).redirect("http://localhost:3000/");
      }
    } catch (err) {
        console.error(`Error`, err.message);
        next(err);
    }
});

router.put('/articles/:id',async function(req, res, next){
    try {
      let id=req.params.id;
      let article=articlessRepo.getArticle(id);
      if(!article)
        res.status(404).json({message:"not found"});
      else
      {
        usersRepo.updateUser(req.body,id);
        res.status(200).redirect("http://localhost:8080/");
      }       
    } catch (err) {
      console.error(`Error`, err.message);
      next(err);
    }
  });
  
  router.delete('/articles/:id',async function(req, res, next){
    try {
      let id=req.params.id;
      articlessRepo.deleteArticle(id);
      res.status(200).redirect("http://localhost:1331/");
    } catch (err) {
      console.error(`Error`, err.message);
      next(err);
    }
    
  })
  
  
  
  module.exports = router;