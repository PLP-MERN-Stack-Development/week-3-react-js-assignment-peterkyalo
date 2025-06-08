import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ApiPage from './pages/ApiPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="api" element={<ApiPage />} />
        {/* You can add a 404 Not Found page here */}
        <Route path="*" element={
          <div className='text-center py-10'>
            <h1 className='text-4xl font-bold'>404 - Not Found</h1>
            <p className='mt-4'>Sorry, the page you are looking for does not exist.</p>
          </div>
        } />
      </Route>
    </Routes>
  );
}

export default App;