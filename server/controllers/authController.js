import ADMIN from '../model/AdminModel.js';
import jwt from 'jsonwebtoken';

export const logIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await ADMIN.findOne({ username });

    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { userId: admin._id, isAdmin: admin.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    res.json({ token, isAdmin: admin.isAdmin });
  } catch (error) {}
};

export const signUp = async (req, res) => {
  try {
    const { username, password, adminCode } = req.body;

    // Check if username already exists
    const existingUser = await ADMIN.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Verify admin code (you should store this securely in environment variables)
    if (adminCode !== process.env.ADMIN_REGISTRATION_CODE) {
      return res
        .status(403)
        .json({ message: 'Invalid admin registration code' });
    }

    // Create new admin user
    const user = new ADMIN({
      username,
      password,
      isAdmin: true, // Since this is admin signup
    });

    await user.save();

    // Generate token
    const token = jwt.sign(
      { userId: user._id, isAdmin: true, username: username},
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({ token, isAdmin: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
