import kodekloudCert from "../assets/cert.png";

export const projects = [
  {
    id: 1,
    title: "100 Days of DevOps Challenge (KodeKloud)",
    description:
      "Successfully completed the 100 Days of DevOps Challenge from KodeKloud, performing daily hands-on labs covering real-world DevOps tools, cloud infrastructure, and automation practices.",
    githubLink: "https://github.com/ShahzaibDevo/100-Days-of-Devops",
    image: kodekloudCert,
    fullDetails:
      "Write full project details here. Include architecture, tools, deployment flow, and outcomes."
  },
  {
    id: 2,
    title: "CI/CD and DevOps",
    period: "September 2024 – November 2024",
    description:
      "Designed and implemented a complete CI/CD pipeline using Jenkins, Docker, and Kubernetes. Automated testing and deployment processes, reducing deployment time by 70%.",
    image: "https://www.veritis.com/wp-content/uploads/2021/03/continuous-delivery-cd.jpg",
    fullDetails:
      "Write full project details here. Include pipeline stages, branch strategy, and deployment process."
  },
  {
    id: 3,
    title: "Three Tier Application",
    period: "August 2025 – November 2025",
    description:
      "Built a scalable three-tier web application on AWS with Terraform for infrastructure as code. Implemented auto-scaling and load balancing for high availability.",
    image: "https://media.geeksforgeeks.org/wp-content/uploads/20231108115918/Three-Tier-architecture.png",
    fullDetails:
      "Write full project details here. Add networking, database, and scaling details."
  },
  {
    id: 4,
    title: "Cloud Infrastructure and Web Application",
    period: "January 2025 – July 2025",
    description:
      "Developed a cloud-native web application with microservices architecture. Utilized AWS EKS for container orchestration and implemented monitoring with Prometheus and Grafana.",
    fullDetails:
      "Write full project details here. Mention microservices design and observability setup."
  },
  {
    id: 5,
    title: "Cloud Infrastructure Modernization",
    description:
      "Modernized business cloud infrastructure by improving architecture and migrating environments toward AWS Control Tower governance while following AWS Well-Architected Framework principles.",
    technologies: [
      "AWS Control Tower",
      "AWS Well-Architected Framework",
      "Cloud Migration",
      "Infrastructure Optimization"
    ],
    githubLink: "https://github.com",
    fullDetails:
      "Write full project details here. Include migration phases and governance improvements."
  },
  {
    id: 6,
    title: "EKS Application Deployment",
    description:
      "Deployed multiple containerized applications on Amazon EKS using Helm charts and implemented multi-environment deployment pipelines including Development, Staging, and Production environments.",
    technologies: [
      "Amazon EKS",
      "Helm",
      "Kubernetes",
      "CI/CD Pipelines",
      "Multi-Environment Deployment"
    ],
    githubLink: "https://github.com",
    fullDetails:
      "Write full project details here. Add namespace strategy and release process."
  },
  {
    id: 7,
    title: "Multi-Platform Application Deployment",
    description:
      "Deployed web applications on EC2, ECS, and EKS. Mobile app deployment on AWS Amplify and Python-based applications on AWS App Runner.",
    technologies: ["EC2", "ECS", "EKS", "AWS Amplify", "App Runner"],
    githubLink: "https://github.com/ShahzaibDevo",
    fullDetails:
      "Write full project details here. Explain why each platform was selected."
  },
  {
    id: 8,
    title: "Image Optimization & LLM Deployment",
    description:
      "Successfully optimized Docker image from 1TB to 16GB and deployed LLM model on serverless services using RunPod.",
    technologies: ["Docker Optimization", "LLM", "Serverless", "RunPod"],
    githubLink: "https://github.com/ShahzaibDevo",
    fullDetails:
      "Write full project details here. Describe optimization techniques and deployment setup."
  },
  {
    id: 9,
    title: "Automated Docker Migration Pipeline",
    description:
      "Migrated 1TB Docker images from RunPods to AWS GPU-based EC2 instances using automated CI/CD pipeline. Eliminated manual intervention and integrated RDS deployment for complete automation.",
    technologies: ["Docker Migration", "AWS GPU EC2", "CI/CD Pipeline", "RDS Integration", "RunPod to AWS"],
    githubLink: "https://github.com/ShahzaibDevo",
    fullDetails:
      "Write full project details here. Include migration workflow and rollback strategy."
  }
];
