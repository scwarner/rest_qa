'use strict';
const express = require('express');
const router = express.Router();

//GET /questions
router.get('/', (req, res) => {
  //return all the questions
  res.json({response: "You sent me a GET request"});
});

//POST /questions
router.post('/', (req, res) => {
  res.json({
    response: "You sent me a POST request",
    body: req.body
  });
});

//GET /questions
//Route for specific questions
router.get('/:qID', (req, res) => {
  //return all the questions
  res.json({
    response: `You sent me a GET request for ID ${req.params.id}`
  });
});

//POST /questions/:id/answers
//Route for creating an answer
router.post('/:qID/answers', (req, res) => {
  res.json({
    response: "You sent me a POST request to /answers",
    questionID: req.params.qID,
    body: req.body
  });
});

//PUT /questions/:id/answers/:id
//Edit a specific answer
router.put('/:qID/answers/:aID', (req, res) => {
  res.json({
    response: "You sent me a PUT request",
    questionID: req.params.qID,
    answerID: req.params.aID,
    body: req.body
  });
});

//DELETE /questions/:id/answers/:id
//Delete a specific answer
router.delete('/:qID/answers/:aID', (req, res) => {
  res.json({
    response: "You sent me a DELETE request",
    questionID: req.params.qID,
    answerID: req.params.aID
  });
});

//POST /questions/:id/answers/:id
//Vote a specific answer
router.post('/:qID/answers/:aID/vote-:dir', (req, res) => {
  res.json({
    response: "You sent me a POST request",
    questionID: req.params.qID,
    answerID: req.params.aID,
    vote: req.params.dir
  });
});

module.exports = router;
