import React from 'react';
import ApiData from '../components/ApiData';

const ApiPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">
        API Data Display
      </h1>
      <ApiData />
    </div>
  );
};

export default ApiPage;