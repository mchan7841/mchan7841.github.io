import React from 'react';

const BrandMark = ({ className, title = 'Matthew Chan' }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 32"
    role="img"
    aria-label={title}
    width="36"
    height="18"
  >
    <path
      d="M2 16c4.5-14 8 14 12.5-3.5S23 28 27.5 14s8-16 12.5 4S48 26 52.5 12 58 8 62 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default BrandMark;
