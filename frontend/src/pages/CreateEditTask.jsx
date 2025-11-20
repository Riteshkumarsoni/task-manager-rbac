import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import API from '../services/api';

const CreateEditTask = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const editingTask = location.state?.task;

  const handleSubmit = async (data) => {
    try {
      const cleanData = {title: data.title, description: data.description, status: data.status}
      if (id) {
        await API.put(`/tasks/${id}`, cleanData);
        alert('Task updated');
      } else {
        await API.post('/tasks', data);
        alert('Task created');
      }
      navigate('/');
    } catch (err) {
      //console.log(err?.response?.data?.message)
      alert(err?.response?.data?.message || 'Operation failed');
    }
  };

  return (
    <div className="create-edit-container">
      <img src='https://res.cloudinary.com/dh8g9mloe/image/upload/v1763618919/15401_trdyj7.jpg' alt='create-task' className='create-task-img' />
      <div>
        <h2 className='create-edit-heading'>{id ? 'Edit Task' : 'Create Task'}</h2>
        <TaskForm initial={editingTask || undefined} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default CreateEditTask;
