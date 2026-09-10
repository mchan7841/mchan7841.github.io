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

const fillWidth = (node) => {
  if (!node) {
    return;
  }
  node.style.margin = '0';
  node.style.width = '100%';
  node.style.maxWidth = '100%';
  node.style.display = 'block';
  const iframe =
    node.tagName === 'IFRAME' ? node : node.querySelector?.('iframe');
  if (iframe) {
    iframe.style.margin = '0';
    iframe.style.width = '100%';
    iframe.style.maxWidth = '100%';
    iframe.style.display = 'block';
  }
};

const XEmbed = ({ project }) => {
  const mountRef = useRef(null);
  const shellRef = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let resizeObserver;
    let renderToken = 0;
    let lastWidth = 0;
    setFailed(false);

    const render = (width) => {
      const w = Math.max(280, Math.min(550, Math.floor(width || 550)));
      if (lastWidth && Math.abs(w - lastWidth) < 16) {
        return;
      }
      lastWidth = w;
      const token = ++renderToken;

      ensureWidgets().then((twttr) => {
        if (cancelled || token !== renderToken || !mountRef.current || !twttr?.widgets) {
          return;
        }

        // One mount only — clear before createTweet so we never stack embeds.
        mountRef.current.innerHTML = '';
        setFailed(false);

        twttr.widgets
          .createTweet(project.statusId, mountRef.current, {
            theme: 'dark',
            dnt: true,
            conversation: 'none',
            width: w,
            cards: 'visible',
          })
          .then((el) => {
            if (cancelled || token !== renderToken) {
              return;
            }
            if (!el) {
              setFailed(true);
              return;
            }
            fillWidth(el);
          })
          .catch(() => {
            if (!cancelled && token === renderToken) {
              setFailed(true);
            }
          });
      });
    };

    const shell = shellRef.current;
    if (shell && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver((entries) => {
        const width = entries[0]?.contentRect?.width || 0;
        if (width > 0) {
          render(width);
        }
      });
      resizeObserver.observe(shell);
      // Don't also call render() here — observe already delivers the first size.
    } else {
      render(shell?.clientWidth || 550);
    }

    const mountNode = mountRef.current;
    return () => {
      cancelled = true;
      renderToken += 1;
      resizeObserver?.disconnect();
      if (mountNode) {
        mountNode.innerHTML = '';
      }
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
