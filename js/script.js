// ============================================
// Navigation Scroll Effect
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
});

// ============================================
// Particles Animation (Home Page)
// ============================================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.width = Math.random() * 5 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
            particlesContainer.appendChild(particle);
        }
    }
}

// ============================================
// Skill Bars Animation (About Page)
// ============================================
function animateSkillBars() {
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = document.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    if (width) {
                        bar.style.width = width + '%';
                    }
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// ============================================
// Portfolio Filter and Modal (Portfolio Page)
// ============================================
const projects = [
    {
        id: 1,
        title: "Network Security Implementation",
        category: "security",
        icon: "🔒",
        description: "Implemented comprehensive network security protocols and firewall configurations for university lab infrastructure.",
        tags: ["Security", "Firewall", "Network Defense"],
        details: {
            overview: "Designed and implemented a multi-layered security infrastructure for Telkom University's computer lab, including firewall configuration, intrusion detection systems, and access control policies.",
            technologies: ["pfSense", "Wireshark", "Snort IDS", "VPN"],
            achievements: [
                "Reduced security incidents by 85%",
                "Implemented zero-trust network architecture",
                "Created comprehensive security documentation"
            ],
            learnings: "Gained hands-on experience with enterprise-level security tools and best practices in network defense."
        }
    },
    {
        id: 2,
        title: "Cloud Infrastructure Design",
        category: "networking",
        icon: "☁️",
        description: "Designed scalable cloud infrastructure architecture with focus on security and performance optimization.",
        tags: ["AWS", "Cloud", "Infrastructure"],
        details: {
            overview: "Created a comprehensive cloud infrastructure design for a medium-sized enterprise, focusing on scalability, security, and cost optimization using AWS services.",
            technologies: ["AWS EC2", "VPC", "S3", "CloudWatch", "IAM"],
            achievements: [
                "Reduced infrastructure costs by 40%",
                "Achieved 99.9% uptime SLA",
                "Implemented auto-scaling architecture"
            ],
            learnings: "Developed deep understanding of cloud architecture patterns and AWS best practices."
        }
    },
    {
        id: 3,
        title: "CCI Networking Division Projects",
        category: "organization",
        icon: "🤝",
        description: "Led multiple technical workshops and documentation initiatives as part of CCI's Networking Division.",
        tags: ["Leadership", "Training", "Documentation"],
        details: {
            overview: "Organized and conducted networking fundamentals workshops for university students, created technical documentation, and coordinated internal development sessions.",
            technologies: ["Cisco Packet Tracer", "GNS3", "Technical Writing"],
            achievements: [
                "Trained 50+ students in networking basics",
                "Created 10+ technical documentation guides",
                "Organized 5+ hands-on lab sessions"
            ],
            learnings: "Enhanced leadership, teaching, and technical communication skills."
        }
    },
    {
        id: 4,
        title: "Python Network Automation",
        category: "development",
        icon: "🐍",
        description: "Developed Python scripts for automating network configuration and monitoring tasks.",
        tags: ["Python", "Automation", "Scripting"],
        details: {
            overview: "Created a suite of Python automation tools for network device configuration, monitoring, and log analysis, significantly reducing manual configuration time.",
            technologies: ["Python", "Netmiko", "Paramiko", "Pandas", "Matplotlib"],
            achievements: [
                "Reduced configuration time by 70%",
                "Automated monitoring for 20+ devices",
                "Created real-time dashboard for network health"
            ],
            learnings: "Mastered network automation libraries and developed efficient scripting practices."
        }
    },
    {
        id: 5,
        title: "Cybersecurity Awareness Campaign",
        category: "organization",
        icon: "🛡️",
        description: "Organized university-wide cybersecurity awareness campaign through PRADA organization.",
        tags: ["Security Awareness", "Campaign", "Education"],
        details: {
            overview: "Planned and executed a comprehensive cybersecurity awareness campaign reaching 500+ students, covering topics from password security to phishing prevention.",
            technologies: ["Social Engineering", "Security Training", "Content Creation"],
            achievements: [
                "Reached 500+ students across campus",
                "Created 15+ educational materials",
                "Conducted 3 interactive workshops"
            ],
            learnings: "Developed skills in security education, campaign management, and public speaking."
        }
    },
    {
        id: 6,
        title: "Network Topology Design",
        category: "networking",
        icon: "🌐",
        description: "Designed and simulated complex network topologies for enterprise environments.",
        tags: ["Network Design", "Cisco", "Simulation"],
        details: {
            overview: "Created detailed network topology designs for various scenarios including campus networks, data centers, and branch office connectivity using industry-standard tools.",
            technologies: ["Cisco Packet Tracer", "GNS3", "Visio", "VLAN", "OSPF"],
            achievements: [
                "Designed 5+ complete network architectures",
                "Implemented redundancy and high availability",
                "Optimized routing protocols for performance"
            ],
            learnings: "Gained expertise in network design principles and routing protocols."
        }
    },
    {
        id: 7,
        title: "Penetration Testing Lab",
        category: "security",
        icon: "🎯",
        description: "Built a home lab environment for practicing ethical hacking and penetration testing techniques.",
        tags: ["Pentesting", "Kali Linux", "Ethical Hacking"],
        details: {
            overview: "Established a comprehensive penetration testing lab with multiple vulnerable machines to practice various attack vectors and defensive techniques.",
            technologies: ["Kali Linux", "Metasploit", "Burp Suite", "Nmap", "VirtualBox"],
            achievements: [
                "Completed 20+ CTF challenges",
                "Documented various attack techniques",
                "Built secure testing environment"
            ],
            learnings: "Developed practical skills in vulnerability assessment and exploit development."
        }
    },
    {
        id: 8,
        title: "Marketing Campaign - Grab It Fast",
        category: "organization",
        icon: "📢",
        description: "Led marketing coordination for university event, managing campaigns and promotional strategies.",
        tags: ["Marketing", "Campaign", "Coordination"],
        details: {
            overview: "Coordinated marketing efforts for Grab It Fast 2025 event, including social media campaigns, promotional materials, and stakeholder communication.",
            technologies: ["Social Media Marketing", "Canva", "Analytics", "Project Management"],
            achievements: [
                "Reached 2000+ potential participants",
                "Increased event registration by 150%",
                "Managed team of 5 designers and writers"
            ],
            learnings: "Enhanced project management, marketing strategy, and team coordination skills."
        }
    },
    {
        id: 9,
        title: "Network Monitoring Dashboard",
        category: "development",
        icon: "📊",
        description: "Created a real-time network monitoring dashboard using Python and web technologies.",
        tags: ["Dashboard", "Monitoring", "Web Dev"],
        details: {
            overview: "Developed a comprehensive network monitoring dashboard that provides real-time visibility into network performance, bandwidth usage, and device status.",
            technologies: ["Python", "Flask", "JavaScript", "Chart.js", "SNMP"],
            achievements: [
                "Real-time monitoring of 15+ metrics",
                "Automated alert system",
                "Responsive web interface"
            ],
            learnings: "Learned full-stack web development and network monitoring protocols."
        }
    },
    {
        id: 10,
        title: "Security Policy Documentation",
        category: "security",
        icon: "📋",
        description: "Developed comprehensive security policy documentation for organizational use.",
        tags: ["Documentation", "Policy", "Compliance"],
        details: {
            overview: "Created detailed security policy documentation covering access control, incident response, data protection, and compliance requirements.",
            technologies: ["Technical Writing", "Policy Framework", "Risk Assessment"],
            achievements: [
                "Created 50+ pages of documentation",
                "Aligned with industry standards (ISO 27001)",
                "Implemented across 3 departments"
            ],
            learnings: "Gained expertise in security governance and technical documentation."
        }
    },
    {
        id: 11,
        title: "Lost & Found Web Application",
        category: "development",
        icon: "🔍",
        description: "Full-stack web application for reporting and finding lost items with JWT authentication, search functionality, and statistics dashboard.",
        tags: ["Java", "Spring Boot", "JWT", "REST API", "MySQL"],
        github: "https://github.com/valtheen",
        live: null,
        metrics: {
            completion: 95,
            complexity: 85,
            impact: 80,
            technologies: 12,
            achievements: 8
        },
        details: {
            overview: "Developed a comprehensive Lost & Found system enabling users to report lost items and search for found items. Features secure JWT-based authentication, role-based access control (USER/ADMIN), real-time search functionality, and statistics dashboard. Built with Spring Boot backend and vanilla JavaScript frontend.",
            technologies: ["Java 21", "Spring Boot 3.5.6", "Spring Security", "JWT (jjwt 0.12.3)", "Spring Data JPA", "MySQL", "REST API", "JavaScript", "HTML/CSS", "Axios", "Maven"],
            techProficiency: {
                "Java 21": 90,
                "Spring Boot": 85,
                "JWT Security": 80,
                "MySQL": 75,
                "REST API": 90,
                "JavaScript": 80
            },
            achievements: [
                "Implemented JWT-based authentication system with secure token generation",
                "Created RESTful API with CRUD operations for items and reports",
                "Built responsive frontend with search and filtering capabilities",
                "Developed statistics dashboard showing lost/found item counts",
                "Implemented role-based access control for user and admin roles",
                "Created user registration and login system with validation",
                "Built item reporting system with categories and status tracking",
                "Designed database schema with proper relationships and constraints"
            ],
            learnings: "Gained hands-on experience in full-stack development, JWT authentication implementation, REST API design, database modeling, and security best practices. Developed skills in Spring Boot framework and building secure web applications."
        }
    },
    {
        id: 12,
        title: "Abalone Dataset Machine Learning Analysis",
        category: "development",
        icon: "🤖",
        description: "Machine learning project analyzing abalone dataset using KNN and Naive Bayes algorithms for age classification based on physical measurements.",
        tags: ["Machine Learning", "Python", "Data Science", "Jupyter", "KNN", "Naive Bayes"],
        github: "https://github.com/valtheen",
        live: null,
        metrics: {
            completion: 100,
            complexity: 75,
            impact: 85,
            technologies: 12,
            achievements: 6,
            datasetSize: 4177,
            accuracy: 82
        },
        details: {
            overview: "Developed a machine learning classification system to predict abalone age (rings) using physical measurements. Implemented K-Nearest Neighbour (KNN) and Naive Bayes algorithms, performed comprehensive data preprocessing, and conducted comparative analysis of model performance. The project addresses the challenge of determining abalone age without destructive methods.",
            technologies: ["Python", "Jupyter Notebook", "Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn", "KNN", "Naive Bayes", "Data Preprocessing", "Label Encoding", "Standard Scaler"],
            techProficiency: {
                "Python": 90,
                "Pandas": 85,
                "Scikit-learn": 80,
                "KNN Algorithm": 85,
                "Naive Bayes": 80,
                "Data Visualization": 85
            },
            achievements: [
                "Processed 4,177 instances with 8 attributes from Marine Research Laboratories dataset",
                "Implemented comprehensive data preprocessing pipeline including encoding and scaling",
                "Built and compared KNN and Naive Bayes classification models",
                "Conducted exploratory data analysis with visualizations",
                "Achieved accurate age prediction without destructive measurement methods",
                "Documented complete analysis workflow and findings"
            ],
            learnings: "Gained expertise in supervised learning algorithms, data preprocessing techniques, model evaluation metrics, and comparative analysis of classification methods. Developed skills in handling mixed data types and feature engineering for biological datasets."
        }
    },
    {
        id: 13,
        title: "Realshyt Fashion E-Commerce Platform",
        category: "development",
        icon: "🛍️",
        description: "Full-stack e-commerce platform for streetwear brand with React TypeScript frontend, Spring Boot backend, and Midtrans payment integration.",
        tags: ["React", "TypeScript", "Spring Boot", "E-Commerce", "Payment Gateway"],
        github: "https://github.com/valtheen",
        live: null,
        metrics: {
            completion: 90,
            complexity: 95,
            impact: 90,
            technologies: 14,
            achievements: 9,
            currencies: 12
        },
        details: {
            overview: "Built a complete e-commerce platform for Realshyt streetwear brand featuring product catalog, shopping cart, order management, and integrated payment gateway. The system supports multi-currency transactions with automatic conversion and real-time payment processing through Midtrans integration.",
            technologies: ["React 18", "TypeScript", "Tailwind CSS", "Spring Boot 3.5.7", "Java 24", "Spring Security", "Spring Data JPA", "H2 Database", "MySQL", "Midtrans API", "Gradle", "REST API", "WebFlux", "Lucide React"],
            techProficiency: {
                "React 18": 90,
                "TypeScript": 85,
                "Spring Boot": 90,
                "Java 24": 85,
                "Payment Integration": 80,
                "REST API": 90
            },
            achievements: [
                "Developed responsive React frontend with TypeScript and Tailwind CSS",
                "Built RESTful API backend with Spring Boot and Spring Security",
                "Integrated Midtrans payment gateway with webhook support",
                "Implemented multi-currency support (12+ currencies) with automatic conversion",
                "Created product catalog with search and category filtering",
                "Built shopping cart and order management system",
                "Implemented payment status tracking and notifications",
                "Designed database schema for products, orders, and payments",
                "Created currency conversion service supporting USD, EUR, GBP, SGD, and more"
            ],
            learnings: "Mastered full-stack development with modern React and Spring Boot. Gained expertise in payment gateway integration, multi-currency handling, REST API design, and TypeScript development. Developed skills in e-commerce architecture and secure payment processing."
        }
    }
];

function loadPortfolio(filter = 'all') {
    const grid = document.getElementById('portfolioGrid');
    if (!grid) return;
    
    grid.innerHTML = '';

    const filteredProjects = filter === 'all' 
        ? projects 
        : projects.filter(p => p.category === filter);

    filteredProjects.forEach(project => {
        const item = document.createElement('div');
        item.className = 'portfolio-item';
        item.innerHTML = `
            <div class="portfolio-image">${project.icon}</div>
            <div class="portfolio-content">
                <span class="portfolio-category">${project.category}</span>
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="portfolio-tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <a href="#" class="portfolio-link">
                    View Details →
                </a>
            </div>
        `;
        
        item.addEventListener('click', () => openModal(project));
        grid.appendChild(item);
    });
}

function openModal(project) {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    
    if (!modal || !modalBody) return;
    
    // Generate metrics visualization
    let metricsHTML = '';
    if (project.metrics) {
        metricsHTML = `
            <div class="project-metrics">
                <h3>Project Metrics</h3>
                <div class="metrics-grid">
                    <div class="metric-card">
                        <div class="metric-label">Completion</div>
                        <div class="metric-value">${project.metrics.completion}%</div>
                        <div class="metric-bar">
                            <div class="metric-bar-fill" style="width: ${project.metrics.completion}%"></div>
                        </div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-label">Complexity</div>
                        <div class="metric-value">${project.metrics.complexity}%</div>
                        <div class="metric-bar">
                            <div class="metric-bar-fill" style="width: ${project.metrics.complexity}%"></div>
                        </div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-label">Impact</div>
                        <div class="metric-value">${project.metrics.impact}%</div>
                        <div class="metric-bar">
                            <div class="metric-bar-fill" style="width: ${project.metrics.impact}%"></div>
                        </div>
                    </div>
                    ${project.metrics.technologies ? `
                    <div class="metric-card">
                        <div class="metric-label">Technologies</div>
                        <div class="metric-value">${project.metrics.technologies}</div>
                        <div class="metric-icon">🔧</div>
                    </div>
                    ` : ''}
                    ${project.metrics.achievements ? `
                    <div class="metric-card">
                        <div class="metric-label">Achievements</div>
                        <div class="metric-value">${project.metrics.achievements}</div>
                        <div class="metric-icon">🏆</div>
                    </div>
                    ` : ''}
                    ${project.metrics.datasetSize ? `
                    <div class="metric-card">
                        <div class="metric-label">Dataset Size</div>
                        <div class="metric-value">${project.metrics.datasetSize.toLocaleString()}</div>
                        <div class="metric-icon">📊</div>
                    </div>
                    ` : ''}
                    ${project.metrics.accuracy ? `
                    <div class="metric-card">
                        <div class="metric-label">Model Accuracy</div>
                        <div class="metric-value">${project.metrics.accuracy}%</div>
                        <div class="metric-bar">
                            <div class="metric-bar-fill" style="width: ${project.metrics.accuracy}%"></div>
                        </div>
                    </div>
                    ` : ''}
                    ${project.metrics.currencies ? `
                    <div class="metric-card">
                        <div class="metric-label">Currencies</div>
                        <div class="metric-value">${project.metrics.currencies}+</div>
                        <div class="metric-icon">💱</div>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
    }
    
    // Generate technology proficiency bars
    let techProficiencyHTML = '';
    if (project.details.techProficiency) {
        techProficiencyHTML = `
            <h3>Technology Proficiency</h3>
            <div class="tech-proficiency">
                ${Object.entries(project.details.techProficiency).map(([tech, proficiency]) => `
                    <div class="tech-proficiency-item">
                        <div class="tech-proficiency-header">
                            <span class="tech-name">${tech}</span>
                            <span class="tech-percentage">${proficiency}%</span>
                        </div>
                        <div class="tech-proficiency-bar">
                            <div class="tech-proficiency-fill" style="width: ${proficiency}%"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    modalBody.innerHTML = `
        <div class="modal-header">
            <h2>${project.title}</h2>
            <span class="category">${project.category}</span>
        </div>
        
        ${metricsHTML}
        
        <div class="modal-section">
            <h3>Overview</h3>
            <p>${project.details.overview}</p>
        </div>
        
        <div class="modal-section">
            <h3>Technologies Used</h3>
            <div class="portfolio-tags">
                ${project.details.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
            </div>
        </div>
        
        ${techProficiencyHTML}
        
        <div class="modal-section">
            <h3>Key Achievements</h3>
            <ul class="achievements-list">
                ${project.details.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
            </ul>
        </div>
        
        <div class="modal-section">
            <h3>Learning Outcomes</h3>
            <p>${project.details.learnings}</p>
        </div>
        
        ${project.github || project.live ? `
        <div class="modal-actions">
            ${project.github ? `<a href="${project.github}" target="_blank" class="portfolio-project-link">View on GitHub</a>` : ''}
            ${project.live ? `<a href="${project.live}" target="_blank" class="portfolio-live-link">Live Demo</a>` : ''}
        </div>
        ` : ''}
    `;
    
    modal.classList.add('active');
    
    // Animate progress bars
    setTimeout(() => {
        document.querySelectorAll('.metric-bar-fill, .tech-proficiency-fill').forEach(bar => {
            bar.style.transition = 'width 1s ease-in-out';
        });
    }, 100);
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function initPortfolio() {
    // Filter functionality
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            loadPortfolio(btn.dataset.filter);
        });
    });

    // Modal functionality
    const modalClose = document.getElementById('modalClose');
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    const projectModal = document.getElementById('projectModal');
    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target.id === 'projectModal') closeModal();
        });
    }

    // Initial load
    loadPortfolio();
}

