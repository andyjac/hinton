'use strict';

process.env.MONGOLAB_URI = 'mongodb://localhost/hinton_dev_test';
require('../server');

var mongoose = require('mongoose');
var chai = require('chai');
var chaiHttp = require('chai-http');

chai.use(chaiHttp);

var expect = chai.expect;

var Rest = require('../models/Restaurant');
var User = require('../models/User');

describe('restaurant REST API', function () {

  before(function (done) {
    var testRest = new Rest({
      map: {
        loc: {
          lat: '12',
          long: '42'
        },
        caption: 'Whole Foods Market'
      },
      restaurant: {
        p_id: 'qwerty1',
        name: 'Whole Foods Market',
        address: {
          number: '2210',
          street: 'Westlake Avenue',
          city: 'Seattle',
          state: 'WA',
          zip: '98121',
          country: 'USA'
        },
        phone: '0987654321',
        genre: ['Mexican', 'Italian', 'Japanese'],
        price: 1
      }
    });

    var testRest2 = new Rest({
      map: {
        loc: {
          lat: '11',
          long: '41'
        },
        caption: 'Code Fellows'
      },
      restaurant: {
        p_id: 'qwerty2',
        name: 'Code Fellows',
        address: {
          number: '511',
          street: 'Boren Avenue North',
          city: 'Seattle',
          state: 'WA',
          zip: '98109',
          country: 'USA'
        },
        phone: '1234567890',
        genre: ['French', 'Mexican', 'Chinese', 'Japanese'],
        price: 2
      }
    });

    testRest.save(function (err, data) {
      if (err) throw err;
      this.testRest = data;

      testRest2.save(function (err, data) {
        if (err) throw err;
        this.testRest2 = data;
      }.bind(this));
    }.bind(this));

    done();
  });

  after(function (done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should get array of all restaurant map data', function (done) {
    chai.request('localhost:3000')
    .get('/api/restaurant/all')
    .end(function (err, res) {
      expect(err).to.eql(null);
      expect(typeof res.body).to.eql('object');
      expect(Array.isArray(res.body)).to.eql(true);
      done();
    });
  });

  it('should get a list of available genres', function(done) {
    chai.request('localhost:3000')
    .get('/api/restaurant/genre/all')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.eql(true);
      done();
    });
  });

  it('should get a restaurant by id', function (done) {
    chai.request('localhost:3000')
    .get('/api/restaurant/' + this.testRest2._id)
    .end(function (err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.body.map).to.eql(undefined);
      expect(res.body.restaurant.name).to.eql('Code Fellows');
      done();
    });
  });

  it('should get a list of restaurants from a genre', function(done) {
    chai.request('localhost:3000')
    .get('/api/restaurant/genre/Mexican')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(typeof res.body).to.eql('object');
      expect(Array.isArray(res.body)).to.eql(true);
      expect(res.body[0].map.caption).to.eql('Whole Foods Market');
      expect(res.body[1].map.caption).to.eql('Code Fellows');
      done();
    });
  });
});
