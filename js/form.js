// Form handling

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
});

// Initialize contact form validation and submission
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', handleSubmit);
    
    // Add input validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('input', validateInput);
      input.addEventListener('blur', validateInput);
    });
  }
}

// Handle form submission
function handleSubmit(event) {
  event.preventDefault();
  
  // Get form elements
  const form = event.target;
  const submitBtn = form.querySelector('.submit-btn');
  const formData = new FormData(form);
  
  // Validate all inputs
  const inputs = form.querySelectorAll('input, textarea');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!validateInput({ target: input })) {
      isValid = false;
    }
  });
  
  if (!isValid) {
    showToast('Please fill all required fields correctly', 'error');
    return;
  }
  
  // Disable submit button and show loading state
  submitBtn.disabled = true;
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<span>Sending...</span>';
  
  // Simulate form submission (replace with actual API call in production)
  setTimeout(() => {
    // Reset form
    form.reset();
    
    // Show success message
    showToast('Your message has been sent successfully!', 'success');
    
    // Reset button
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
  }, 2000);
}

// Validate individual input
function validateInput(event) {
  const input = event.target;
  const value = input.value.trim();
  const parentElement = input.parentElement;
  
  // Remove any existing error messages
  const existingError = parentElement.querySelector('.error-message');
  if (existingError) {
    parentElement.removeChild(existingError);
  }
  
  // Check for empty required fields
  if (input.hasAttribute('required') && value === '') {
    showInputError(input, 'This field is required');
    return false;
  }
  
  // Validate email format
  if (input.type === 'email' && value !== '') {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      showInputError(input, 'Please enter a valid email address');
      return false;
    }
  }
  
  return true;
}

// Show input error message
function showInputError(input, message) {
  const parentElement = input.parentElement;
  
  // Create error message element
  const errorElement = document.createElement('div');
  errorElement.className = 'error-message';
  errorElement.textContent = message;
  errorElement.style.color = 'var(--color-error)';
  errorElement.style.fontSize = 'var(--text-sm)';
  errorElement.style.marginTop = '4px';
  
  // Add error styling to input
  input.style.borderColor = 'var(--color-error)';
  
  // Append error message
  parentElement.appendChild(errorElement);
}

// Toast notification
function showToast(message, type = 'info') {
  // Remove any existing toast
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    document.body.removeChild(existingToast);
  }
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  
  // Style the toast
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '12px 20px',
    backgroundColor: type === 'success' ? 'var(--color-success)' : 
                   type === 'error' ? 'var(--color-error)' : 
                   'var(--color-primary)',
    color: 'white',
    borderRadius: 'var(--radius-md)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    zIndex: 'var(--z-max)',
    transition: 'all 0.3s ease',
    transform: 'translateY(100px)',
    opacity: '0'
  });
  
  // Add to DOM
  document.body.appendChild(toast);
  
  // Trigger animation
  setTimeout(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  }, 10);
  
  // Remove after delay
  setTimeout(() => {
    toast.style.transform = 'translateY(100px)';
    toast.style.opacity = '0';
    
    // Remove from DOM after animation completes
    setTimeout(() => {
      if (toast.parentNode) {
        document.body.removeChild(toast);
      }
    }, 300);
  }, 5000);
}