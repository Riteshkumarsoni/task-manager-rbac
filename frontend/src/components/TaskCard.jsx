import React from 'react';

const TaskCard = ({ task, onEdit, onDelete, currentUser }) => {
  const canEdit = currentUser && (currentUser.role === 'admin' || currentUser.id === task.createdBy);
  return (
    <div className='taskcard-container'>
      <h3 style={{ margin: 0 }}>Title: {task.title}</h3>
      <p className='small'>By: <span className='smallSpanEl'>{task.createdByUsername || 'Unknown'}</span></p>
      <p className='small'>Description: <span className='smallSpanEl'>{task.description}</span></p>
      <div className="small">Status: <span className='smallSpanEl'>{task.status}</span></div>
      <div style={{ marginTop: 8 }}>
        {canEdit && <button onClick={() => onEdit(task)} className='task-edit-btn'>Edit</button>}
        {canEdit && <button onClick={() => onDelete(task.id)} className='task-delete-btn'>Delete</button>}
      </div>
    </div>
  );
};

export default TaskCard;
