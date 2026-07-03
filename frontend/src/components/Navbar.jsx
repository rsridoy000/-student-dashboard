import React from 'react';

const Navbar = ({ totalStudents }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span className="logo-icon">🎓</span>
          <span className="logo-text">Student <span>Dashboard</span></span>
        </div>
        <div className="navbar-stats">
          <div className="stat-badge">
            <span className="stat-label">Total Students</span>
            <span className="stat-count">{totalStudents}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
