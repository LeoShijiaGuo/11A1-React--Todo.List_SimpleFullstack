import React from 'react';

function Task({ task, markTask, deleteTask }) {
  return (
    <div style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
      {task.title}
      <button onClick={markTask}>{task.completed ? 'Unmark' : 'Mark'}</button>
      <button onClick={deleteTask}>Delete</button>
    </div>
  );
}

export default Task;