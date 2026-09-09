import React, { useEffect, useRef } from 'react';
import './XEmbed.css';

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

const ArticleCard = ({ project }) => {
  const link = project.articleUrl || project.href;

  return (
    <a
      className="article-card"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <p className="article-card__kicker">X Article</p>
      <h3>{project.articleTitle}</h3>
      <ul>
        {project.highlights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <span className="article-card__cta">Open article</span>
    </a>
  );
};

const TweetEmbed = ({ href, statusId }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    ensureWidgets().then((twttr) => {
      if (cancelled || !mountRef.current || !twttr?.widgets) {
        return;
      }
      mountRef.current.innerHTML = '';
      twttr.widgets
        .createTweet(statusId, mountRef.current, {
          theme: 'dark',
          dnt: true,
          conversation: 'none',
          align: 'center',
          width: 520,
        })
        .then((el) => {
          if (!el && mountRef.current) {
            const quote = document.createElement('blockquote');
            quote.className = 'twitter-tweet';
            quote.setAttribute('data-theme', 'dark');
            quote.setAttribute('data-dnt', 'true');
            quote.setAttribute('data-conversation', 'none');
            const link = document.createElement('a');
            link.href = href;
            quote.appendChild(link);
            mountRef.current.appendChild(quote);
            twttr.widgets.load(mountRef.current);
          }
        });
    });

    return () => {
      cancelled = true;
    };
  }, [statusId, href]);

  return <div className="x-embed" ref={mountRef} />;
};

const XEmbed = ({ project }) => {
  if (project.kind === 'article') {
    return <ArticleCard project={project} />;
  }

  return <TweetEmbed href={project.href} statusId={project.statusId} />;
};

export default XEmbed;
