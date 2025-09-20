const User = require('../models/user');
const tokenSign = require('../middleware/InitializeToken');

module.exports.signupRender = (req, res) => {
  res.render('signup');
};

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

    res.status(500).json({ message: 'Something went wrong on server side' });
  }
};

module.exports.loginRender = (req, res) => {
  res.render('login');
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

    const accessToken = await tokenSign({ userid: userExists._id }, '15m');
    const refreshToken = await tokenSign({ userId: userExists._id }, '7d');

    res.cookie('AccessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
    });

    res.cookie('RefreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: 'Login succesfull' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong on server side' });
  }
};
