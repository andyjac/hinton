'use strict';

var mongoose = require('mongoose');
var express = require('express');
var passport = require('passport');
var app = express();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/hinton_dev');
process.env.APP_SECRET = process.env.APP_SECRET || 'ginahintonsfoodapp'; // change

var adminRoutes = express.Router();
var restaurantRoutes = express.Router();

app.use(passport.initialize());

require('./lib/passport_strat')(passport);

require('./routes/admin_routes.js')(adminRoutes, passport);
require('./routes/restaurant_routes.js')(restaurantRoutes);

app.use('/api', adminRoutes);
app.use('/api', restaurantRoutes);

app.listen(process.env.PORT || 3000, function() {
  console.log('server running on port ' + (process.env.PORT || 3000));
});
