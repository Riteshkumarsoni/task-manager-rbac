const db = require('../config/db');
const Joi = require('joi');

const createTask = (req, res) => {
  const schema = Joi.object({
    title: Joi.string().min(1).required(),
    description: Joi.string().allow('', null),
    status: Joi.string().valid('pending','in-progress','done').default('pending')
  });
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { title, description, status } = value;
  db.run(
    'INSERT INTO tasks (title, description, status, createdBy) VALUES (?, ?, ?, ?)',
    [title, description || '', status, req.user.id],
    function(err) {
      if (err) return res.status(500).json({ message: 'DB error inserting task' });
      db.get('SELECT * FROM tasks WHERE id = ?', [this.lastID], (err2, task) => {
        if (err2) return res.status(500).json({ message: 'DB error' });
        res.status(201).json(task);
      });
    }
  );
};

const getTasks = (req, res) => {
  if (req.user.role === 'admin') {
    db.all('SELECT tasks.*, users.username as createdByUsername FROM tasks LEFT JOIN users ON tasks.createdBy = users.id ORDER BY createdAt DESC', [], (err, rows) => {
      if (err) return res.status(500).json({ message: 'DB error' });
      res.json(rows);
    });
  } else {
    db.all('SELECT tasks.*, users.username as createdByUsername FROM tasks LEFT JOIN users ON tasks.createdBy = users.id WHERE createdBy = ? ORDER BY createdAt DESC', [req.user.id], (err, rows) => {
      if (err) return res.status(500).json({ message: 'DB error' });
      res.json(rows);
    });
  }
};

const getTask = (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, task) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (req.user.role !== 'admin' && task.createdBy !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    res.json(task);
  });
};

const updateTask = (req, res) => {
  const id = req.params.id;
  console.log(id)
  const schema = Joi.object({
    title: Joi.string().min(1),
    description: Joi.string().allow('', null),
    status: Joi.string().valid('pending','in-progress','done')
  });
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, task) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (req.user.role !== 'admin' && task.createdBy !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const title = value.title ?? task.title;
    const description = value.description ?? task.description;
    const status = value.status ?? task.status;

    db.run('UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?', [title, description, status, id], function(err2) {
      if (err2) return res.status(500).json({ message: 'DB error updating' });
      db.get('SELECT * FROM tasks WHERE id = ?', [id], (err3, updated) => {
        if (err3) return res.status(500).json({ message: 'DB error fetching updated' });
        res.json(updated);
      });
    });
  });
};

const deleteTask = (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, task) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (req.user.role !== 'admin' && task.createdBy !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    db.run('DELETE FROM tasks WHERE id = ?', [id], function(err2) {
      if (err2) return res.status(500).json({ message: 'DB error deleting' });
      res.json({ message: 'Task deleted' });
    });
  });
};

module.exports = { createTask, getTasks, getTask, updateTask, deleteTask };
