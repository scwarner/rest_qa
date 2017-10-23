'use strict';

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/sandbox");

const db = mongoose.connection;

db.on('error', (err) =>{
  console.error("connection error:", err);
});

db.once("open", () => {
  console.log("db connection successful");
  //All db communication goes here
  const Schema = mongoose.Schema;
  const animalSchema = new Schema({
    type: String,
    color: String,
    size: String,
    mass: Number,
    name: String
  });

  const Animal = mongoose.model("Animal", animalSchema);

  const elephant = new Animal({
    type: 'elephant',
    color: 'gray',
    size: 'big',
    mass: 6000,
    name: "Ellie"
  });

  elephant.save((err) => {
    if (err) console.log("Save Failed", err);
    else console.log("Saved!");
      db.close(()=> {
        console.log("Closed!");
      });
  });
});
