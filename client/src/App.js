import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/App.css';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks');
      setTasks(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch tasks');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (title) => {
    try {
      const response = await axios.post('/api/tasks', { title });
      setTasks([...tasks, response.data]);
    } catch (err) {
      setError('Failed to add task');
    }
  };

  const toggleTask = async (id) => {
    try {
      const taskToToggle = tasks.find(task => task._id === id);
      const response = await axios.patch(`/api/tasks/${id}`, {
        completed: !taskToToggle.completed
      });
      
      setTasks(tasks.map(task => 
        task._id === id ? response.data : task
      ));
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="app">
      <h1>Todo List</h1>
      <TaskForm onAdd={addTask} />
      <TaskList 
        tasks={tasks} 
        onToggle={toggleTask} 
        onDelete={deleteTask} 
      />
    </div>
  );
}

export default App;