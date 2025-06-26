// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX - 20 + 'px';
        cursorFollower.style.top = e.clientY - 20 + 'px';
    }, 100);
});

// Cursor effects on hover
const hoverElements = document.querySelectorAll('a, button, .service-card, .portfolio-item, .btn');
hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursorFollower.style.transform = 'scale(2)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });
});

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 2000);
});

// Header Scroll Effect
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll Reveal Animation
const reveals = document.querySelectorAll('.reveal');

function checkReveal() {
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', checkReveal);
checkReveal(); // Initial check

// Parallax Effect for Floating Elements
const floatingElements = document.querySelectorAll('.floating-element');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    
    floatingElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.2);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Dynamic Gradient Animation on Mouse Move
const gradientMesh = document.querySelector('.gradient-mesh');

document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    gradientMesh.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
});

// Portfolio Item Tilt Effect
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;
        
        item.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.02)`;
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// Service Card Magnetic Effect
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        card.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translate(0, 0)';
    });
});

// Text Scramble Effect for Hero Title
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span style="color: var(--accent-primary)">${char}</span>`;
            } else {
                output += from;
            }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Apply text scramble to gradient text on load
const gradientTexts = document.querySelectorAll('.gradient-text');
gradientTexts.forEach(text => {
    const scrambler = new TextScramble(text);
    const originalText = text.innerText;
    
    setTimeout(() => {
        scrambler.setText(originalText);
    }, 2500);
});

// Performance optimization - Throttle scroll events
let ticking = false;
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
}

function updateOnScroll() {
    checkReveal();
    ticking = false;
}

window.addEventListener('scroll', requestTick);

// Mobile menu toggle
function initMobileMenu() {
    // Check if menu toggle already exists
    let menuToggle = document.querySelector('.menu-toggle');
    
    // Create hamburger menu button if it doesn't exist and we're on mobile
    if (!menuToggle && window.innerWidth <= 768) {
        menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.innerHTML = '<span></span><span></span><span></span>';
        menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
        document.querySelector('header').appendChild(menuToggle);
    }
    
    // Remove menu toggle if we're on desktop
    if (menuToggle && window.innerWidth > 768) {
        menuToggle.remove();
        document.querySelector('.nav-links').classList.remove('active');
        document.body.style.overflow = '';
        return;
    }
    
    // If no menu toggle exists, exit
    if (!menuToggle) return;
    
    const navLinks = document.querySelector('.nav-links');

    // Remove hidden class on mobile to prevent conflicts
    navLinks.classList.remove('hidden');
    
    // Remove existing listeners to prevent duplicates
    const newMenuToggle = menuToggle.cloneNode(true);
    menuToggle.parentNode.replaceChild(newMenuToggle, menuToggle);
    menuToggle = newMenuToggle;
    
    // Toggle menu
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Handle resize events
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        initMobileMenu();
    }, 250);
});

// Initialize on load
document.addEventListener('DOMContentLoaded', initMobileMenu);

// disable hover effects on touch devices
function isTouchDevice() {
    return (('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0) ||
    (navigator.msMaxTouchPoints > 0));
}

if (isTouchDevice()) {
    document.body.classList.add('touch-device');

    // remove tilt effect on portfolio items for touch devices
    portfolioItems.forEach(item => {
        item.removeEventListener('mousemove', () => {});
        item.removeEventListener('mouseleave', () => {});
    });

     // Remove magnetic effect on service cards for touch devices
    serviceCards.forEach(card => {
        card.removeEventListener('mousemove', () => {});
        card.removeEventListener('mouseleave', () => {});
    });
}

// improve scroll performance on mobile
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        window.requestAnimationFrame(() => {
            // Your scroll handling code here
            scrollTimeout = null;
        });
        scrollTimeout = setTimeout(() => scrollTimeout = null, 100);
    }
}, { passive: true });

// add touch feedback
document.querySelectorAll('.btn, .service-card, .portfolio-item').forEach(element => {
    element.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.98)';
    });

    element.addEventListener('touchend', function() {
        this.style.transform = '';
    });
});

// <------- BUG FIXED ------>
// This is a weird bug though! 
// On the mobile the side bar doesn't show
// if the user interacts with the website (scrolls back and forth, taps images, etc..) before toggling the menu side bar.
// Instead, if the user initiates the side bar on appear, the bar will work and show seamlessly.
// This is how I made it work:

// - By ensuring that the hidden class from the side bar is removed on mobile devices
if (window.innerHeight <= 768) {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.remove('hidden');
    }
}

// - Also by removing it when orientation change since we have parallax effects
window.addEventListener('orientationchange', () => {
    if (window.innerHeight <= 768) {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            navLinks.classList.remove('hidden');
        }
    }
});
