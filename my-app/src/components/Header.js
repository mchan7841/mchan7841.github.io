import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <NavLink to="/" className="site-logo" end>
          Matthew Chan
        </NavLink>
        <nav className="site-nav" aria-label="Primary">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/projects">Projects</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
