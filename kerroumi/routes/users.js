var express = require('express');
var router = express.Router();
const respo = require('../respositories/users.js');
const usersRepo = require('../models/user.js');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/users', async function(req, res, next) {
  let offset=req.query.offset;
  let limit=req.query.limit;
  res.send(await usersRepo.getUsers(offset,limit));
});

router.get('/users/:id', async function(req, res, next) {
  let id=req.params.id;
  res.send(await usersRepo.getUser(id));
});

router.get('/users/:email', async function(req, res, next) {
  let email=req.params.email;
  res.send(await usersRepo.getUser(role));
});

router.get('/users/:role', async function(req, res, next) {
  let role=req.params.role;
  switch(role)
  {
    case "author":res.send(await usersRepo.getAuthors());break;
    case "admin":res.send(await usersRepo.getGuests());break;
    case "guest":res.send(await usersRepo.getGuests());break;
  }
});





router.post('/users', async function(req, res, next) {
  const {username, email, password, role} = req.body;
  if (!username || !email) 
    res.status(500).jsonp({ error: 'le champ email ou username est invalid' })
  else {
            let utilisateur = {
              username,
              email,
              password, 
              role,
              createdAt: new Date(),
              updatedAt: new Date(),
            }
            usersRepo.addUser(utilisateur);
            
  }
});

router.put('/users/:id',async function(req, res, next){
  let id=req.params.id;
  usersRepo.updateUser(req.body,id);
  res.status(200);
});

router.delete('/users/:id',async function(req, res, next){
  let id=req.params.id;
  usersRepo.deleteUser(id);
  res.status(200);
})



module.exports = router;
