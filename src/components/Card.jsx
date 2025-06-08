import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ children, className = '' }) => {
  const cardClasses = `bg-white dark:bg-gray-800 overflow-hidden shadow-md rounded-lg p-6 ${className}`;
  return <div className={cardClasses}>{children}</div>;
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Card;