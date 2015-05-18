'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var eat = require('eat');

var adminSchema = mongoose.Schema({
  username: {type: String, required: true},
  basic: {
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
  }
});

adminSchema.methods.generateHash = function(password, callback) {
  bcrypt.genSalt(8, function(err, salt) {
    bcrypt.hash(password, salt, null, function(err, hash) {
      if (err) {
        callback(err);
      }
      callback(null, hash);
    });
  });
};

adminSchema.methods.checkPassword = function(password, callback) {
  bcrypt.compare(password, this.basic.password, function(err, res) {
    if (err) {
      callback(err);
    }
    callback(null, res);
  });
};

adminSchema.methods.generateToken = function(secret, callback) {
  eat.encode({id: this._id}, secret, callback); // this._id may be replaced
};

module.exports = mongoose.model('Admin', adminSchema);
