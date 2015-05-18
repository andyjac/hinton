'use strict';

var mongoose = require('mongoose');
var express = require('express');

var app = express();

var restaurantRoutes = express.Router();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/food_critic_dev');

require('./routes/restaurant_routes')(restaurantRoutes);

app.use('/api', restaurantRoutes);

app.listen(process.env.PORT || 3000, function() {
  console.log('server running on port ' + (process.env.PORT || 3000));
});
