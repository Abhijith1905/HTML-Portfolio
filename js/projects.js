// Projects functionality

document.addEventListener('DOMContentLoaded', () => {
  initProjectFilters();
});

// Project filtering
function initProjectFilters() {
  const filters = document.querySelectorAll('.project-filter');
  const projectItems = document.querySelectorAll('.project-item');
  
  filters.forEach(filter => {
    filter.addEventListener('click', () => {
      // Update active filter
      document.querySelector('.project-filter.active').classList.remove('active');
      filter.classList.add('active');
      
      const filterValue = filter.getAttribute('data-filter');
      
      // Filter projects
      filterProjects(filterValue, projectItems);
    });
  });
}

// Filter projects based on category
function filterProjects(category, items) {
  items.forEach(item => {
    const itemCategory = item.getAttribute('data-category');
    
    // Reset any previous animations
    resetItemAnimations(item);
    
    if (category === 'all' || category === itemCategory) {
      // Show the item with a fade-in effect
      showProjectWithAnimation(item);
    } else {
      // Hide the item
      hideProject(item);
    }
  });
}

// Reset any existing animations on the project item
function resetItemAnimations(item) {
  item.style.transition = 'none';
  item.offsetHeight; // Force reflow
  item.style.transition = 'all 0.4s ease-in-out';
}

// Show project with a staggered animation
function showProjectWithAnimation(item) {
  item.style.display = 'block';
  item.style.opacity = '0';
  item.style.transform = 'translateY(20px)';
  
  // Trigger the animation with a small delay
  setTimeout(() => {
    item.style.opacity = '1';
    item.style.transform = 'translateY(0)';
  }, 50);
}

// Hide project
function hideProject(item) {
  item.style.opacity = '0';
  item.style.transform = 'translateY(20px)';
  
  // Remove from layout after fade out
  setTimeout(() => {
    item.style.display = 'none';
  }, 400);
}

