document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Switcher ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('.icon');

    // Check localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        updateIcon(savedTheme);
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
    });

    function updateIcon(theme) {
        icon.textContent = theme === 'dark' ? '☀︎' : '☾';
    }

    // --- Mobile Menu Toggle ---
    const hamburger = document.getElementById('hamburger');
    const navLinksList = document.getElementById('nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinksList.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when link is clicked
        navLinksList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinksList.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // --- Typing Animation ---
    const textElement = document.getElementById('typing-text');
    const phrases = ["Frontend Developer", "Problem Solver", "Creative Thinker", "Learner"];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;
    let erasingDelay = 60;
    let newPhraseDelay = 2000;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            // Finished typing phrase
            isDeleting = true;
            setTimeout(type, newPhraseDelay);
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting phrase
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(type, 500);
        } else {
            // Continue typing/deleting
            setTimeout(type, isDeleting ? erasingDelay : typingDelay);
        }
    }

    // Start typing loop
    setTimeout(type, 1000);

    // --- Smooth Scrolling ---
    // Note: CSS html { scroll-behavior: smooth; } handles most of this, 
    // but we can add active state highlighting for nav links.

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- Dynamic Projects ---
    const projects = [
        {
            title: "MakeMyTrip Clone",
            image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80",
            projectLink: "https://makemytrip-6.onrender.com/",
            githubLink: "https://github.com/AmanMomin2207/MakeMyTrip",
            techStack: ["Spring Boot", "MongoDB", "Next.js", "React.js"],
            points: [
                "Developed a full-stack travel booking application with a responsive frontend using Next.js and React.",
                "Designed and implemented backend REST APIs using Spring Boot for user management and booking workflows.",
                "Integrated MongoDB for scalable, high-performance database management and real-time data access."
            ]
        },
        {
            title: "Movie App",
            image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
            projectLink: "https://movie-app-nnif.onrender.com",
            githubLink: "https://github.com/misbashaikh3099/Movie_App.git",
            techStack: ["Tailwind CSS", "MongoDB", "Appwrite", "React.js", "Vite"],
            points: [
                "Developed a responsive single-page application (SPA) using React.js and React-Use for efficient state and lifecycle management.",
                "Integrated Appwrite backend for user authentication, database handling, and file storage.",
                "Utilized Vite for fast builds, hot module replacement (HMR), and improved development experience."
            ]
        },
        {
            title: "YT - Directory",
            image: "https://images.unsplash.com/photo-1768862042479-7ed3f209a5da?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D",
            githubLink: "https://github.com/AmanMomin2207/yc-directory",
            projectLink: "https://yc-directory4.onrender.com/",
            techStack: ["Next.js", "React.js", "NextAuth", "TailwindCSS", "Render"],
            points: [
                       " YC Directory is a startup discovery platform built with Next.js and React.js that allows users to submit and explore startup ideas.",
                        "It uses Next.js backend APIs, MongoDB for data storage, and NextAuth for authentication."
            ]
        }
    ];

    const projectsGrid = document.getElementById('projects-grid');

    if (projectsGrid) {
        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';

            const techTags = project.techStack.map(tech => `<span>${tech}</span>`).join('');
            const pointsList = project.points.map(point => `<li>${point}</li>`).join('');

            card.innerHTML = `
                <div class="card-image" style="background-image: url('${project.image}'); background-size: cover; background-position: center;"></div>
                <div class="card-content">
                    <h3>${project.title}</h3>
                    <ul class="project-points" style="padding-left: 15px; margin-bottom: 15px; font-size: 0.9rem; color: var(--text-muted); list-style-type: disc;">
                        ${pointsList}
                    </ul>
                    <div class="tags">
                        ${techTags}
                    </div>
                    <div class="card-footer" style="display: flex; gap: 10px;">
                        ${project.projectLink ? `<a href="${project.projectLink}" target="_blank" class="btn secondary-btn" style="padding: 8px 15px; font-size: 0.8rem;">Live Demo</a>` : ''}
                        <a href="${project.githubLink}" target="_blank" class="btn secondary-btn" style="padding: 8px 15px; font-size: 0.8rem;">GitHub</a>
                    </div>
                </div>
            `;
            projectsGrid.appendChild(card);
        });
    }
});

