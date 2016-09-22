/*jslint node: true */
'use strict';

var mongoose = require('mongoose');
require('mongoose-type-email');

// types should be revised

var contactInfoSchema = new mongoose.Schema(
  {
    email: {
      type: mongoose.SchemaTypes.Email,
      required: true
    },
    streetAddress: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    website: {
      type: String
    }
  }
  /*
  MAYBE NOT NEED
  {
    timestamps: true
  }
  */
);

mongoose.model('ContactInfo', contactInfoSchema);
