const User = require('../models/user');

module.exports.signupUser = async (req, res) => {
  try {
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
  } catch (error) {
    console.error(error);

    res.status(500).message('Something went wrong on server side');
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userExists = await User.findOne({ username: username });
    if (!userExists) {
      res.status(400).json({ message: 'Username or password is incorrect' });
    }

    const validPassword = await userExists.verifyPassword(password);

    if (!validPassword) {
      res.status(400).json({ message: 'Username or password is incorrect' });
    }

    res.status(200).json({ message: 'Login succesfull' });
  } catch (error) {
    console.error(error);
    res.status(500).message('Something went wrong on server side');
  }
};
