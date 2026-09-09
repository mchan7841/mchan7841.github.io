import React from 'react';
import { Link } from 'react-router-dom';
import projects from '../data/projects';
import './Home.css';

const Home = () => {
  const featured = projects.slice(0, 3);

  return (
    <div className="home">
      <section className="hero">
        <p className="eyebrow">Grok &middot; Tesla &middot; Robotaxi</p>
        <h1>
          Building the cabin voice for the road ahead.
        </h1>
        <p className="lede">
          Portfolio for Matthew Chan — work framed around Grok in Tesla and
          Robotaxi. Voice that drives climate, media, destination, and the world
          outside the windshield.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-primary" to="/projects">
            View projects
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

      <section className="home-featured" aria-labelledby="featured-heading">
        <div className="section-head">
          <h2 id="featured-heading">Featured</h2>
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
                <span className="project-card__cta">View on X →</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Home;
