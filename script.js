// ============================================
// CUSTOM CURSOR
// ============================================
const cursor = document.querySelector('.custom-cursor');
const cursorTrail = document.querySelector('.cursor-trail');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    // Create trail effect
    createTrail(e.clientX, e.clientY);
});

function createTrail(x, y) {
    const trail = document.createElement('div');
    trail.classList.add('cursor-trail');
    trail.style.left = x + 'px';
    trail.style.top = y + 'px';
    document.body.appendChild(trail);

    setTimeout(() => {
        trail.remove();
    }, 500);
}

document.addEventListener('mouseenter', () => {
    cursor.style.display = 'block';
});

document.addEventListener('mouseleave', () => {
    cursor.style.display = 'none';
});

// ============================================
// PARTICLES BACKGROUND
// ============================================
function createParticles() {
    const particlesContainer = document.querySelector('.particles-container');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const randomX = Math.random() * window.innerWidth;
        const randomY = Math.random() * window.innerHeight;
        const randomDuration = Math.random() * 10 + 5;
        const randomDelay = Math.random() * 5;

        particle.style.left = randomX + 'px';
        particle.style.top = randomY + 'px';
        particle.style.animationDuration = randomDuration + 's';
        particle.style.animationDelay = randomDelay + 's';

        particlesContainer.appendChild(particle);
    }
}

window.addEventListener('load', createParticles);

// ============================================
// NAVIGATION
// ============================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================
const scrollRevealElements = document.querySelectorAll('.section-title, .about-text, .about-stats, .skill-category, .portfolio-card, .service-card');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

scrollRevealElements.forEach(element => {
    observer.observe(element);
});

// ============================================
// COUNTER ANIMATION
// ============================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let count = 0;
        const increment = target / 50;

        const updateCounter = () => {
            count += increment;
            if (count < target) {
                counter.textContent = Math.ceil(count);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        // Trigger animation when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && count === 0) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(counter);
    });
}

window.addEventListener('load', animateCounters);

// ============================================
// SKILL BARS ANIMATION
// ============================================
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

window.addEventListener('load', animateSkillBars);

// ============================================
// FORM HANDLING
// ============================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Reset errors
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('messageError').textContent = '';

    let isValid = true;

    // Validation
    if (name.length < 2) {
        document.getElementById('nameError').textContent = 'Name must be at least 2 characters';
        isValid = false;
    }

    if (!isValidEmail(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email';
        isValid = false;
    }

    if (message.length < 10) {
        document.getElementById('messageError').textContent = 'Message must be at least 10 characters';
        isValid = false;
    }

    if (isValid) {
        // Create mailto link
        const mailtoLink = `mailto:contact@sijoufx.com?subject=New Message from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        window.location.href = mailtoLink;

        // Reset form
        contactForm.reset();
        showSuccessMessage();
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showSuccessMessage() {
    const button = contactForm.querySelector('.btn-primary');
    const originalText = button.textContent;

    button.textContent = '✓ Message Sent!';
    button.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';

    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 3000);
}

// ============================================
// SMOOTH SCROLLING
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============================================
// TYPING ANIMATION
// ============================================
const typingElement = document.querySelector('.typing');
if (typingElement) {
    const text = typingElement.textContent;
    typingElement.textContent = '';
    let index = 0;

    function type() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);
        }
    }

    // Start typing after page load
    window.addEventListener('load', () => {
        setTimeout(type, 500);
    });
}

// ============================================
// HOVER GLOW EFFECT ON BUTTONS
// ============================================
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
    });
});

// ============================================
// LAZY LOAD IMAGES
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// ACTIVE NAV LINK INDICATOR
// ============================================
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// PAGE LOAD ANIMATION
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ============================================
// PREVENT CONTEXT MENU (Optional - Remove if not needed)
// ============================================
// document.addEventListener('contextmenu', (e) => {
//     e.preventDefault();
// });

// ============================================
// ACCESSIBILITY - FOCUS VISIBLE
// ============================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});
