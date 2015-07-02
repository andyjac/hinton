'use strict';

var mongoose = require('mongoose');
var express = require('express');
var passport = require('passport');
var app = express();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/hinton_dev');
process.env.APP_SECRET = process.env.APP_SECRET || 'hinton_dev';

var userRoutes = express.Router();
var restaurantRoutes = express.Router();

app.use(passport.initialize());

require('./lib/passport_strat')(passport);

require('./routes/user_routes.js')(userRoutes, passport);
require('./routes/restaurant_routes.js')(restaurantRoutes);

app.use('/api', restaurantRoutes);
app.use('/hinton', userRoutes);
app.use('/', express.static('build'));

app.all('*', function(req, res) {
  res.status(404).send('<h1>Page not found</h1>');
});

app.listen(process.env.PORT || 3000, function() {
  console.log('server running on port ' + (process.env.PORT || 3000));
});
