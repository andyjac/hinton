'use strict';

var mongoose = require('mongoose');
var express = require('express');

var app = express();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/food_critic_dev');

app.listen(3000, function() {
  console.log('server running on port ' + (process.env.PORT || 3000));
});
