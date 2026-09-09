import React from 'react';
import { Link } from 'react-router-dom';
import projects from '../data/projects';
import './Home.css';

const Home = () => {
  const featured = projects.filter((project) => project.featured);

  return (
    <div className="home">
      <section className="hero">
        <p className="eyebrow">Portfolio</p>
        <h1>Matthew Chan</h1>
        <p className="lede">
          I work on Grok in Tesla and Robotaxi — voice, in-car product, and the
          software releases that ship it.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-primary" to="/projects">
            Selected work
          </Link>
          <a
            className="btn btn-ghost"
            href="https://github.com/mchan7841"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </section>

      <section className="home-featured" aria-labelledby="work-heading">
        <div className="section-head">
          <h2 id="work-heading">Featured</h2>
          <Link to="/projects" className="section-link">
            All projects
          </Link>
        </div>
        <ul className="project-grid">
          {featured.map((project) => (
            <li key={project.id}>
              <a
                className="project-card"
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="project-card__meta">
                  <span className="tag">{project.tag}</span>
                  <span className="year">{project.year}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.blurb}</p>
                <span className="project-card__cta">Open write-up →</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Home;
