const router = require('express').Router();
const commentsRespo = require('../respositories/users.js');


/* GET users listing. */
router.get('/', function(req, res, next) {
    articlessRepo.getAllArticles()
      .then((comments) => res.status(200).json(comments))
      .catch(err => console.log(err));
  });
  
  router.get('/comments', async function(req, res, next) {
    try {
      let offset=parseInt(req.query.offset);
      let limit=parseInt(req.query.limit);
      res.send(await commentsRespo.getComments(offset,limit));
    } catch (err) {
      console.error(`Error`, err.message);
      next(err);
    }
  });
  
  router.get('/comments/:id', async function(req, res, next) {
    try {
      let id=req.params.id;
      res.send(await commentsRespo.getComment(id));
    } catch (err) {
      console.error(`Error`, err.message);
      next(err);
    }
  });
  
  router.get('/comments/article/:articleId', async function(req, res, next) {
    try {
      let articleId=req.params.articleId;
      res.send(await commentsRespo.getCommentByArticleId(articleId));
    } catch (err) {
      console.error(`Error`, err.message);
      next(err);
    }
  });
  
  router.get('comments/article/:id', async function(req, res, next) {
    try {
        let id=req.params.id;
        res.send(await commentsRespo.getCommentByArticleId(id));
    } catch (err) {
      console.error(`Error`, err.message);
      next(err);
    }
  });

  router.post('/comments/add', async function(req, res, next) {
    try {
        const {content, ArticleId} = req.body;
        const NewComment = {
            content,
            ArticleId,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
          commentsRespo.addComment(NewComment);
          res.status(200).redirect("http://localhost:8080/");
    } catch (err) {
        console.error(`Error`, err.message);
        next(err);
    }
});

router.put('/comments/:id',async function(req, res, next){
    try {
      let id=req.params.id;
      let article=commentsRespo.getArticle(id);
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
  
  router.delete('/comments/:id',async function(req, res, next){
    try {
      let id=req.params.id;
      commentsRespo.deleteArticle(id);
      res.status(200).redirect("http://localhost:8080/");
    } catch (err) {
      console.error(`Error`, err.message);
      next(err);
    }
    
  })
  
  
  
  module.exports = router;