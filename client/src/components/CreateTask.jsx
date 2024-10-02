import React, { useState } from 'react';
import axios from 'axios';

const CreateTask = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const newTask = { title, description, status, priority, due_date: dueDate };
      const res = await axios.post('http://100.20.92.101:5000/api/tasks', newTask, {
        headers: { Authorization: token },
      });
      onTaskCreated(res.data);
      setTitle('');
      setDescription('');
      setDueDate('');
      setStatus('Pending');
      setPriority('Medium');
      setError('');
    } catch (err) {
      setError('Error creating task. Please try again.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <button type="submit">Create Task</button>
    </form>
  );
};


export default CreateTask;