// ============================================
// Contact Form Validation and Submission
// ============================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');

    // Validation functions
    const validators = {
        name: (value) => value.length >= 2,
        email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        subject: (value) => value.length >= 3,
        message: (value) => value.length >= 10
    };

    // Validate field
    function validateField(field, errorId, validationFn) {
        const value = field.value.trim();
        const errorElement = document.getElementById(errorId);
        
        if (!errorElement) return true;
        
        if (!validationFn(value)) {
            field.classList.add('error');
            errorElement.classList.add('show');
            return false;
        } else {
            field.classList.remove('error');
            errorElement.classList.remove('show');
            return true;
        }
    }

    // Real-time validation
    ['name', 'email', 'subject', 'message'].forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (!field) return;
        
        field.addEventListener('blur', () => {
            validateField(field, `${fieldName}Error`, validators[fieldName]);
        });

        field.addEventListener('input', () => {
            if (field.classList.contains('error')) {
                validateField(field, `${fieldName}Error`, validators[fieldName]);
            }
        });
    });

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate all fields
        const nameValid = validateField(
            document.getElementById('name'),
            'nameError',
            validators.name
        );
        const emailValid = validateField(
            document.getElementById('email'),
            'emailError',
            validators.email
        );
        const subjectValid = validateField(
            document.getElementById('subject'),
            'subjectError',
            validators.subject
        );
        const messageValid = validateField(
            document.getElementById('message'),
            'messageError',
            validators.message
        );

        // If all valid, submit
        if (nameValid && emailValid && subjectValid && messageValid) {
            // Disable button
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
            }

            // Simulate form submission (replace with actual backend call)
            setTimeout(() => {
                // Show success message
                if (successMessage) {
                    successMessage.classList.add('show');
                }
                
                // Reset form
                form.reset();
                
                // Re-enable button
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                }

                // Hide success message after 5 seconds
                if (successMessage) {
                    setTimeout(() => {
                        successMessage.classList.remove('show');
                    }, 5000);
                }

                // Store form data (in real app, send to backend)
                const formData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    subject: document.getElementById('subject').value,
                    message: document.getElementById('message').value,
                    timestamp: new Date().toISOString()
                };
                console.log('Form submitted:', formData);
                
            }, 1500);
        } else {
            // Scroll to first error
            const firstError = document.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
}

// ============================================
// Initialize All Features
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    animateSkillBars();
    initPortfolio();
    initContactForm();
    
    // Set active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
});
