import React from 'react';
import { NavLink } from 'react-router-dom';
import BrandMark from './BrandMark';
import './Header.css';

const Header = () => {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <NavLink to="/" className="site-logo" end>
          <BrandMark className="site-logo__mark" />
          <span className="site-logo__word">Matthew Chan</span>
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
