// Additional animations and effects

// This file contains more advanced animations and effects
// that extend the functionality in main.js

// Parallax effect for hero section
function initParallax() {
  const hero = document.querySelector('.hero');
  
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    if (scrollPosition < window.innerHeight) {
      // Create parallax effect on hero section
      hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
      
      // Move hero content up slightly as user scrolls down
      const heroContent = document.querySelector('.hero-content');
      heroContent.style.transform = `translateY(${scrollPosition * 0.1}px)`;
      
      // Fade out hero content as user scrolls down
      heroContent.style.opacity = 1 - (scrollPosition / (window.innerHeight * 0.5));
    }
  });
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Calculate header height to adjust scroll position
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Text typing animation
function initTypingAnimation() {
  const typingElements = document.querySelectorAll('.typing-animation');
  
  typingElements.forEach(element => {
    const text = element.textContent;
    element.textContent = '';
    element.style.visibility = 'visible';
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let charIndex = 0;
          const typingInterval = setInterval(() => {
            if (charIndex < text.length) {
              element.textContent += text.charAt(charIndex);
              charIndex++;
            } else {
              clearInterval(typingInterval);
            }
          }, 100);
          observer.unobserve(element);
        }
      });
    });
    
    observer.observe(element);
  });
}

// Image reveal effect
function initImageReveal() {
  const images = document.querySelectorAll('.reveal-image');
  
  images.forEach(image => {
    const imgWrapper = document.createElement('div');
    imgWrapper.classList.add('img-reveal-wrapper');
    
    // Clone the image
    const imgClone = image.cloneNode(true);
    
    // Create the reveal overlay
    const revealOverlay = document.createElement('div');
    revealOverlay.classList.add('img-reveal-overlay');
    
    // Wrap image with the container
    image.parentNode.insertBefore(imgWrapper, image);
    imgWrapper.appendChild(imgClone);
    imgWrapper.appendChild(revealOverlay);
    
    // Remove the original image
    image.remove();
    
    // Set up the intersection observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          revealOverlay.classList.add('reveal-active');
          observer.unobserve(entry.target);
        }
      });
    });
    
    observer.observe(imgWrapper);
  });
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
  // Initialize smooth scroll behavior
  initSmoothScroll();
  
  // For advanced projects, uncomment these features as needed
  // initParallax();
  // initTypingAnimation();
  // initImageReveal();
});