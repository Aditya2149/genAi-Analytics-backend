const AuthService = require('../services/authService');

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    await AuthService.signup(email, password);
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await AuthService.login(email, password);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};