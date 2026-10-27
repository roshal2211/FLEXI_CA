const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const formatUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  interests: user.interests || [],
  createdAt: user.createdAt
});

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'Please fill in all required fields.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: passwordHash
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      token,
      user: formatUser(user)
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Registration failed.' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      token,
      user: formatUser(user)
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Login failed.' });
  }
};

exports.getCurrentUser = async (req, res) => {
  return res.status(200).json({ user: formatUser(req.user) });
};

exports.updateProfile = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Name is required.' });
    }

    req.user.name = name.trim();
    await req.user.save();

    return res.status(200).json({
      message: 'Profile updated successfully.',
      user: formatUser(req.user)
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Profile update failed.' });
  }
};
