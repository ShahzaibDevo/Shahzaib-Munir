import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { projects } from './ProjectsPage';
import '../components/portfolio.css';

const buildFallbackHighlights = (project) => {
  const highlights = [];

  if (project.technologies?.length) {
    highlights.push(`Implemented using ${project.technologies.slice(0, 3).join(', ')}.`);
  }

  highlights.push('Designed to improve deployment speed, reliability, and maintainability.');
  highlights.push('Built with production-focused practices and scalable infrastructure patterns.');

  return highlights;
};

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = useMemo(
    () => projects.find((item) => String(item.id) === id),
    [id]
  );

  if (!project) {
    return (
      <div className="portfolio-container dark-mode" style={{ minHeight: '100vh' }}>
        <main className="main-content" style={{ paddingInline: '20px' }}>
          <div
            style={{
              maxWidth: '900px',
              margin: '0 auto',
              background: 'rgba(13, 17, 23, 0.75)',
              borderRadius: '16px',
              padding: '24px'
            }}
          >
            <button
              type="button"
              onClick={() => navigate('/projects')}
              style={{
                background: 'transparent',
                border: '1px solid #64ffda',
                color: '#64ffda',
                borderRadius: '10px',
                padding: '10px 14px',
                cursor: 'pointer',
                marginBottom: '16px'
              }}
            >
              ← Back to Projects
            </button>
            <h1 style={{ color: '#fff' }}>Project not found</h1>
          </div>
        </main>
      </div>
    );
  }

  const fullDescription = project.fullDescription || project.description;
  const highlights = project.highlights?.length ? project.highlights : buildFallbackHighlights(project);

  return (
    <div className="portfolio-container dark-mode" style={{ minHeight: '100vh' }}>
      <main className="main-content" style={{ paddingInline: '20px' }}>
        <div
          style={{
            maxWidth: '950px',
            margin: '0 auto',
            background: 'rgba(13, 17, 23, 0.75)',
            borderRadius: '16px',
            padding: '24px'
          }}
        >
          <button
            type="button"
            onClick={() => navigate('/projects')}
            style={{
              background: 'transparent',
              border: '1px solid #64ffda',
              color: '#64ffda',
              borderRadius: '10px',
              padding: '10px 14px',
              cursor: 'pointer',
              marginBottom: '16px'
            }}
          >
            ← Back to Projects
          </button>

          <h1 style={{ color: '#fff', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', marginBottom: '16px' }}>
            {project.title}
          </h1>

          {project.image && (
            <img
              src={project.image}
              alt={project.title}
              style={{
                width: '100%',
                maxHeight: '460px',
                objectFit: 'cover',
                borderRadius: '12px',
                marginBottom: '18px'
              }}
            />
          )}

          <p style={{ color: '#dbe2ec', lineHeight: 1.8, marginBottom: '22px' }}>{fullDescription}</p>

          <section style={{ marginBottom: '22px' }}>
            <h3 style={{ color: '#fff', marginBottom: '10px' }}>Tech Stack</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {(project.technologies || []).map((tech) => (
                <span
                  key={tech}
                  style={{
                    background: 'rgba(100, 255, 218, 0.15)',
                    color: '#64ffda',
                    border: '1px solid rgba(100, 255, 218, 0.35)',
                    borderRadius: '999px',
                    padding: '6px 12px',
                    fontSize: '0.9rem'
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          <section style={{ marginBottom: '22px' }}>
            <a
              href={project.githubLink || 'https://github.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="btn github-btn"
            >
              Open GitHub
            </a>
          </section>

          <section>
            <h3 style={{ color: '#fff', marginBottom: '10px' }}>Key Highlights</h3>
            <ul style={{ color: '#dbe2ec', paddingLeft: '20px', lineHeight: 1.8 }}>
              {highlights.map((point, index) => (
                <li key={`${project.id}-highlight-${index}`}>{point}</li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetailPage;
