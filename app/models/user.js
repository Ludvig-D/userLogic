const mongoose = require('mongoose');
const argon2 = require('argon2');

const { Schema } = mongoose;
const { hash, verify } = argon2;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.verifyPassword = async function (password) {
  return await verify(this.password, password);
};

userSchema.pre('save', async function () {
  this.password = await hash(this.password);
});

const User = mongoose.model('User', userSchema);
module.exports = User;
