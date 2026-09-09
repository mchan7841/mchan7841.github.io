import React from 'react';
import projects from '../data/projects';
import './Projects.css';

const Projects = () => {
  return (
    <div className="projects-page">
      <header className="page-intro">
        <p className="eyebrow">Selected work</p>
        <h1>Projects</h1>
        <p className="lede">
          What I shipped around Grok in Tesla and Robotaxi — voice, in-car
          guidance, and release work.
        </p>
      </header>

      <ul className="project-list">
        {projects.map((project, index) => (
          <li key={project.id}>
            <a
              className="project-row"
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="project-row__index">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="project-row__body">
                <div className="project-row__title-line">
                  <h2>{project.title}</h2>
                  <span className="tag">{project.tag}</span>
                </div>
                <p>{project.blurb}</p>
              </div>
              <span className="project-row__year">{project.year}</span>
              <span className="project-row__cta" aria-hidden="true">
                →
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
