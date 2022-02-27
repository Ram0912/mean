const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
  name: { type: String },
  phoneNumber: { type: String },
  address: { type: String },
  state: { type: String },
  city: { type: String },
  mail: { type: String },
  password: { type: String },
  role: { type: String }
}, {
  collection: 'user'
})

module.exports = mongoose.model('User', User)