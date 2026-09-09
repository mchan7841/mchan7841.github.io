import React from 'react';
import projects from '../data/projects';
import XEmbed from '../components/XEmbed';
import './Home.css';

const EmbedCard = ({ project }) => (
  <li className="card card--embed">
    <div className="card__head">
      <h2>{project.title}</h2>
      <p>{project.blurb}</p>
    </div>
    <div className="card__body">
      <XEmbed project={project} />
    </div>
  </li>
);

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

const JobCard = ({ project }) => (
  <li className="card card--job">
    {project.image ? (
      <div className="card__media">
        <img src={project.image} alt={`${project.title} — ${project.role || project.blurb}`} />
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
          Software engineer at Tesla on voice and LLM experiences — automation,
          validation, and tooling that makes Grok features shippable.
        </p>
      </section>

      <section className="work" aria-label="Selected work">
        <h2 className="section-label">Selected work</h2>
        <ul className="card-list">
          {projects.map((project) => {
            if (project.kind === 'job') {
              return <JobCard key={project.id} project={project} />;
            }
            if (project.kind === 'article' || project.articleImage) {
              return <ArticleCard key={project.id} project={project} />;
            }
            return <EmbedCard key={project.id} project={project} />;
          })}
        </ul>
      </section>
    </div>
  );
};

export default Home;
