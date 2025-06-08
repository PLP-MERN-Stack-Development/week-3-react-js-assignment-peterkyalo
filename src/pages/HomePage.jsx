import React from 'react';
import TaskManager from '../components/TaskManager';

const HomePage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">
        Welcome to your Task Manager
      </h1>
      <TaskManager />
    </div>
  );
};

export default HomePage;