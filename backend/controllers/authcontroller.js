const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const register = async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).required()
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { username, password } = req.body;
  try {
    // check existing
    db.get('SELECT * FROM users WHERE username = ?', [username], async (err, row) => {
      if (err) return res.status(500).json({ message: 'DB error' });
      if (row) return res.status(400).json({ message: 'Username already exists' });

      const hashed = await bcrypt.hash(password, 10);
      db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashed], function(err) {
        if (err) return res.status(500).json({ message: 'DB error inserting user' });
        const user = { id: this.lastID, username, role: 'user' };
        const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user });
      });
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const login = (req, res) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { username, password } = req.body;
  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const payload = { id: user.id, username: user.username, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: payload });
  });
};

module.exports = { register, login };
