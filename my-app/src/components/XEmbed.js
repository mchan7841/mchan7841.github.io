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
  const shellRef = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let resizeObserver;
    setFailed(false);

    const render = (width) => {
      ensureWidgets().then((twttr) => {
        if (cancelled || !mountRef.current || !twttr?.widgets) {
          return;
        }

        mountRef.current.innerHTML = '';

        const embedWidth = Math.max(
          280,
          Math.min(550, Math.floor(width || 550))
        );

        twttr.widgets
          .createTweet(project.statusId, mountRef.current, {
            theme: 'dark',
            dnt: true,
            conversation: 'none',
            align: 'center',
            width: embedWidth,
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
    };

    const shell = shellRef.current;
    if (shell && typeof ResizeObserver !== 'undefined') {
      let last = 0;
      resizeObserver = new ResizeObserver((entries) => {
        const w = entries[0]?.contentRect?.width || 0;
        // Avoid thrashing on tiny deltas
        if (Math.abs(w - last) < 24 && last !== 0) {
          return;
        }
        last = w;
        render(w);
      });
      resizeObserver.observe(shell);
      render(shell.clientWidth);
    } else {
      render(shell?.clientWidth || 550);
    }

    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
    };
  }, [project.statusId]);

  return (
    <div className="x-embed" ref={shellRef}>
      <div className="x-embed__mount" ref={mountRef} />
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
