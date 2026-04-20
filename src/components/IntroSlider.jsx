import { useEffect, useRef, useState } from 'react';
import './IntroSlider.css';

const slides = [
  {
    id: 1,
    heading: 'Containerization & Orchestration',
    subtext: 'Docker · Kubernetes · Container Management',
    glowColor: '#00bfa5',
    variant: 'slide-docker'
  },
  {
    id: 2,
    heading: 'Infrastructure as Code',
    subtext: 'Terraform · AWS · Cloud Architecture',
    glowColor: '#7b42f6',
    variant: 'slide-terraform'
  },
  {
    id: 3,
    heading: 'Automated CI/CD Pipelines',
    subtext: 'Jenkins · GitHub Actions · ArgoCD',
    glowColor: '#FFD700',
    variant: 'slide-cicd'
  }
];

const IntroSlider = ({ onComplete }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setActiveSlide((prev) => {
        if (prev >= slides.length - 1) {
          window.clearInterval(intervalRef.current);
          onComplete();
          return prev;
        }
        return prev + 1;
      });
    }, 3000);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [onComplete]);

  const handleSkip = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
    onComplete();
  };

  return (
    <div className="intro-slider">
      {slides.map((slide, index) => (
        <section
          key={slide.id}
          className={`intro-slide ${slide.variant} ${activeSlide === index ? 'active' : ''}`}
          style={{ '--glow-color': slide.glowColor }}
        >
          <div className="intro-slide-frame">
            <div className="intro-icons">
              {slide.id === 1 && (
                <>
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" className="intro-icon rotate-icon" />
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" alt="Kubernetes" className="intro-icon rotate-icon" />
                </>
              )}

              {slide.id === 2 && (
                <>
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" alt="Terraform" className="intro-icon fade-step fade-step-1" />
                  <img src="https://img.icons8.com/?size=512&id=wU62u24brJ44&format=png" alt="AWS" className="intro-icon fade-step fade-step-2" />
                </>
              )}

              {slide.id === 3 && (
                <div className="pipeline-row">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" alt="Jenkins" className="intro-icon" />
                  <span className="flow-arrow">→</span>
                  <img src="https://cdn.simpleicons.org/githubactions/2088FF" alt="GitHub Actions" className="intro-icon" />
                  <span className="flow-arrow">→</span>
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/argocd/argocd-original.svg" alt="ArgoCD" className="intro-icon" />
                </div>
              )}
            </div>
            <h1 className="intro-heading">{slide.heading}</h1>
            <p className="intro-subtext">{slide.subtext}</p>
          </div>
        </section>
      ))}

      <div className="intro-dots">
        {slides.map((slide, index) => (
          <span key={slide.id} className={`intro-dot ${activeSlide === index ? 'active' : ''}`} />
        ))}
      </div>

      <button type="button" className="intro-skip-btn" onClick={handleSkip}>
        Skip
      </button>
    </div>
  );
};

export default IntroSlider;
