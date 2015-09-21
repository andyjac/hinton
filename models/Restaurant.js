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
      country: { type: String, required: true },
      fullAddress: { type: String, required: true }
    },

    hours: {
      mon: String,
      tue: String,
      wed: String,
      thu: String,
      fri: String,
      sat: String,
      sun: String
    },

    p_id: String,
    phone: { type: String, required: true },
    genre: [String],
    price: { type: Number, required: true },
    blog_link: String,
    r_site: String,
    menu_link: String,
    menu_item: [String],

    photos: [{
      id: String,
      url: String,
      caption: String,
      show: Boolean,
      delete: Boolean
    }],

    other: String
  }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
