'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var eat = require('eat');

var adminSchema = mongoose.Schema({

});

adminSchema.methods.generateHash = function(password, callback) {

};

adminSchema.methods.checkPassword = function(password, callback) {

};

adminSchema.methods.generateToken = function(secret, callback) {

};
