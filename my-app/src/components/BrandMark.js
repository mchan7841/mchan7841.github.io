import React from 'react';

const BrandMark = ({ className, title = 'Matthew Chan' }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    role="img"
    aria-label={title}
    width="28"
    height="28"
  >
    <defs>
      <linearGradient id="brandMarkGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#e6c35c" />
        <stop offset="100%" stopColor="#c9a227" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="12" fill="#0c0b09" />
    <rect
      x="2"
      y="2"
      width="60"
      height="60"
      rx="10"
      fill="none"
      stroke="url(#brandMarkGrad)"
      strokeWidth="2"
    />
    <path
      d="M10 33c4-12 7 12 11-3s7 14 11-1 7-13 11 3 6 8 11-4"
      fill="none"
      stroke="url(#brandMarkGrad)"
      strokeWidth="3.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 38c4-7 7 7 11-2s7 8 11 0 7-7 11 2 6 5 11-2"
      fill="none"
      stroke="#e6c35c"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.35"
    />
  </svg>
);

export default BrandMark;
