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
  var testId;

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

  describe('authenticated user REST routes', function() {

    it('should be able to post to the database', function(done) {
      chai.request('localhost:3000')
        .post('/hinton/user/restaurant')
        .send({eat: testToken, map: {caption: 'rest'}, restaurant: {name: 'rest',
          address: {number: '111', street: '1st Ave', city: 'Seattle', state: 'WA',
          zip: '98103'}}})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body).to.eql({msg:'save successful'});
          done();
        });
    });

    it('should be able to retrieve an _id', function(done) {
      chai.request('localhost:3000')
        .get('/api/restaurant/all')
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(typeof res.body).to.eql('object');
          expect(Array.isArray(res.body)).to.eql(true);
          testId = res.body[0]._id;
          done();
        });
    });

    it('should be able to update a database entry', function(done) {
      chai.request('localhost:3000')
        .put('/hinton/user/restaurant/' + testId)
        .send({eat: testToken, map: {loc: {lat: '42', long: '120'}},
          restaurant: {zip: '98040'}})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body).to.eql({msg: 'update successful'});
          done();
        });
    });

    it('should be able to delete a database entry', function(done) {
      chai.request('localhost:3000')
        .del('/hinton/user/restaurant/' + testId)
        .send({eat: testToken})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body).to.eql({msg: 'delete successful'});
          done();
        });
    });

  });

});


