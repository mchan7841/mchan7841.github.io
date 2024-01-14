import React from 'react';
import './PageContent.css'; // Import your CSS file

const PageContent = ({ children }) => {
  return <div className="page-content">{children}</div>;
};

export default PageContent;
