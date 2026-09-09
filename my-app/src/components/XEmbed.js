import React, { useEffect, useRef } from 'react';

const ensureWidgets = () =>
  new Promise((resolve) => {
    if (window.twttr?.widgets) {
      resolve(window.twttr);
      return;
    }
    const existing = document.getElementById('x-widgets');
    if (existing) {
      existing.addEventListener('load', () => resolve(window.twttr), {
        once: true,
      });
      return;
    }
    const script = document.createElement('script');
    script.id = 'x-widgets';
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    script.onload = () => resolve(window.twttr);
    document.body.appendChild(script);
  });

const XEmbed = ({ href, statusId }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    ensureWidgets().then((twttr) => {
      if (cancelled || !mountRef.current || !twttr?.widgets) {
        return;
      }
      mountRef.current.innerHTML = '';
      twttr.widgets.createTweet(statusId, mountRef.current, {
        theme: 'dark',
        dnt: true,
        conversation: 'none',
        align: 'center',
        width: 550,
      });
    });

    return () => {
      cancelled = true;
    };
  }, [statusId, href]);

  return <div className="x-embed" ref={mountRef} />;
};

export default XEmbed;
