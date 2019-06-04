import React from 'react';
import './app-header.css';

const AppHeader = ({ active = 3, done = 1 }) => {
  return (<div className="app-header d-flex">
    <div className="header-title">My Todo List</div>
    <div><span>active task:{active}, done task: {done}</span></div>

  </div>);
};

export default AppHeader;