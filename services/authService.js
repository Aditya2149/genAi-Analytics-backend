const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

class AuthService {
  static async signup(email, password) {
    const existingUser = await new Promise((resolve) => {
      User.findByEmail(email, (err, user) => resolve(user));
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    return new Promise((resolve, reject) => {
      User.createUser(email, hashedPassword, function(err) {
        if (err) return reject(err);
        resolve(this.lastID);
      });
    });
  }

  static async login(email, password) {
    const user = await new Promise((resolve) => {
      User.findByEmail(email, (err, user) => resolve(user));
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h'
    });

    return token;
  }
}

module.exports = AuthService;