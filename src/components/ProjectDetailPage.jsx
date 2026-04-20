import { Link, useParams } from 'react-router-dom';
import { projects } from '../data/projects';
import './portfolio.css';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const project = projects.find((item) => String(item.id) === id);

  if (!project) {
    return (
      <div className="portfolio-container dark-mode" style={{ minHeight: '100vh', padding: '40px 20px' }}>
        <h1 style={{ color: '#fff', marginBottom: '12px' }}>Project not found</h1>
        <Link to="/projects" style={{ color: '#64ffda', textDecoration: 'none' }}>
          ← Back to projects
        </Link>
      </div>
    );
  }

  return (
    <div className="portfolio-container dark-mode" style={{ minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', background: 'rgba(13, 17, 23, 0.75)', borderRadius: '16px', padding: '24px' }}>
        <Link to="/projects" style={{ color: '#64ffda', textDecoration: 'none', display: 'inline-block', marginBottom: '16px' }}>
          ← Back to projects
        </Link>

        <h1 style={{ color: '#fff', marginBottom: '8px' }}>{project.title}</h1>
        {project.period && <p style={{ color: '#b9c0cc', marginBottom: '16px' }}>{project.period}</p>}
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            style={{ width: '100%', maxHeight: '420px', objectFit: 'cover', borderRadius: '12px', marginBottom: '16px' }}
          />
        )}
        <p style={{ color: '#dbe2ec', lineHeight: '1.7', marginBottom: '16px' }}>{project.description}</p>

        {project.technologies && project.technologies.length > 0 && (
          <div style={{ marginBottom: '20px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {project.technologies.map((tech) => (
              <span key={tech} className="tech-chip">
                {tech}
              </span>
            ))}
          </div>
        )}

        <h3 style={{ color: '#fff', marginBottom: '10px' }}>Project Details</h3>
        <p style={{ color: '#dbe2ec', lineHeight: '1.7' }}>{project.fullDetails}</p>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
