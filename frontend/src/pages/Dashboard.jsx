import React, { useEffect, useState, useContext } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import TaskCard from '../components/TaskCard';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      alert('Error fetching tasks');
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, []);

  const handleEdit = (task) => {
    navigate(`/edit/${task.id}`, { state: { task } });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete task?')) return;
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      alert(err?.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div>
      <div className='dashboard-container'>
        <h2>Dashboard <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg></h2>
        <h2 className='dashboard-user-greeting'>Welcome, {user?.username}</h2>
        <button onClick={() => navigate('/create')} className='dashboard-create-task-btn' type='button'>Create Task</button>
      </div>

      <div style={{ marginTop: 18 }} className="task-grid">
        {tasks.length === 0 ? <div>No tasks found</div> : tasks.map(t => (
          <TaskCard key={t.id} task={t} onEdit={handleEdit} onDelete={handleDelete} currentUser={user}/>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
