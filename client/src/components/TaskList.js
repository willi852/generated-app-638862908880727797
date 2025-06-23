import React from 'react';

function TaskList({ tasks, onToggle, onDelete }) {
  return (
    <ul className="task-list">
      {tasks.map(task => (
        <li key={task._id} className={`task-item ${task.completed ? 'completed' : ''}`}>
          <span 
            onClick={() => onToggle(task._id)}
            className="task-title"
          >
            {task.title}
          </span>
          <button 
            onClick={() => onDelete(task._id)} 
            className="delete-btn"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;