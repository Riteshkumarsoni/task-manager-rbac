import React, { useState } from 'react';

const TaskForm = ({ initial = { title: '', description: '', status: 'pending' }, onSubmit }) => {
  const [form, setForm] = useState(initial);
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.title) return alert('Title required');
    onSubmit(form);
  };

  return (
    <form onSubmit={submit}>
      <label htmlFor='title'>Title</label>
      <input id='title' name="title" value={form.title} onChange={handleChange} />
      <label htmlFor='description'>Description</label>
      <textarea id='description' name="description" value={form.description} onChange={handleChange} />
      <label htmlFor='status'>Status</label>
      <select id='status' name="status" value={form.status} onChange={handleChange}>
        <option value="pending">pending</option>
        <option value="in-progress">in-progress</option>
        <option value="done">done</option>
      </select>
      <div>
        <button type="submit" className='save-btn'>Save</button>
      </div>
    </form>
  );
};

export default TaskForm;
