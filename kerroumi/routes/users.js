const router = require('express').Router();
const usersRepo = require('../respositories/users.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  usersRepo.getUsers(parseInt(req.query.offset), parseInt(req.query.limit))
      .then((users) => res.status(200).json(users))
      .catch(err => console.log(err));
});

router.get('/all', async function(req, res, next) {
  try {
    res.send(await usersRepo.getAllUsers());
  } catch (err) {
    console.error(`Error`, err.message);
    next(err);
  }
});

router.get('/id/:id', async function(req, res, next) {
  try {
    let id=req.params.id;
    res.send(await usersRepo.getUser(id));
  } catch (err) {
    console.error(`Error`, err.message);
    next(err);
  }
});

router.get('/email/:email', async function(req, res, next) {
  try {
    let email=req.params.email;
    res.send(await usersRepo.getUserByEmail(email));
  } catch (err) {
    console.error(`Error`, err.message);
    next(err);
  }
});

router.get('/role/:role', async function(req, res, next) {
  try {
    let role=req.params.role;
    switch(role)
    {
      case "author":res.send(await usersRepo.getGuests());break;
      case "admin":res.send(await usersRepo.getGuests());break;
      case "guest":res.send(await usersRepo.getGuests());break;
    }
  } catch (err) {
    console.error(`Error`, err.message);
    next(err);
  }
});

router.post('/add', async function(req, res, next) {
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
            res.status(200).redirect("http://localhost:3000/");
            
  }
  } catch (err) {
    console.error(`Error`, err.message);
    next(err);
  }
  
});


router.post('/:id',async function(req, res, next){
  try {
    let id=req.params.id;
    let user=usersRepo.getUser(id);
    if(!user)
      res.status(404).json({});
    else
    {
      usersRepo.updateUser(id,req.body);
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
    usersRepo.deleteUser(id);
    res.status(200).redirect("http://localhost:3000/");
  } catch (err) {
    console.error(`Error`, err.message);
    next(err);
  }
  
})



module.exports = router;
