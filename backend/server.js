require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const db = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

// simple root
app.get('/', (req, res) => res.json({ message: 'Task Manager RBAC API' }));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// fallback
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
