import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../components/portfolio.css';
import kodekloudCert from '../assets/cert.png';

export const projects = [
  {
    id: 1,
    title: '100 Days of DevOps Challenge (KodeKloud)',
    description:
      'Successfully completed the 100 Days of DevOps Challenge from KodeKloud, performing daily hands-on labs covering real-world DevOps tools, cloud infrastructure, and automation practices.',
    githubLink: 'https://github.com/ShahzaibDevo/100-Days-of-Devops',
    image: kodekloudCert,
    technologies: ['Linux', 'Docker', 'Kubernetes', 'AWS', 'CI/CD']
  },
  {
    id: 2,
    title: 'CI/CD and DevOps',
    description:
      'Designed and implemented a complete CI/CD pipeline using Jenkins, Docker, and Kubernetes. Automated testing and deployment processes, reducing deployment time by 70%.',
    image: 'https://www.veritis.com/wp-content/uploads/2021/03/continuous-delivery-cd.jpg',
    technologies: ['Jenkins', 'Docker', 'Kubernetes', 'CI/CD']
  },
  {
    id: 3,
    title: 'Three Tier Application',
    description:
      'Built a scalable three-tier web application on AWS with Terraform for infrastructure as code. Implemented auto-scaling and load balancing for high availability.',
    image: 'https://media.geeksforgeeks.org/wp-content/uploads/20231108115918/Three-Tier-architecture.png',
    technologies: ['AWS', 'Terraform', 'Load Balancer', 'Auto Scaling']
  },
  {
    id: 4,
    title: 'Cloud Infrastructure and Web Application',
    description:
      'Developed a cloud-native web application with microservices architecture. Utilized AWS EKS for container orchestration and implemented monitoring with Prometheus and Grafana.',
    technologies: ['Microservices', 'AWS EKS', 'Prometheus', 'Grafana']
  },
  {
    id: 5,
    title: 'Cloud Infrastructure Modernization',
    description:
      'Modernized business cloud infrastructure by improving architecture and migrating environments toward AWS Control Tower governance while following AWS Well-Architected Framework principles.',
    technologies: [
      'AWS Control Tower',
      'Well-Architected Framework',
      'Cloud Migration',
      'Infrastructure Optimization'
    ],
    githubLink: 'https://github.com'
  },
  {
    id: 6,
    title: 'EKS Application Deployment',
    description:
      'Deployed multiple containerized applications on Amazon EKS using Helm charts and implemented multi-environment deployment pipelines including Development, Staging, and Production environments.',
    technologies: ['Amazon EKS', 'Helm', 'Kubernetes', 'CI/CD'],
    githubLink: 'https://github.com'
  },
  {
    id: 7,
    title: 'Multi-Platform Application Deployment',
    description:
      'Deployed web applications on EC2, ECS, and EKS. Mobile app deployment on AWS Amplify and Python-based applications on AWS App Runner.',
    technologies: ['EC2', 'ECS', 'EKS', 'AWS Amplify', 'App Runner'],
    githubLink: 'https://github.com/ShahzaibDevo'
  },
  {
    id: 8,
    title: 'Image Optimization & LLM Deployment',
    description:
      'Successfully optimized Docker image from 1TB to 16GB and deployed LLM model on serverless services using RunPod.',
    technologies: ['Docker Optimization', 'LLM', 'Serverless', 'RunPod'],
    githubLink: 'https://github.com/ShahzaibDevo'
  },
  {
    id: 9,
    title: 'Automated Docker Migration Pipeline',
    description:
      'Migrated 1TB Docker images from RunPods to AWS GPU-based EC2 instances using automated CI/CD pipeline. Eliminated manual intervention and integrated RDS deployment for complete automation.',
    technologies: ['Docker Migration', 'AWS GPU EC2', 'CI/CD Pipeline', 'RDS'],
    githubLink: 'https://github.com/ShahzaibDevo'
  }
];

const ProjectsPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="portfolio-container dark-mode">
      <nav className="top-navbar">
        <div className="nav-header">
          <div className="brand-name">Shahzaib Munir</div>
          <button
            type="button"
            className="menu-toggle"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <li><Link to="/#home" style={{ color: 'inherit', textDecoration: 'none' }} onClick={closeMenu}>Home</Link></li>
          <li><Link to="/#experience" style={{ color: 'inherit', textDecoration: 'none' }} onClick={closeMenu}>Experience</Link></li>
          <li className="active"><Link to="/projects" style={{ color: 'inherit', textDecoration: 'none' }} onClick={closeMenu}>Projects</Link></li>
          <li><Link to="/#infrastructure" style={{ color: 'inherit', textDecoration: 'none' }} onClick={closeMenu}>Infrastructure</Link></li>
          <li><Link to="/#services" style={{ color: 'inherit', textDecoration: 'none' }} onClick={closeMenu}>Services</Link></li>
          <li><Link to="/#skills" style={{ color: 'inherit', textDecoration: 'none' }} onClick={closeMenu}>Skills</Link></li>
          <li><Link to="/#awards" style={{ color: 'inherit', textDecoration: 'none' }} onClick={closeMenu}>Awards</Link></li>
          <li><Link to="/#contact" style={{ color: 'inherit', textDecoration: 'none' }} onClick={closeMenu}>Contact</Link></li>
        </ul>
      </nav>

      <main className="main-content" style={{ paddingInline: '24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '20px' }}>
            <Link to="/" style={{ color: '#64ffda', textDecoration: 'none' }}>← Back to Home</Link>
          </div>

          <h2
            className="section-title-projects"
            style={{ textAlign: 'center', width: '100%', display: 'block', margin: '0 auto 40px auto' }}
          >
            My Projects
          </h2>

          <div className="projects-grid" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
            {projects.map((project) => (
              <div key={project.id} className="project-wrapper">
                <div className="project-card">
                  <h3>{project.title}</h3>
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
                    <a href={project.githubLink || 'https://github.com'} target="_blank" rel="noopener noreferrer" className="btn github-btn">
                      GitHub
                    </a>
                    <Link to={`/projects/${project.id}`} className="view-project-btn" style={{ textDecoration: 'none' }}>
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectsPage;
