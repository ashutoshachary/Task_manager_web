import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateTask from './CreateTask';
import Task from './Task';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState({ status: 'All', priority: 'All' });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      const fetchTasks = async () => {
        const res = await axios.get('http://localhost:5000/api/tasks', {
          headers: { Authorization: token },
        });
        setTasks(res.data);
      };
      fetchTasks();
    }
  }, [navigate]);

  const handleTaskCreated = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleComplete = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/tasks/${taskId}`, { status: 'Completed' }, {
        headers: { Authorization: token },
      });
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === taskId ? { ...task, status: 'Completed' } : task))
      );
    } catch (error) {
      console.error('Error completing task', error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: token },
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    const statusMatch = filter.status === 'All' || task.status === filter.status;
    const priorityMatch = filter.priority === 'All' || task.priority === filter.priority;
    return statusMatch && priorityMatch;
  });

  return (
    <div>
      <nav className="navbar">
        <div className="app-name">Task Manager</div>
    
        <button onClick={handleLogout} className='button1'>Logout</button>
      </nav>

      <div className="filter-bar">
        <button onClick={() => setFilter({ ...filter, status: 'All' })}>All</button>
        <button onClick={() => setFilter({ ...filter, status: 'Completed' })}>Completed</button>
        <button onClick={() => setFilter({ ...filter, status: 'Pending' })}>Pending</button>
        
        <select onChange={(e) => setFilter({ ...filter, priority: e.target.value })}>
          <option value="All">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <h1>Create Your Tasks</h1>
      <CreateTask onTaskCreated={handleTaskCreated} />
      {filteredTasks.map((task) => (
        <Task key={task._id} task={task} onDelete={handleDelete} onComplete={handleComplete} />
      ))}
    </div>
  );
};

export default Dashboard;
