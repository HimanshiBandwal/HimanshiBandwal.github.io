document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('active');
    });
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            burger.classList.remove('active');
        });
    });
    
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.classList.toggle('dark-mode', savedTheme === 'dark');
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
        updateThemeIcon(currentTheme);
    });
    
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Project Modal
    const projectModal = document.getElementById('projectModal');
    const modalContent = document.querySelector('.modal-content');
    const modalBody = document.querySelector('.modal-body');
    const closeModal = document.querySelector('.close-modal');
    const viewDetailsBtns = document.querySelectorAll('.view-details');
    
    const projectTemplates = {
        project1: document.getElementById('project1-details').content,
        project2: document.getElementById('project2-details').content,
        project3: document.getElementById('project3-details').content
    };
    
    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = btn.getAttribute('data-project');
            const template = projectTemplates[projectId];
            
            if (template) {
                modalBody.innerHTML = '';
                modalBody.appendChild(document.importNode(template, true));
                projectModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    closeModal.addEventListener('click', () => {
        projectModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            projectModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Form Submission
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.querySelector('.form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            formStatus.textContent = 'Thank you for your message! I will get back to you soon.';
            formStatus.className = 'form-status success-message';
            
            contactForm.reset();
            
            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.className = 'form-status';
            }, 5000);
        });
    }
    
    // Skills Animation
    const skillCategories = document.querySelectorAll('.skill-category');
    
    function animateSkills() {
        skillCategories.forEach(category => {
            const categoryPosition = category.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if(categoryPosition < screenPosition) {
                category.classList.add('visible');
                
                const progressBars = category.querySelectorAll('.progress');
                progressBars.forEach(bar => {
                    const width = bar.parentElement.previousElementSibling.textContent;
                    let targetWidth;
                    if(width.includes('HTML')) targetWidth = '85%';
                    if(width.includes('CSS')) targetWidth = '80%';
                    if(width.includes('JavaScript')) targetWidth = '75%';
                    if(width.includes('Python')) targetWidth = '80%';
                    if(width.includes('Java')) targetWidth = '75%';
                    if(width.includes('Git')) targetWidth = '75%';
                    if(width.includes('SQL')) targetWidth = '80%';
                    if(width.includes('PowerBI')) targetWidth = '70%';
                    if(width.includes('Tableau')) targetWidth = '65%';
                    if(width.includes('Pandas')) targetWidth = '80%';
                    if(width.includes('NumPy')) targetWidth = '75%';
                    if(width.includes('Matplotlib')) targetWidth = '70%';
                    
                    bar.style.width = targetWidth;
                    bar.style.setProperty('--target-width', targetWidth);
                });
            }
        });
    }

    // Run once on load
    animateSkills();
    
    // Run on scroll
    window.addEventListener('scroll', animateSkills);

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.to('.background-shape.shape1', {
        x: 50,
        y: 30,
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
    
    gsap.to('.background-shape.shape2', {
        x: -30,
        y: 50,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2
    });
    
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 1
        });
    });

    // Enhanced GSAP animations for certifications
    gsap.utils.toArray('.certification-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: i * 0.2,
            ease: 'power3.out'
        });
    });

    gsap.from('.home-social', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        delay: 1.5
    });

    gsap.from('.home-background .background-shape', {
        opacity: 0,
        scale: 0.5,
        duration: 2,
        stagger: 0.3,
        ease: 'elastic.out(1, 0.5)',
        delay: 0.5
    });

    gsap.from('.home-image .profile-image', {
        opacity: 0,
        x: 100,
        duration: 1.5,
        ease: 'power3.out',
        delay: 1,
        onComplete: function() {
            document.querySelector('.home-image .profile-image').style.opacity = 1;
        }
    });

    gsap.from('.home-text', {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.8,
        onComplete: function() {
            console.log('Home text animation completed');
        }
    });
});