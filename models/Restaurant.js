'use strict';

var mongoose = require('mongoose');

var restaurantSchema = mongoose.Schema({
  map: {
    loc: {
      lat: String,
      long: String
    },
    marker: String,
    caption: String
  },
  restaurant: {
    name: { type: String, required: true, unique: true },

    address: {
      number: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: { type: String, required: true },
    },

    hours: {
      mon: String,
      tue: String,
      wed: String,
      thu: String,
      fri: String,
      sat: String,
      sun: String,
    },

    phone: String,
    genre: String,
    price: Number,
    blog_link: String,
    r_site: String,
    menu_link: String,
    menu_item: [String],

    photos: [{
      id: Number,
      data: Buffer,
      caption: String
    }],

    other: String
  }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
