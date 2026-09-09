import React from 'react';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p>
          Matthew Chan &middot; {year} &middot;{' '}
          <a
            href="https://github.com/mchan7841"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/mchan7841
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
