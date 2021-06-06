const router = require('express').Router();
const commentsRespo = require('../respositories/users.js');


/* GET comments listing. */
router.get('/all', function(req, res, next) {
    commentsRespo.getAllComments()
      .then((comments) => res.status(200).json(comments))
      .catch(err => console.log(err));
  });
  
  router.get('/', async function(req, res, next) {
    try {
      let offset=parseInt(req.query.offset);
      let limit=parseInt(req.query.limit);
      res.send(await commentsRespo.getComments(offset,limit));
    } catch (err) {
      console.error(`Error`, err.message);
      next(err);
    }
  });
  
  router.get('/:id', async function(req, res, next) {
    try {
      let id=req.params.id;
      res.send(await commentsRespo.getComment(id));
    } catch (err) {
      console.error(`Error`, err.message);
      next(err);
    }
  });
  
 
  
  router.get('/article/:id', async function(req, res, next) {
    try {
        let id=req.params.id;
        res.send(await commentsRespo.getCommentByArticleId(id));
    } catch (err) {
      console.error(`Error`, err.message);
      next(err);
    }
  });

  router.post('/add', async function(req, res, next) {
    try {
        const {content, ArticleId} = req.body;
        const NewComment = {
            content,
            ArticleId,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
          commentsRespo.addComment(NewComment);
          res.status(200).redirect("http://localhost:3000/");
    } catch (err) {
        console.error(`Error`, err.message);
        next(err);
    }
});

router.put('/:id',async function(req, res, next){
    try {
      let id=req.params.id;
      let article=commentsRespo.getArticle(id);
      if(!article)
        res.status(404).json({message:"not found"});
      else
      {
        usersRepo.updateComment(articlereq.body,id);
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
      commentsRespo.deleteComment(id);
      res.status(200).redirect("http://localhost:3000/");
    } catch (err) {
      console.error(`Error`, err.message);
      next(err);
    }
    
  })
  
  
  
  module.exports = router;