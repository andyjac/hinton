'use strict';

process.env.MONGOLAB_URI = 'mongodb://localhost/food_critic_dev_test';
require('../server');

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');

chai.use(chaihttp);

var expect = chai.expect;

describe('admin user creation and authentication', function() {

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
        expect(res.body.token).to.exist;
        done();
      });
  });

});
