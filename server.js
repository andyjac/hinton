'use strict';

var mongoose = require('mongoose');
var express = require('express');
var passport = require('passport');
var app = express();

process.env.APP_SECRET = process.env.APP_SECRET || 'ginahintonsfoodapp'; // change

var userRoutes = express.Router();
var restaurantRoutes = express.Router();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/food_critic_dev');

app.use(passport.initialize());

require('./lib/passport_strat')(passport);

require('./routes/user_routes.js')(userRoutes, passport);
require('./routes/restaurant_routes.js')(restaurantRoutes);

app.use('/api', userRoutes);
app.use('/api', restaurantRoutes);

app.listen(process.env.PORT || 3000, function() {
  console.log('server running on port ' + (process.env.PORT || 3000));
});
