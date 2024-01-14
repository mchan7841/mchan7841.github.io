// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import your CSS file

const Header = () => {
  return (
    <header>
      <div className="header-content">
        <h1>Matthew Chan</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/resume">Resume</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
