import React from 'react';
import './task.css';

const Task = ({ task, onDelete, onComplete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return '#ffc107';
      case 'In Progress':
        return '#007bff';
      case 'Completed':
        return '#28a745';
      default:
        return '#000';
    }
  };
  return (
    <div className="task-card" style={{ borderColor: getStatusColor(task.status) }}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p style={{ color: getStatusColor(task.status) }}>Status: {task.status}</p>
      <p>Priority: {task.priority}</p>
      <p>Due Date: {new Date(task.due_date).toLocaleDateString()}</p>
      <div className="button-group">
        <button className="complete-button" onClick={() => onComplete(task._id)}>✔️ Complete</button>
        <button className="delete-button" onClick={() => onDelete(task._id)}>❌ Delete</button>
      </div>
    </div>
  );
};

export default Task;
