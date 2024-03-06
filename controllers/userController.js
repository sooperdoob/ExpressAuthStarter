const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register user
const registerUser = async (username, password) => {
  const existingUser = await userModel.getUserByUsername(username);
  if (existingUser) {
    return { error: 'Username already exists' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await userModel.createUser({ username, password: hashedPassword });

  return { message: 'User registered successfully' };
};

// Login user
const loginUser = async (username, password) => {
  const user = await userModel.getUserByUsername(username);

  if (!user) {
    return { error: 'Invalid username or password' };
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return { error: 'Invalid username or password' };
  }

  const token = jwt.sign({ username }, 'secretkey', { expiresIn: '1h' });
  return { token };
};

module.exports = {
  registerUser,
  loginUser,
};
