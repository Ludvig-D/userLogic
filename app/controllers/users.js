const User = require('../models/user');

module.exports.signupUser = async (req, res) => {
  const { username, email, password } = req.body;
  const usernameInUse = await User.findOne({ username: username });
  if (usernameInUse) {
    res.status(400).json({ message: 'Username already exists' });
  }
  const emailInUse = await User.findOne({ email: email });
  if (emailInUse) {
    res.status(400).json({ message: 'Email already in use' });
  }

  const user = new User({
    username: username,
    email: email,
    password: password,
  });
  await user.save();
  res.status(200).json({ message: 'User created successfully' });
};
