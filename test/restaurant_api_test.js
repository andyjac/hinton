'use strict';

process.env.MONGOLAB_URI = 'mongodb://localhost/rests_test';
require('../server');

var mongoose = require('mongoose');
var chai = require('chai');
var chaiHttp = require('chai-http');

chai.use(chaiHttp);

var expect = chai.expect;

var Rest = require('../models/??');
var Admin = require('../models/??');

describe('restaurant REST API', function () {

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
