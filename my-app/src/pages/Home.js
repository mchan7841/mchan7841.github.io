import React from 'react';
import projects from '../data/projects';
import XEmbed from '../components/XEmbed';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <h1>Matthew Chan</h1>
        <p className="bio">
          Software engineer at Tesla with a focus on voice and LLM experiences.
        </p>
      </section>

      <ul className="embed-list">
        {projects.map((project) => (
          <li key={project.id} className="embed-card">
            <div className="embed-card__head">
              <h2>{project.title}</h2>
              <p>{project.blurb}</p>
            </div>
            <div className="embed-card__body">
              <XEmbed href={project.href} statusId={project.statusId} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
