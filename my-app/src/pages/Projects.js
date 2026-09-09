import React from 'react';
import projects from '../data/projects';
import XEmbed from '../components/XEmbed';
import './Projects.css';

const Projects = () => {
  return (
    <div className="projects-page">
      <header className="page-intro">
        <h1>Projects</h1>
      </header>

      <ul className="embed-list">
        {projects.map((project) => (
          <li key={project.id} className="embed-item">
            <h2>{project.title}</h2>
            <XEmbed href={project.href} statusId={project.statusId} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
