'use strict';

var mongoose = require('mongoose');

var restaurantSchema = mongoose.Schema({
  r_id: Schema.Types.ObjectId,
  name: { type: String, required: true, unique: true },

  address: {
    number: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
  },

  hours: {
    sun: String,
    mon: String,
    tues: String,
    wed: String,
    thus: String,
    fri: String,
    sat: String,
  },

  phone: String,
  genre: String,
  price: Number,
  blog_link: String,
  r_site: String,
  menu_link: String,
  menu_item: [String],

  photos: [{
    id: Schema.Types.ObjectId,
    data: Buffer,
    caption: String
  }],

  other: String
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
