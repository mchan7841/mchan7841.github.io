import React, { useEffect } from 'react';

const ensureWidgets = () => {
  if (window.twttr?.widgets) {
    window.twttr.widgets.load();
    return;
  }
  if (document.getElementById('x-widgets')) {
    return;
  }
  const script = document.createElement('script');
  script.id = 'x-widgets';
  script.src = 'https://platform.twitter.com/widgets.js';
  script.async = true;
  script.onload = () => window.twttr?.widgets?.load();
  document.body.appendChild(script);
};

const XEmbed = ({ href, statusId }) => {
  useEffect(() => {
    ensureWidgets();
  }, [statusId]);

  return (
    <blockquote className="twitter-tweet" data-theme="dark" data-dnt="true">
      <a href={href}>View on X</a>
    </blockquote>
  );
};

export default XEmbed;
