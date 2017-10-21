'use strict';

const express = require('express');
const app = express();
const jsonParser = require('body-parser').json;

app.use(jsonParser());

const port = 3000;

app.listen(port, () => {
  console.log(`Express is listening on Port ${port}`);
});
