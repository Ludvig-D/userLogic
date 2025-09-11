const mongoose = require('mongoose');

const schema = mongoose.Schema();

const userSchema = new schema({
  username: {
    type: String,
    required,
  },
  email: {
    type: String,
    required,
  },
  password: {
    type: String,
    required,
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
