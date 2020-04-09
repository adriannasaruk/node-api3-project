const express = require('express');

const Post = require("./postDb")

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  Post.get()
  .then(item=> {
    res.status(200).json(item)
  })
  .catch(error => {
    res.status(500).json({
      message: "Error retrieving the Post"
    })
  })
});

router.get('/:id', (req, res) => {
  // do your magic!
  Post.getById(req.params.id)
  .then(item => {
    if (item) {
      res.status(200).json(item)
    }
    else{
      res.status(404).json({message: "Post not found"})
    }
  })
  .catch(error => {
    res.status(500).json({message: "Error retrieving Post"})
  })
});

router.delete('/:id', (req, res) => {
  // do your magic!
  Post.remove(req.params.id)
  .then(count => {
    if(count >0) {
      res.status(200).json({message: "The Post is deleted"})
    }
    else{
      res.status(404).json({message: "The Post was not found"})
    }
  })
  .catch(error=> {
    res.status(500).json({message: "Error removing the Post"})
  })
});

router.put('/:id', (req, res) => {
  // do your magic!
  Post.update(req.params.id, req.body)
  .then(item=>{
    if (item){
      res.status(200).json(item)
    }
    else{
      res.status(404).json({message: "The Post was not found"})
    }
  })
  .catch(error=> {
    res.status(500).json({
      message: "Error updating the Post"
    })
  })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
