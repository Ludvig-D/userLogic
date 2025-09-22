const mongoose = require('mongoose');

const { Schema } = mongoose;

const sessionSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expireseAt: {
    type: Date,
    required: true,
  },
  createAt: Date,
  replacedByToken: {
    type: Date,
  },
  revokedAt: {
    type: Date,
  },
});

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;
