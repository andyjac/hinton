'use strict';

process.env.MONGOLAB_URI = 'mongodb://localhost/food_critic_dev_test';
require('../server');

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
var bcrypt = require('bcrypt-nodejs');
var Admin = require('../models/Admin');
chai.use(chaihttp);

var expect = chai.expect;

describe('admin user creation and authentication', function() {
  var password = bcrypt.hashSync('foobaz', bcrypt.genSaltSync(8), null);

  before(function(done) {
    var testAdmin = new Admin({
      username: 'test',
      basic: { password: password, email: 'test2@example.com' }
    });

    testAdmin.save(function(err, user) {
      if (err) console.log(err);
      done();
    });
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to create a new admin user', function(done) {
    chai.request('localhost:3000')
      .post('/api/admin')
      .send({username: 'test', email: 'test@example.com', password: 'tester'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('should be able to sign in an admin user', function(done) {
    chai.request('localhost:3000')
      .get('/api/admin/sign_in')
      .auth('test2@example.com', 'foobaz')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('token');
        done();
      });
  });
});
