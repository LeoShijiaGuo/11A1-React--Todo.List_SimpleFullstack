const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let tasks = [];

// API routes
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const task = { title: req.body.title, completed: false };
  tasks.push(task);
  res.json(task);
});

app.put('/api/tasks/:index', (req, res) => {
  const { index } = req.params;
  if (tasks[index]) {
    tasks[index].completed = !tasks[index].completed;
    res.json(tasks[index]);
  } else {
    res.status(404).send('Task not found');
  }
});

app.delete('/api/tasks/:index', (req, res) => {
  const { index } = req.params;
  if (tasks[index]) {
    tasks = tasks.filter((_, i) => i !== parseInt(index));
    res.status(204).send();
  } else {
    res.status(404).send('Task not found');
  }
});

// Serve React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});