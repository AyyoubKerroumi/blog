const router = require('express').Router();
const tagsRespo = require('../respositories/users.js');


/* GET comments listing. */

router.get('/', async function(req, res) {
    tagsRespo.getTags(parseInt(req.query.offset), parseInt(req.query.limit))
      .then((Tags) => res.status(200).json(Tags))
      .catch(err => console.log(err));
  })

  router.get('/all', async function(req, res, next) {
    try {
      res.send(await tagsRespo.getAllTags(offset,limit));
    } catch (err) {
      console.error(`Error`, err.message);
      next(err);
    }
  });

  router.get('/:id', async function(req, res, next) {
    try {
      let id=req.params.id;
      res.send(await tagsRespo.getTag(id));
    } catch (err) {
      console.error(`Error`, err.message);
      next(err);
    }
  });

  router.post('/add', async function (req, res) {
    const {name} = req.body;
  
              const newTag = {
                name,
                createdAt: new Date(),
                updatedAt: new Date(),
              }
            
              tagsRespo.addTag(newTag);
              res.status(200).redirect("http://localhost:3000/");
  });

  router.post('/:id', async function (req, res) {
    tagsRespo.updateTag(req.params.id, req.body);
    res.status(200).redirect("http://localhost:3000/");
  })
  
  
  router.delete('/:id', (req, res) => {
    tagsRespo.deleteTag(req.params.id);
    res.status(200).redirect("http://localhost:3000/");
  })

  module.exports = router;
  