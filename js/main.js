// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', () => {
  // Initialize theme
  initTheme();
  
  // Initialize mobile menu
  initMobileMenu();
  
  // Initialize scroll animations
  initScrollAnimations();
  
  // Initialize custom cursor
  initCustomCursor();
  
  // Initialize loading screen
  initLoadingScreen();
  
  // Initialize navigation highlighting
  initNavHighlighting();
});

// Theme toggling
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
    document.body.classList.add('dark-mode');
    themeIcon.textContent = 'light_mode';
  } else {
    document.body.classList.remove('dark-mode');
    themeIcon.textContent = 'dark_mode';
  }
  
  // Theme toggle functionality
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
      themeIcon.textContent = 'light_mode';
    } else {
      localStorage.setItem('theme', 'light');
      themeIcon.textContent = 'dark_mode';
    }
  });
}

// Mobile menu
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });
  
  // Close mobile menu when a link is clicked
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  });
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  // Create observer for reveal animations
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve after animation is triggered
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all elements with reveal classes
  const revealElements = document.querySelectorAll(
    '.reveal-text, .reveal-bottom, .reveal-left, .reveal-right, .reveal-width'
  );
  
  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
  
  // Initialize skill progress bars animation
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target.querySelector('.skill-progress-bar');
        const percentage = entry.target.dataset.progress;
        progressBar.style.width = `${percentage}%`;
        // Unobserve after animation is triggered
        skillObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all skill items
  const skillItems = document.querySelectorAll('.skill-item');
  skillItems.forEach(item => {
    skillObserver.observe(item);
  });
}

// Custom cursor
function initCustomCursor() {
  const cursorDot = document.getElementById('cursor-dot');
  const cursorOutline = document.getElementById('cursor-outline');
  
  // Don't initialize on touch devices
  if (window.matchMedia("(pointer: coarse)").matches) {
    cursorDot.style.display = 'none';
    cursorOutline.style.display = 'none';
    return;
  }
  
  window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;
    
    // Cursor dot follows the mouse position directly
    cursorDot.style.transform = `translate(${posX}px, ${posY}px)`;
    
    // Add a slight delay to cursor outline for a smooth effect
    cursorOutline.animate({
      transform: `translate(${posX}px, ${posY}px)`
    }, {
      duration: 200,
      fill: 'forwards'
    });
  });
  
  // Cursor hover effect for interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .project-item, input, textarea');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorOutline.style.width = '60px';
      cursorOutline.style.height = '60px';
      cursorOutline.style.backgroundColor = 'rgba(0, 87, 255, 0.1)';
    });
    
    el.addEventListener('mouseleave', () => {
      cursorOutline.style.width = '40px';
      cursorOutline.style.height = '40px';
      cursorOutline.style.backgroundColor = 'transparent';
    });
  });
}

// Loading screen
function initLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      
      // Trigger initial animations after loading
      setTimeout(() => {
        const initialAnimations = document.querySelectorAll(
          '.hero .reveal-text, .hero .reveal-bottom, .hero .reveal-left, .hero .reveal-right'
        );
        
        initialAnimations.forEach(el => {
          el.classList.add('active');
        });
      }, 300);
    }, 1500);
  });
}

// Navigation highlighting
function initNavHighlighting() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
    
    mobileNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
    
    // Add/remove sticky class to header
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  });
}