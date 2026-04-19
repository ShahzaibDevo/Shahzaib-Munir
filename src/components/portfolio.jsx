// Portfolio.jsx
import React, { useState, useEffect, useRef } from 'react';
import './portfolio.css';
import StackCr from './cr@/StackCr';
import resume from "../assets/Shahzaib_Resume-2 (1).pdf";
import kodekloudCert from "../assets/cert.png";
import { MdDarkMode, MdLightMode } from 'react-icons/md';
const Portfolio = () => {
  //fix bio and add email.js
  // ---------------------------------------------------------------- Hooks
  const [activeSection, setActiveSection] = useState('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [theme, setTheme] = useState('dark');
  const sectionRefs = {
    home: useRef(null),
    experience: useRef(null),
    projects: useRef(null),
    infrastructure: useRef(null),
    services: useRef(null),
    skills: useRef(null),
    awards: useRef(null),
    contact: useRef(null)
  };

  // Scroll to section when sidebar item is clicked
  const scrollToSection = (section) => {
    sectionRefs[section].current?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(section);
  };

  // Handle scroll event to update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      Object.entries(sectionRefs).forEach(([section, ref]) => {
        if (ref.current) {
          const sectionTop = ref.current.offsetTop;
          const sectionHeight = ref.current.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Open project modal
  const openProjectModal = (project) => {
    setCurrentProject(project);
    setIsModalOpen(true);
  };

  // Close project modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProject(null);
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };



  // Project data
  const projects = [
    {
      id: 1,
      title: "100 Days of DevOps Challenge (KodeKloud)",
      description: "Successfully completed the 100 Days of DevOps Challenge from KodeKloud, performing daily hands-on labs covering real-world DevOps tools, cloud infrastructure, and automation practices.",
      githubLink: "https://github.com/ShahzaibDevo/100-Days-of-Devops",
      image: kodekloudCert
    },
    {
      id: 2,
      title: "CI/CD and DevOps",
      period: "September 2024 – November 2024",
      description: "Designed and implemented a complete CI/CD pipeline using Jenkins, Docker, and Kubernetes. Automated testing and deployment processes, reducing deployment time by 70%.",
      image: "https://www.veritis.com/wp-content/uploads/2021/03/continuous-delivery-cd.jpg"
    },
    {
      id: 3,
      title: "Three Tier Application",
      period: "August 2025 – November 2025",
      description: "Built a scalable three-tier web application on AWS with Terraform for infrastructure as code. Implemented auto-scaling and load balancing for high availability.",
      image: "https://media.geeksforgeeks.org/wp-content/uploads/20231108115918/Three-Tier-architecture.png"
    },
    {
      id: 4,
      title: "Cloud Infrastructure and Web Application",
      period: "January 2025 – July 2025",
      description: "Developed a cloud-native web application with microservices architecture. Utilized AWS EKS for container orchestration and implemented monitoring with Prometheus and Grafana."
    },
    {
      id: 5,
      title: "Cloud Infrastructure Modernization",
      description: "Modernized business cloud infrastructure by improving architecture and migrating environments toward AWS Control Tower governance while following AWS Well-Architected Framework principles.",
      technologies: ["AWS Control Tower", "AWS Well-Architected Framework", "Cloud Migration", "Infrastructure Optimization"],
      githubLink: "https://github.com"
    },
    {
      id: 6,
      title: "EKS Application Deployment",
      description: "Deployed multiple containerized applications on Amazon EKS using Helm charts and implemented multi-environment deployment pipelines including Development, Staging, and Production environments.",
      technologies: ["Amazon EKS", "Helm", "Kubernetes", "CI/CD Pipelines", "Multi-Environment Deployment"],
      githubLink: "https://github.com"
    },
    {
      id: 7,
      title: "Multi-Platform Application Deployment",
      description: "Deployed web applications on EC2, ECS, and EKS. Mobile app deployment on AWS Amplify and Python-based applications on AWS App Runner.",
      technologies: ["EC2", "ECS", "EKS", "AWS Amplify", "App Runner"],
      githubLink: "https://github.com/ShahzaibDevo"
    },
    {
      id: 8,
      title: "Image Optimization & LLM Deployment",
      description: "Successfully optimized Docker image from 1TB to 16GB and deployed LLM model on serverless services using RunPod.",
      technologies: ["Docker Optimization", "LLM", "Serverless", "RunPod"],
      githubLink: "https://github.com/ShahzaibDevo"
    },
    {
      id: 9,
      title: "Automated Docker Migration Pipeline",
      description: "Migrated 1TB Docker images from RunPods to AWS GPU-based EC2 instances using automated CI/CD pipeline. Eliminated manual intervention and integrated RDS deployment for complete automation.",
      technologies: ["Docker Migration", "AWS GPU EC2", "CI/CD Pipeline", "RDS Integration", "RunPod to AWS"],
      githubLink: "https://github.com/ShahzaibDevo"
    },
  ];

//Skills section data 
const codingSkills = [
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" }
];

const cloudSkills = [
  { name: "Terraform", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" },
  { name: "Kubernetes", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
  { name: "AWS", logo: "https://img.icons8.com/?size=512&id=wU62u24brJ44&format=png" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Ansible", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original.svg" },
  { name: "Jenkins", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" },
  { name: "GitLab", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg" },
  { name: "Linux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "OpenStack", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/openstack/openstack-original.svg" },
  { name: "Shell", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg"
  },
  {
    name: "Argocd",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/argocd/argocd-original.svg"
  }
];

const softSkills = [
  { name: "Effective communication", icon: "https://cdn-icons-png.flaticon.com/512/8632/8632658.png" },
  { name: "Teamwork", icon: "https://cdn-icons-png.flaticon.com/512/4275/4275629.png" },
  { name: "Problem Solving", icon: "https://cdn-icons-png.flaticon.com/512/10229/10229249.png" },
  { name: "Adaptability", icon: "https://cdn-icons-png.flaticon.com/512/3861/3861831.png" },
  { name: "Creativity", icon: "https://cdn-icons-png.flaticon.com/512/6823/6823698.png" }
];

// Awards data
const awards = [
  {
    title: "100 Days of DevOps Challenge",
    issuer: "KodeKloud",
    date: "2026",
    description: "Completed a structured 100-day DevOps learning challenge covering Linux, Git, Docker, Kubernetes, AWS, and CI/CD pipelines with hands-on labs and real-world projects.",
    pdf: "/certificates/100-days-of-devops.pdf"
  },
  {
    title: "Mastering Linux: The Complete Guide to Becoming a Linux Pro",
    issuer: "Udemy",
    date: "26 Oct 2024",
    description: "Comprehensive understanding of Linux system administration and command-line proficiency",
    pdf: "/certificates/Linux.pdf"
  },
  {
    title: "Github : The Complete Guide",
    issuer: "Udemy",
    date: "2024",
    description: "Comprehensive understanding of GitHub workflows and best practices",
    pdf: "/certificates/github.pdf"
  },
  {
    title: "Certified Terraform Associate",
    issuer: "HashiCorp",
    date: "2025",
    description: "Advanced infrastructure as code and DevOps automation with Terraform",
    pdf: "/certificates/Terraform.pdf"
  }
];

  return (
    <div className={`portfolio-container ${theme}-mode`}>
      {/* Top Navbar Navigation */}
      <nav className="top-navbar">
        <div className="brand-name">Shahzaib Munir</div>
        <ul className="nav-links">
          <li className={activeSection === 'home' ? 'active' : ''} onClick={() => scrollToSection('home')}>Home</li>
          <li className={activeSection === 'experience' ? 'active' : ''} onClick={() => scrollToSection('experience')}>Experience</li>
          <li className={activeSection === 'projects' ? 'active' : ''} onClick={() => scrollToSection('projects')}>Projects</li>
          <li className={activeSection === 'infrastructure' ? 'active' : ''} onClick={() => scrollToSection('infrastructure')}>Infrastructure</li>
          <li className={activeSection === 'services' ? 'active' : ''} onClick={() => scrollToSection('services')}>Services</li>
          <li className={activeSection === 'skills' ? 'active' : ''} onClick={() => scrollToSection('skills')}>Skills</li>
          <li className={activeSection === 'awards' ? 'active' : ''} onClick={() => scrollToSection('awards')}>Awards</li>
          <li className={activeSection === 'contact' ? 'active' : ''} onClick={() => scrollToSection('contact')}>Contact</li>
        </ul>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'dark' ? <MdLightMode /> : <MdDarkMode />}
        </button>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {/* Home Section */}
        <section ref={sectionRefs.home} id="home" className="section home-section">
          <div className="home-content">
            <div className="text-content">
              <h1>Shahzaib Munir</h1>
              <h2 className="hero-title">Cloud & DevOps Engineer</h2>
              <p className="hero-subtitle">1+ Year of Experience | 10+ Successful DevOps & Cloud Projects</p>
              <div className="vision-box">
                <p className="hero-description">
                  <span className="star-icon">⭐</span>
                  Vision: Building scalable cloud infrastructure, automating CI/CD pipelines, and delivering impactful DevOps solutions.
                  <span className="star-icon">⭐</span>
                </p>
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", gap:"16px", width:"100%", flexWrap:"wrap"}}>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{width:"160px", height:"44px", display:"flex", alignItems:"center", justifyContent:"center", border:"2px solid #00bfa5", borderRadius:"8px", color:"#00bfa5", fontSize:"14px", background:"transparent", textDecoration:"none", cursor:"pointer", flexShrink:"0"}}>GitHub</a>
                <a href="https://www.linkedin.com/in/shahzaib21/" target="_blank" rel="noopener noreferrer" style={{width:"160px", height:"44px", display:"flex", alignItems:"center", justifyContent:"center", border:"2px solid white", borderRadius:"8px", color:"white", fontSize:"14px", background:"transparent", textDecoration:"none", cursor:"pointer", flexShrink:"0"}}>LinkedIn</a>
                <a href={resume} download style={{width:"160px", height:"44px", display:"flex", alignItems:"center", justifyContent:"center", border:"2px solid white", borderRadius:"8px", color:"white", fontSize:"14px", background:"transparent", textDecoration:"none", cursor:"pointer", flexShrink:"0"}}>Download Resume</a>
              </div>
              <div className="stats-divider"></div>
              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-number">10</div>
                  <div className="stat-label">Projects Delivered</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Online Delivery</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">$50</div>
                  <div className="stat-label">Saved Daily</div>
                </div>
              </div>
            </div>
          </div>
          <div className="scroll-down">
            <span>Scroll Down</span>
            <div className="arrow"></div>
          </div>
        </section>

        <section ref={sectionRefs.experience} id="experience" className="section experience-section">
          <div className="section-container">
            <h2 className="section-title-experience">Experience</h2>
          </div>
          <div className="experience-container">
            <div className="experience-item">
              <div className="experience-date">Sep 2025 – Feb 2026</div>
              <div className="experience-content">
                <h3>KodeKloud 100 Days of DevOps Challenge</h3>
                <h4>DevOps Practitioner (Self-Learning Program)</h4>
                <p>Completed an intensive 100-day hands-on DevOps learning journey focused on building real-world skills across cloud, CI/CD, containerization, and infrastructure automation.</p>
                <p>Practiced Linux system administration, shell scripting, and core networking concepts for DevOps environments.</p>
                <p>Designed and implemented CI/CD pipelines using industry-standard tools to automate build, test, and deployment workflows.</p>
                <p>Worked extensively with Docker for containerizing applications and managing images and containers.</p>
                <p>Gained hands-on experience with Kubernetes for deploying, scaling, and managing containerized workloads.</p>
                <p>Explored cloud fundamentals and deployed applications in cloud-like environments with best practices.</p>
                <p>Implemented monitoring and logging concepts to improve system observability and reliability.</p>
                <p>Solved real-world labs and scenarios to strengthen problem-solving and troubleshooting skills.</p>
                <p>Documented daily progress with structured notes, commands, and practical implementations.</p>
                <p style={{ marginTop: '12px' }}>
                  GitHub Link : <a href="https://github.com/ShahzaibDevo/100-Days-of-Devops" target="_blank" rel="noopener noreferrer" className="btn github-btn" style={{ display: 'inline-block', marginTop: '8px' }}>
                    KodeKloud 100 Days of DevOps Challenge
                  </a>
                </p>
              </div>
            </div>

            <div className="experience-item">
              <div className="experience-date"> Oct 2025 – Jan 2026</div>
              <div className="experience-content">
                <h3>ExpertCloud — DevOps Engineer Intern</h3>
                <h4>DevOps Internship</h4>
                <p>Gained hands-on DevOps experience across Linux administration, containerization, automation, and AWS cloud services in a real-world internship environment.</p>
                <p>Managed Linux servers, handled system configurations, user permissions, and resolved technical issues.</p>
                <p>Containerized applications using Docker and deployed scalable workloads with Kubernetes.</p>
                <p>Built and maintained CI/CD pipelines to automate build, test, and deployment workflows.</p>
                <p>Worked with AWS services including EC2, S3, IAM, RDS, VPC, Lambda, and CloudWatch for cloud infrastructure and monitoring.</p>
                <p>Configured IAM roles and policies, monitored systems via CloudWatch, and managed serverless functions using Lambda.</p>
              </div>
            </div>

            <div className="experience-item">
              <div className="experience-date">3 Months | 2025</div>
              <div className="experience-content">
                <h3>Fantech Labs</h3>
                <h4>Frontend & Backend Developer Intern</h4>
                <p style={{ fontSize: '0.95rem', color: '#64ffda', marginBottom: '12px' }}>Tech Stack: HTML · CSS · JavaScript · React.js · Node.js · MySQL · MongoDB · Git · Docker</p>
                <p>Worked as a Frontend & Backend Developer Intern for 3 months at Fantech Labs.</p>
                <p>Built responsive web applications using HTML, CSS, JavaScript and React.js.</p>
                <p>Developed RESTful APIs and server-side logic using Node.js.</p>
                <p>Managed relational data using MySQL and non-relational data using MongoDB.</p>
                <p>Built and deployed full stack projects including an E-Commerce Website and Employee Management System.</p>
                <p>Used Git for version control and Docker for containerization and deployment.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section ref={sectionRefs.projects} id="projects" className="section projects-section">
          <div className="section-container">
            <h2 className="section-title-projects">My Projects</h2>
          </div>
          <div className="projects-grid">
            {projects.map((project, index) => (
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
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="tech-chip">{tech}</span>
                      ))}
                    </div>
                  )}
                  <div className="project-buttons">
                    <a href={project.githubLink || "https://github.com"} target="_blank" rel="noopener noreferrer" className="btn github-btn">GitHub</a>
                    <button type="button" className="view-project-btn" onClick={() => openProjectModal(project)}>View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Infrastructure Automation Section */}
        <section ref={sectionRefs.infrastructure} id="infrastructure" className="section infrastructure-section">
          <div className="section-container">
            <h2 className="section-title-infrastructure">🤖 Infrastructure Automation</h2>
          </div>
          <div className="infrastructure-card">
            <div className="aws-logo">aws</div>
            <h3 className="infrastructure-card-title">AWS Lambda Automation</h3>
            <p className="infrastructure-card-description">Automated ASG, instances, and databases start/stop based on idle/working modes</p>
            <div className="savings-badge">$50/day saved</div>
          </div>
        </section>

        {/* Professional Services Section */}
        <section ref={sectionRefs.services} id="services" className="section services-section">
          <div className="section-container">
            <h2 className="section-title-services">⚙️ Professional Services</h2>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🚀</div>
              <h3 className="service-title">Build & Deploy Applications</h3>
              <p className="service-description">Web apps and mobile apps deployment on AWS & Azure</p>
            </div>
            <div className="service-card">
              <div className="service-icon">☁️</div>
              <h3 className="service-title">Cloud Migration</h3>
              <p className="service-description">Migrate on-premises infrastructure to cloud platforms</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🖥️</div>
              <h3 className="service-title">Infrastructure Automation</h3>
              <p className="service-description">Automated provisioning and infrastructure management</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🔄</div>
              <h3 className="service-title">Cloud Modernization</h3>
              <p className="service-description">Transform legacy systems to modern cloud architecture</p>
            </div>
            <div className="service-card">
              <div className="service-icon">💻</div>
              <h3 className="service-title">Infrastructure as Code</h3>
              <p className="service-description">Terraform, CloudFormation, and automated deployments</p>
            </div>
            <div className="service-card">
              <div className="service-icon">📊</div>
              <h3 className="service-title">Monitoring & Logging</h3>
              <p className="service-description">Comprehensive monitoring solutions and log management</p>
            </div>
          </div>
        </section>

{/* Skills Section */}
<section ref={sectionRefs.skills} id="skills" className="section skills-section">
  <div className="section-container">
          <h2 className="section-title-skills">Skills</h2></div>
       <div className="skills-containter floating-skills">
  <h3 className='skill-heading'>Cloud Skills</h3>
  <div className="skills-grid">
    {cloudSkills.map((skill, index) => (
      <div key={index} className="skill-item float-anim">
        <img src={skill.logo} alt={skill.name} className="skill-logo" />
        <span className="skill-name">{skill.name}</span>
      </div>
    ))}
  </div>
</div>
<div className="skills-containter floating-skills">
  <h3 className='skill-heading'>Coding Skills</h3>
  <div className="skills-grid">
    {codingSkills.map((skill, index) => (
      <div key={index} className="skill-item float-anim">
        <img src={skill.logo} alt={skill.name} className="skill-logo" />
        <span className="skill-name">{skill.name}</span>
      </div>
    ))}
  </div>
</div>

       <div className="skills-containter floating-skills">
  <h3 className='skill-heading'>Communication Skills</h3>
  <div className="skills-grid">
    {softSkills.map((skill, index) => (
      <div key={index} className="skill-item float-anim">
        <img src={skill.icon} alt={skill.name} className="skill-logo" />
        <span className="skill-name">{skill.name}</span>
      </div>
    ))}
  </div>
</div>

</section>
      {/* Awards Section */}
<section ref={sectionRefs.awards} id="awards" className="section awards-section">
  <div className="section-container">
    <h2 className="section-title-award">Awards & Certifications</h2>
  </div>
  <div className="awards-container">
    {awards.map((award, index) => (
      <a 
        key={index}
        href={award.pdf}
        target="_blank"
        rel="noopener noreferrer"
        className="award-item"
      >
        <div className="award-icon">🏆</div>
        <div className="award-content">
          <h3>{award.title}</h3>
          <h4>{award.issuer} • {award.date}</h4>
          <p>{award.description}</p>
          {award.link && (
            <p>
              <a href={award.link} target="_blank" rel="noopener noreferrer" className="award-link">
                GitHub Link : {award.title}
              </a>
            </p>
          )}
        </div>
      </a>
    ))}
  </div>
</section>


        {/* Contact Section */}
        <section ref={sectionRefs.contact} id="contact" className="section contact-section">
          <div className="section-container">
            <h2 className="section-title-contact">Let's Discuss Your Project</h2>
          </div>
          <div className="contact-content">
            <div className="contact-left">
              <h3 className="contact-heading">Ready to Transform Your Infrastructure?</h3>
              <p className="contact-description">Get in touch to discuss how we can modernize your cloud infrastructure and optimize your DevOps processes.</p>
              <div className="contact-email">
                <span className="email-icon">📧</span>
                <span className="email-text">infoshahzaibmunir@gmail.com</span>
              </div>
            </div>
            <div className="contact-right">
              <div className="contact-form-card">
                <h3 className="form-card-title">Let's Discuss Project Details</h3>
                <form className="contact-form">
                  <div className="form-group">
                    <span className="input-icon">📧</span>
                    <input type="email" placeholder="Your Email Address" required />
                  </div>
                  <div className="form-group">
                    <span className="input-icon">📞</span>
                    <input type="tel" placeholder="Contact Number" required />
                  </div>
                  <div className="form-group">
                    <textarea placeholder="Tell us about your project requirements, current infrastructure, and goals..." rows="5" required></textarea>
                  </div>
                  <button type="submit" className="submit-btn">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <StackCr />
      </main>

      {/* Project Modal */}
      {isModalOpen && currentProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <h2>{currentProject.title}</h2>
            <p className="modal-period">{currentProject.period}</p>
            <img src={currentProject.image} alt={currentProject.title} className="modal-image" />
            <p>{currentProject.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;