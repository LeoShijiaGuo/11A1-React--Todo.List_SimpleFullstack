import React from 'react';
import Task from './Task';

function TaskList({ tasks, markTask, deleteTask }) {
  return (
    <div>
      {tasks.map((task, index) => (
        <Task
          key={index}
          task={task}
          markTask={() => markTask(index)}
          deleteTask={() => deleteTask(index)}
        />
      ))}
    </div>
  );
}

export default TaskList;