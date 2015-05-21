'use strict';

var mongoose = require('mongoose');
var express = require('express');
var passport = require('passport');
var app = express();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/hinton_dev');
process.env.APP_SECRET = process.env.APP_SECRET || 'ginahintonsfoodapp'; // change

var userRoutes = express.Router();
var restaurantRoutes = express.Router();

app.use(passport.initialize());

require('./lib/passport_strat')(passport);

require('./routes/user_routes.js')(userRoutes, passport);
require('./routes/restaurant_routes.js')(restaurantRoutes);

app.use('/hinton', userRoutes);
app.use('/api', restaurantRoutes);
app.use('/hinton/user', express.static('admin'));

app.listen(process.env.PORT || 3000, function() {
  console.log('server running on port ' + (process.env.PORT || 3000));
});
