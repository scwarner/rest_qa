'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sortAnswers = function(a,b) {
  //negative a before b
  //0 no change
  //positive a after b
  if(a.votes === b.votes) {
    return b.updatedAt - a.updatedAt;
  }
  return b.votes - a.votes;
}

const answerSchema = new Schema({
  text: String,
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
  votes: {type: Number, default: 0}
});

answerSchema.method("update", function(updates, callback) {
  Object.assing(this, updates, {updatedAt: new Date()});
  this.parent().save(callback);
});

answerSchema.method("vote", function(vote, callback) {
  if(vote === "up") {
    this.votes += 1;
  } else {
    this.votes -= 1;
  }
  this.parent().save(callback);
});

const questionSchema = new Schema({
  text: String,
  createdAt: {type: Date, default: Date.now},
  answers: [answerSchema]
});

questionSchema.pre("save", function(next){
	this.answers.sort(sortAnswers);
	next();
});

const Question = mongoose.model('Question', questionSchema);

module.exports.Question = Question;
