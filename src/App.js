import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskInput from './TaskInput';
import TaskList from './TaskList';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('/api/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const addTask = (newTask) => {
    axios.post('/api/tasks', newTask)
      .then(response => setTasks([...tasks, response.data]))
      .catch(error => console.error('Error adding task:', error));
  };

  const markTask = (index) => {
    axios.put(`/api/tasks/${index}`)
      .then(response => {
        const newTasks = [...tasks];
        newTasks[index] = response.data;
        setTasks(newTasks);
      })
      .catch(error => console.error('Error marking task:', error));
  };

  const deleteTask = (index) => {
    axios.delete(`/api/tasks/${index}`)
      .then(() => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <TaskInput addTask={addTask} />
      <TaskList tasks={tasks} markTask={markTask} deleteTask={deleteTask} />
    </div>
  );
}

export default App;