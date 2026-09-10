import React from 'react';
import projects from '../data/projects';
import './Home.css';

const ArticleCard = ({ project }) => (
  <li className="card card--article">
    <div className="card__head">
      <h2>{project.title}</h2>
      <p>{project.blurb}</p>
    </div>
    <div className="card__body card__body--article">
      <a
        className="article-preview"
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {project.articleImage ? (
          <img
            className="article-preview__image"
            src={project.articleImage}
            alt={project.articleTitle || project.title}
          />
        ) : null}
        <div className="article-preview__meta">
          <span className="article-preview__eyebrow">Article</span>
          <span className="article-preview__title">
            {project.articleTitle || project.title}
          </span>
        </div>
      </a>
    </div>
  </li>
);

const TweetCard = ({ project }) => {
  const tweet = project.tweet;
  return (
    <li className="card card--tweet">
      <div className="card__head">
        <h2>{project.title}</h2>
        <p>{project.blurb}</p>
      </div>
      <div className="card__body card__body--tweet">
        <a
          className="tweet-preview"
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="tweet-preview__header">
            <img
              className="tweet-preview__avatar"
              src={tweet.avatar}
              alt=""
              width="40"
              height="40"
            />
            <div className="tweet-preview__identity">
              <span className="tweet-preview__name">{tweet.name}</span>
              <span className="tweet-preview__handle">@{tweet.handle}</span>
            </div>
          </div>
          <p className="tweet-preview__text">{tweet.text}</p>
          {tweet.quote ? (
            <div className="tweet-preview__quote">
              <span className="tweet-preview__quote-name">
                {tweet.quote.name}{' '}
                <span className="tweet-preview__handle">
                  @{tweet.quote.handle}
                </span>
              </span>
              <p>{tweet.quote.text}</p>
            </div>
          ) : null}
          {tweet.image ? (
            <img
              className="tweet-preview__image"
              src={tweet.image}
              alt=""
            />
          ) : null}
          {tweet.meta ? (
            <p className="tweet-preview__meta">{tweet.meta}</p>
          ) : null}
        </a>
      </div>
    </li>
  );
};

const JobCard = ({ project }) => (
  <li className="card card--job">
    {project.image ? (
      <div className="card__media">
        <img
          src={project.image}
          alt={`${project.title} — ${project.role || project.blurb}`}
        />
      </div>
    ) : null}
    <div className="card__head">
      <p className="card__eyebrow">Previously</p>
      <h2>{project.title}</h2>
      {project.role ? <p className="card__role">{project.role}</p> : null}
      <p>{project.blurb}</p>
    </div>
  </li>
);

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <h1>Matthew Chan</h1>
        <p className="bio">
          Software engineer at Tesla on voice and LLM experiences. I build
          automation and validation tooling so Grok features ship reliably.
        </p>
      </section>

      <section className="work" aria-label="Selected work">
        <h2 className="section-label">Selected work</h2>
        <ul className="card-list">
          {projects.map((project) => {
            if (project.kind === 'job') {
              return <JobCard key={project.id} project={project} />;
            }
            if (project.kind === 'article') {
              return <ArticleCard key={project.id} project={project} />;
            }
            return <TweetCard key={project.id} project={project} />;
          })}
        </ul>
      </section>
    </div>
  );
};

export default Home;
