import React, { useEffect, useRef, useState } from 'react';

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
    script.charset = 'utf-8';
    script.onload = () => resolve(window.twttr);
    document.body.appendChild(script);
  });

const XEmbed = ({ project }) => {
  const mountRef = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setFailed(false);

    ensureWidgets().then((twttr) => {
      if (cancelled || !mountRef.current || !twttr?.widgets) {
        return;
      }

      mountRef.current.innerHTML = '';

      // Native tweet embed — article posts render with the article preview card.
      twttr.widgets
        .createTweet(project.statusId, mountRef.current, {
          theme: 'dark',
          dnt: true,
          conversation: 'none',
          align: 'center',
          width: 550,
          cards: 'visible',
        })
        .then((el) => {
          if (cancelled) {
            return;
          }
          if (!el) {
            setFailed(true);
          }
        })
        .catch(() => {
          if (!cancelled) {
            setFailed(true);
          }
        });
    });

    return () => {
      cancelled = true;
    };
  }, [project.statusId]);

  return (
    <div className="x-embed">
      <div ref={mountRef} />
      {failed ? (
        <iframe
          className="x-embed__iframe"
          title={project.title}
          src={`https://platform.twitter.com/embed/Tweet.html?id=${project.statusId}&theme=dark&dnt=true`}
          loading="lazy"
        />
      ) : null}
    </div>
  );
};

export default XEmbed;
