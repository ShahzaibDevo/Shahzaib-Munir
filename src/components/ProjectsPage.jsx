import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import './portfolio.css';

const ProjectsPage = () => {
  return (
    <div className="portfolio-container dark-mode" style={{ minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ color: '#64ffda', textDecoration: 'none' }}>
            ← Back to home
          </Link>
        </div>

        <h1 style={{ color: '#fff', marginBottom: '20px' }}>Projects</h1>

        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-wrapper">
              <div className="project-card">
                <h3>{project.title}</h3>
                {project.period && <p className="project-period">{project.period}</p>}
                {project.image && (
                  <div className="project-image">
                    <img src={project.image} alt={project.title} />
                  </div>
                )}
                <p className="project-description">{project.description}</p>
                {project.technologies && (
                  <div className="project-tech">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="tech-chip">{tech}</span>
                    ))}
                  </div>
                )}
                <div className="project-buttons">
                  <a href={project.githubLink || 'https://github.com'} target="_blank" rel="noopener noreferrer" className="btn github-btn">GitHub</a>
                  <Link to={`/projects/${project.id}`} className="view-project-btn" style={{ textDecoration: 'none' }}>
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
