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

const JobCard = ({ project }) => (
  <li className="card card--job">
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
          Software engineer at Tesla with a focus on voice and LLM experiences.
        </p>
      </section>

      <section className="work" aria-label="Selected work">
        <h2 className="section-label">Selected work</h2>
        <ul className="card-list">
          {projects.map((project) =>
            project.kind === 'job' ? (
              <JobCard key={project.id} project={project} />
            ) : (
              <EmbedCard key={project.id} project={project} />
            )
          )}
        </ul>
      </section>
    </div>
  );
};

export default Home;
