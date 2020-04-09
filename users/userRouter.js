const express = require('express');
const Post = require("../posts/postDb")
const User = require("./userDb.js")
const router = express.Router();
router.use("/:id", validateUserId)

router.post('/', validateUser, (req, res) => {
  // do your magic!
  User.insert(req.body)
  .then(item=> {
    res.status(201).json(item)
  })
  .catch(error => {
    res.status(500).json({
      message: "Error adding the user"
    })
  })
});

router.post('/:id/posts', validatePost, (req, res) => {
  // do your magic!
  Post.insert(req.body)
  .then(item=> {
    res.status(201).json(item)
  })
  .catch(error=> {
    res.status(500).json({
      message: "Error adding new posts"
    })
  })
});

router.get('/', (req, res) => {
  // do your magic!
  User.get()
  .then(item => {
    res.status(200).json(item)
  })
  .catch(error => {
    res.status(500).json("Error retrieving the users")
  })
});

router.get('/:id', (req, res) => {
  // do your magic!
    if (req.user) {
      res.status(200).json(req.user)
    }
    else{
      res.status(500).json({message: "Error retrieving user"})
    }
  });

router.get('/:id/posts', (req, res) => {
  // do your magic!
  User.getUserPosts(req.params.id)
  .then(item => {
    res.status(200).json(item)
  })
  .catch(error=> {
    res.status(500).json({message: "Error getting posts from the User"})
  })
});

router.delete('/:id', (req, res) => {
  // do your magic!
  User.remove(req.params.id)
  .then(count => {
    if(count >0) {
      res.status(200).json({message: "The User is deleted"})
    }
    else{
      res.status(404).json({message: "The user was not found"})
    }
  })
  .catch(error=> {
    res.status(500).json({message: "Error removing the user"})
  })
});

router.put('/:id', (req, res) => {
  // do your magic!
  User.update(req.params.id, req.body)
  .then(item=>{
    if (item){
      res.status(200).json(item)
    }
    else{
      res.status(404).json({message: "The user was not found"})
    }
  })
  .catch(error=> {
    res.status(500).json({
      message: "Error updating the user"
    })
  })
});

//custom middleware

function validateUserId(req, res, next){
   User.getById(req.params.id)
   .then(user=> {
    if(user) {
      req.user = user
      next();
    } else{
      res.status(400).json({message: "invalid user id" })
    }
   })
  }

function validateUser(req, res, next) {
  // do your magic!
  const body = req.body

  if(!Object.keys(body).length) {
    res.status(400).json({message: "No body"})
  } else if (!body.name){
    res.status(400).json({message: "no name"})
  }
  next()
}

function validatePost(req, res, next) {
  // do your magic!
  const body = req.body

  if(!Object.keys(body).length) {
    res.status(400).json({message: "No body"})
  } else if (!body.text){
    res.status(400).json({message: "no text"})
  }
  next()
}

module.exports = router;
