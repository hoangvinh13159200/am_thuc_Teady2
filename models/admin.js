const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const adminSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  isAuthenticated: {
    type: Boolean,
    required: false,
    default: false
  },
  cart: {
    type: Object,
    required: false
  }
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
