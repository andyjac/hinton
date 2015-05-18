'use strict';

process.env.MONGOLAB_URI = 'mongodb://localhost/food_critic_dev_test';
require('../server');

var mongoose = require('mongoose');
var chai = require('chai');
var chaiHttp = require('chai-http');

chai.use(chaiHttp);

var expect = chai.expect;

var Rest = require('../models/Restaurant');
var Admin = require('../models/Admin');

describe('restaurant REST API', function () {

  before(function (done) {
    var testRest = new Rest({
      name: 'Whole Foods Market',
      address: {
        number: '2210',
        street: 'Westlake Avenue',
        city: 'Seattle',
        state: 'WA',
        zip: '98121',
      }
    });
    testRest.save(function (err, data) {
      if (err) throw err;

      this.testRest = data;
    }.bind(this));
    done();
  });

  after(function (done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should get array of all restaurants', function (done) {
    chai.request('localhost:3000')
    .get('/api/restaurant/all')
    .end(function (err, res) {
      expect(err).to.eql(null);
      expect(typeof res.body).to.eql('object');
      expect(Array.isArray(res.body)).to.eql(true);
      done();
    });
  });

});
