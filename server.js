'use strict';

var mongoose = require('mongoose');
var express = require('express');
var passport = require('passport');
var app = express();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/hinton_dev');
process.env.APP_SECRET = process.env.APP_SECRET || 'hinton_dev';

var adminRoutes = express.Router();
var apiRoutes = express.Router();

app.use(passport.initialize());

require('./lib/passport_strat')(passport);

require('./routes/admin_routes.js')(adminRoutes, passport);
require('./routes/api_routes.js')(apiRoutes);

app.use('/api', apiRoutes);
app.use('/admin', adminRoutes);
app.use('/', express.static(__dirname + '/build'));

app.all('*', function(req, res) {
  res.status(404).json({msg: 'page not found'});
});

app.listen(process.env.PORT || 3000, function() {
  console.log('server running on port ' + (process.env.PORT || 3000));
});
