import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Button from './Button';
import Card from './Card';

const TaskManager = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [newTaskText, setNewTaskText] = useState('');
  const [filter, setFilter] = useState('all');

  const addTask = (text) => {
    if (text.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now(), text, completed: false },
      ]);
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(newTaskText);
    setNewTaskText('');
  };

  return (
    <Card>
      <h2 className="text-2xl font-bold mb-6 text-center">My Tasks</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
          <Button type="submit" variant="primary">Add</Button>
        </div>
      </form>
      <div className="flex justify-center gap-2 mb-4 border-b dark:border-gray-700 pb-4">
        <Button variant={filter === 'all' ? 'primary' : 'secondary'} size="sm" onClick={() => setFilter('all')}>All</Button>
        <Button variant={filter === 'active' ? 'primary' : 'secondary'} size="sm" onClick={() => setFilter('active')}>Active</Button>
        <Button variant={filter === 'completed' ? 'primary' : 'secondary'} size="sm" onClick={() => setFilter('completed')}>Completed</Button>
      </div>
      <ul className="space-y-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <li key={task.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 transition-colors">
              <div className="flex items-center gap-3">
                <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"/>
                <span className={`transition-all ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}>
                  {task.text}
                </span>
              </div>
              <Button variant="danger" size="sm" onClick={() => deleteTask(task.id)}>Delete</Button>
            </li>
          ))
        ) : (
          <li className="text-center text-gray-500 dark:text-gray-400 py-4">No tasks to show.</li>
        )}
      </ul>
      <div className="mt-6 text-sm text-center text-gray-500 dark:text-gray-400">
        <p>{tasks.filter(t => !t.completed).length} tasks left</p>
      </div>
    </Card>
  );
};

export default TaskManager;