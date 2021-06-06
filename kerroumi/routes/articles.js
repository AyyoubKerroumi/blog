const router = require('express').Router();
const articlessRepo = require('../respositories/articles.js');


/* GET articles listing. */
router.get('/all', function(req, res, next) {
      articlessRepo.getAllArticles()
      .then((articles) => res.status(200).json(articles))
      .catch(err => console.log(err));
  });
  
  router.get('/', async function(req, res, next) {
    try {
      let offset=parseInt(req.query.offset);
      let limit=parseInt(req.query.limit);
      res.send(await articlessRepo.getAllArticles(offset,limit));
    } catch (err) {
      console.error(`Error`, err.message);
      next(err);
    }
  });
  
  router.get('/:id', async function(req, res, next) {
    try {
      let id=req.params.id;
      res.send(await articlessRepo.getArticle(id));
    } catch (err) {
      console.error(`Error`, err.message);
      next(err);
    }
  });
  
  router.get('/title/:title', async function(req, res, next) {
    try {
      let title=req.params.title;
      res.send(await articlessRepo.getArticlesByTitle(title));
    } catch (err) {
      console.error(`Error`, err.message);
      next(err);
    }
  });
  
  router.get('/user/:userId', async function(req, res, next) {
    try {
        let userId=req.params.userId;
        res.send(await articlessRepo.getArticleByUserId(userId));
    } catch (err) {
      console.error(`Error`, err.message);
      next(err);
    }
  });

  router.post('/add', async function(req, res, next) {
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
        
          articlesRepo.addArticle(NewArticle);
          res.status(200).redirect("http://localhost:3000/");
      }
    } catch (err) {
        console.error(`Error`, err.message);
        next(err);
    }
});

router.put('/:id',async function(req, res, next){
    try {
      let id=req.params.id;
      let article=articlessRepo.getArticle(id);
      if(!article)
        res.status(404).json({message:"not found"});
      else
      {
        usersRepo.updateArticle(req.body,id,article);
        res.status(200).redirect("http://localhost:3000/");
      }       
    } catch (err) {
      console.error(`Error`, err.message);
      next(err);
    }
  });
  
  router.delete('/:id',async function(req, res, next){
    try {
      let id=req.params.id;
      articlessRepo.deleteArticle(id);
      res.status(200).redirect("http://localhost:3000/");
    } catch (err) {
      console.error(`Error`, err.message);
      next(err);
    }
    
  })
  
  
  
  module.exports = router;