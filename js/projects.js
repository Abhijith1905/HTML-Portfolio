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

// Project data model (for dynamic loading if needed)
const projectsData = [
  {
    id: 1,
    title: 'E-commerce Website',
    description: 'HTML, CSS, JavaScript, Shopify',
    category: 'website',
    image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    liveUrl: '#',
    sourceUrl: '#'
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'JavaScript, React, CSS',
    category: 'app',
    image: 'https://images.pexels.com/photos/193003/pexels-photo-193003.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    liveUrl: '#',
    sourceUrl: '#'
  },
  {
    id: 3,
    title: 'Portfolio Site',
    description: 'HTML, CSS, JavaScript',
    category: 'website',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    liveUrl: '#',
    sourceUrl: '#'
  },
  {
    id: 4,
    title: 'Mobile App Design',
    description: 'Figma, UI/UX Design',
    category: 'design',
    image: 'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    liveUrl: '#',
    sourceUrl: null
  },
  {
    id: 5,
    title: 'Weather App',
    description: 'JavaScript, API Integration',
    category: 'app',
    image: 'https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    liveUrl: '#',
    sourceUrl: '#'
  },
  {
    id: 6,
    title: 'Brand Identity',
    description: 'Branding, Logo Design',
    category: 'design',
    image: 'https://images.pexels.com/photos/6444/pencil-typography-black-design.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    liveUrl: '#',
    sourceUrl: null
  }
];

// Function to dynamically render projects (uncomment if needed)
/*
function renderProjects() {
  const projectsGrid = document.querySelector('.projects-grid');
  
  projectsData.forEach((project, index) => {
    const projectItem = createProjectItem(project, index);
    projectsGrid.appendChild(projectItem);
  });
}

function createProjectItem(project, index) {
  const delay = index > 0 ? `delay-${index % 5}` : '';
  
  const projectItem = document.createElement('div');
  projectItem.className = `project-item reveal-bottom ${delay}`;
  projectItem.setAttribute('data-category', project.category);
  
  projectItem.innerHTML = `
    <div class="project-image">
      <img src="${project.image}" alt="${project.title}">
      <div class="project-overlay">
        <div class="project-info">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-links">
            <a href="${project.liveUrl}" class="project-link">View Live</a>
            ${project.sourceUrl ? `<a href="${project.sourceUrl}" class="project-link">Source Code</a>` : ''}
          </div>
        </div>
      </div>
    </div>
  `;
  
  return projectItem;
}
*/