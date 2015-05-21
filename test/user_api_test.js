'use strict';

process.env.MONGOLAB_URI = 'mongodb://localhost/food_critic_dev_test';
require('../server');

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/User');
var expect = chai.expect;
var uuid = require('uuid');

chai.use(chaihttp);

describe('user creation and authentication', function() {
  var password = bcrypt.hashSync('foobaz', bcrypt.genSaltSync(8), null);
  var testToken;

  before(function(done) {
    var testAdmin = new User({
      username: 'admin',
      basic: { password: password, email: 'admin@example.com'},
      isAdmin: true,
      tokenId: uuid.v4()
    });

    testAdmin.save(function(err, admin) {
      if (err) console.log(err);

      admin.generateToken(process.env.APP_SECRET, function(err, token) {
        testToken = token;
        done();
      });
    });
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should allow an admin to create a new user', function(done) {
    chai.request('localhost:3000')
      .post('/hinton/user/create_user')
      .send({username: 'test', email: 'test@example.com', password: 'tester', eat: testToken})
      .end(function(err, res) {
        expect(res.status).to.eql(200);
        expect(err).to.eql(null);
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('should redirect valid user from login to form', function(done) {
    chai.request('localhost:3000')
      .get('/hinton')
      .auth('test@example.com', 'tester')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res).to.have.property('redirects');
        done();
      });
  });
});
