const mongoose = require('mongoose');
const argon2 = require('argon2');

const schema = mongoose.Schema();
const { hash, verifyjwt } = argon2;

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

userSchema.pre('save', async function () {
  this.password = await hash(this.password);
});

const User = mongoose.model('User', userSchema);
module.exports = User;
