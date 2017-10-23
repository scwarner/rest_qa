'use strict';
const express = require('express');
const router = express.Router();
const Question = require("./models").Question;

router.param("qID", function(req, res, next, id) {
  Question.findById(id, function(err, doc) {
    if(err) return next(err);
    if(!doc) {
      err = new Error("Not found");
      err.status = 404;
      return next(err);
    }
    req.question = doc;
    return next();
  });
});

router.param('aID', function(req,res,next,id) {
  req.answer = req.questions.answers.id(id);
  if(!doc) {
    err = new Error("Not found");
    err.status = 404;
    return next(err);
  }
  next();
});

//GET /questions
router.get('/', (req, res, next) => {
  //return all the questions
  Question.find({})
            .sort({createdAt: -1})
            .exec((err, questions) => {
              if(err) return next(err);
              res.json(questions);
            });
});

//POST /questions
router.post('/', (req, res, next) => {
  const question = new Question(req.body);
  question.save(function(err, question) {
    if(err) return next(err);
    res.status(201);
    res.json(question);
  });
});

//GET /questions
//Route for specific questions
router.get('/:qID', (req, res) => {
  res.json(req.questions);
});

//POST /questions/:id/answers
//Route for creating an answer
router.post('/:qID/answers', (req, res, next) => {
  req.question.answers.push(req.body);
  req.question.save(function(err, question) {
    if(err) return next(err);
    res.status(201);
    res.json(question);
  });
});

//PUT /questions/:id/answers/:id
//Edit a specific answer
router.put('/:qID/answers/:aID', (req, res) => {
  req.answer.update(req.body, function(err, result) {
    if(err) return next(err);
    res.json(result);
  });
});

//DELETE /questions/:id/answers/:id
//Delete a specific answer
router.delete('/:qID/answers/:aID', (req, res) => {
  req.answer.remove(function(err){
    req.question.save(function(err, question){
      if(err) return next(err);
      res.json(question);
    });
  });
});

//POST /questions/:id/answers/:id
//Vote a specific answer
router.post('/:qID/answers/:aID/vote-:dir',
  (req, res, next) =>{
  if(req.params.dir.search(/^(up|down)$/) === -1) {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
  } else {
    req.vote = req.params.dir;
    next();
  }
}, (req, res, next) => {
  req.answer.vote(req.vote, function(err, question){
    if(err) return next(err);
    res.json(question);
  });
});

module.exports = router;
