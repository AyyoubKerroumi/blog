const router = require('express').Router();
const usersRepo = require('../respositories/users.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  usersRepo.getUsers(parseInt(req.query.offset), parseInt(req.query.limit))
      .then((users) => res.status(200).json(users))
      .catch(err => console.log(err));
});

router.get('/users', async function(req, res, next) {
  try {
    let offset=parseInt(req.query.offset);
    let limit=parseInt(req.query.limit);
    res.send(await usersRepo.getUsers(offset,limit));
  } catch (err) {
    console.error(`Error`, err.message);
    next(err);
  }
});

router.get('/users/:id', async function(req, res, next) {
  try {
    let id=req.params.id;
    res.send(await usersRepo.getUser(id));
  } catch (err) {
    console.error(`Error`, err.message);
    next(err);
  }
});

router.get('/users/email/:email', async function(req, res, next) {
  try {
    let email=req.params.email;
    res.send(await usersRepo.getUserByEmail(email));
  } catch (err) {
    console.error(`Error`, err.message);
    next(err);
  }
});

router.get('/users/role/:role', async function(req, res, next) {
  try {
    let role=req.params.role;
    switch(role)
    {
      case "author":res.send(await usersRepo.getAuthors());break;
      case "admin":res.send(await usersRepo.getGuests());break;
      case "guest":res.send(await usersRepo.getGuests());break;
    }
  } catch (err) {
    console.error(`Error`, err.message);
    next(err);
  }
});

router.post('/users/add', async function(req, res, next) {
  try {
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
            res.status(200).redirect("http://localhost:8080/");
            
  }
  } catch (err) {
    console.error(`Error`, err.message);
    next(err);
  }
  
});

router.put('/users/:id',async function(req, res, next){
  try {
    let id=req.params.id;
    let user=usersRepo.getUser(id);
    if(!user)
      res.status(404).json({});
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

router.delete('/users/:id',async function(req, res, next){
  try {
    let id=req.params.id;
    usersRepo.deleteUser(id);
    res.status(200).redirect("http://localhost:8080/");
  } catch (err) {
    console.error(`Error`, err.message);
    next(err);
  }
  
})



module.exports = router;
