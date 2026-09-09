import React from 'react';
import projects from '../data/projects';
import XEmbed from '../components/XEmbed';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <h1>Matthew Chan</h1>
      </section>

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

export default Home;
