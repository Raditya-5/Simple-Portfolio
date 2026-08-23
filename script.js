/* ============================================
   PORTFOLIO — Main JavaScript
   Raditya Putra Setiawan
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // ELEMENTS
    // ==========================================
    const navbar      = document.getElementById('navbar');
    const navToggle   = document.getElementById('navToggle');
    const navMenu     = document.getElementById('navMenu');
    const navLinks    = document.querySelectorAll('.nav-link');
    const backToTop   = document.getElementById('backToTop');
    const typedRole   = document.getElementById('typedRole');
    const particles   = document.getElementById('particles');
    const contactForm = document.getElementById('contactForm');

    // ==========================================
    // TYPING EFFECT
    // ==========================================
    const roles = ['Full Stack Developer', 'Web Developer', 'PHP Developer', 'Student'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeRole() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typedRole.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedRole.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000; // pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 400; // pause before typing next
        }

        setTimeout(typeRole, typingSpeed);
    }

    typeRole();

    // ==========================================
    // PARTICLES
    // ==========================================
    function createParticles() {
        const count = 30;
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.width = (Math.random() * 4 + 2) + 'px';
            particle.style.height = particle.style.width;
            particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
            particle.style.animationDelay = (Math.random() * 10) + 's';
            particle.style.opacity = Math.random() * 0.5 + 0.1;
            particles.appendChild(particle);
        }
    }

    createParticles();

    // ==========================================
    // NAVBAR SCROLL
    // ==========================================
    let lastScroll = 0;

    function handleNavbarScroll() {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button
        if (scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        lastScroll = scrollY;
    }

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });

    // ==========================================
    // ACTIVE NAV LINK ON SCROLL
    // ==========================================
    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollY = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink, { passive: true });

    // ==========================================
    // MOBILE MENU TOGGLE
    // ==========================================
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ==========================================
    // SMOOTH SCROLL FOR NAV LINKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ==========================================
    // BACK TO TOP
    // ==========================================
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ==========================================
    // SCROLL ANIMATIONS (Intersection Observer)
    // ==========================================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // ==========================================
    // SKILL BAR ANIMATION
    // ==========================================
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fills = entry.target.querySelectorAll('.skill-bar-fill');
                fills.forEach(fill => {
                    const percent = fill.getAttribute('data-percent');
                    setTimeout(() => {
                        fill.style.width = percent + '%';
                    }, 300);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }

    // ==========================================
    // CONTACT FORM
    // ==========================================
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const btn = this.querySelector('.btn-primary');
        const originalHTML = btn.innerHTML;

        // Show sending state
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;

        // Simulate sending (replace with real backend later)
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
            btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
                btn.disabled = false;
                contactForm.reset();
            }, 2500);
        }, 1500);
    });

});
