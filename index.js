// ============================================
// THE AWE & WONDERS - BIBLE STUDY WEBSITE
// Main JavaScript File
// ============================================

// ============================================
// CONFIGURATION & INITIALIZATION
// ============================================

// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 800,
  easing: 'ease-out',
  once: true,
  offset: 100,
  delay: 100
});

// ============================================
// DOM ELEMENTS
// ============================================

// Loader
const loader = document.getElementById('loader');
const loaderProgressBar = document.querySelector('.loader-progress-bar');

// Navigation
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a:not(.dropdown-toggle)');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');
const dropdown = document.querySelector('.dropdown');
const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdownMenu = document.querySelector('.dropdown-menu');

// Floating Buttons
const scrollTopBtn = document.getElementById('scroll-top');
const whatsappFloat = document.getElementById('whatsapp-float');

// Forms
const scriptureForm = document.getElementById('scripture-form');
const contactForm = document.getElementById('contact-form');

// WhatsApp Links
const whatsappLink = document.getElementById('whatsapp-link');

// ============================================
// LOADER FUNCTIONALITY
// ============================================

/**
 * Simulate loading progress
 */
function simulateLoadingProgress() {
  if (!loaderProgressBar) return;
  
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 20;
    if (progress > 100) progress = 100;
    loaderProgressBar.style.width = `${progress}%`;
    
    if (progress >= 100) {
      clearInterval(interval);
      hideLoader();
    }
  }, 200);
}

/**
 * Hide the loader with fade-out animation
 */
function hideLoader() {
  if (!loader) return;
  
  loader.classList.add('fade-out');
  
  setTimeout(() => {
    loader.style.display = 'none';
  }, 800);
}

// ============================================
// NAVIGATION FUNCTIONALITY
// ============================================

/**
 * Toggle mobile menu
 */
function toggleMobileMenu() {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
  
  // Close dropdown when toggling mobile menu
  if (window.innerWidth <= 768) {
    dropdown.classList.remove('active');
  }
}

/**
 * Close mobile menu when clicking a link
 */
function closeMobileMenu() {
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
  
  // Close dropdown on mobile
  if (window.innerWidth <= 768) {
    dropdown.classList.remove('active');
  }
}

/**
 * Toggle dropdown menu
 * @param {Event} e - Click event
 */
function toggleDropdown(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  
  if (window.innerWidth <= 768) {
    // On mobile, toggle dropdown visibility
    dropdown.classList.toggle('active');
  } else {
    // On desktop, toggle dropdown
    dropdown.classList.toggle('active');
  }
}

/**
 * Close dropdown when clicking outside
 * @param {Event} e - Click event
 */
function closeDropdownOutside(e) {
  if (dropdown && !dropdown.contains(e.target)) {
    dropdown.classList.remove('active');
  }
}

/**
 * Handle window resize events
 */
function handleResize() {
  if (window.innerWidth > 768) {
    // Reset mobile menu on desktop
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  }
}

// ============================================
// WHATSAPP FUNCTIONALITY
// ============================================

const WHATSAPP_GROUP_LINK = "https://chat.whatsapp.com/GzBUWXC7hFKBsuh81Z2H5c";

/**
 * Open WhatsApp group link
 */
function openWhatsAppGroup() {
  window.open(WHATSAPP_GROUP_LINK, '_blank');
}

// ============================================
// SCROLL FUNCTIONALITY
// ============================================

/**
 * Handle scroll events for various effects
 */
function handleScroll() {
  const scrollY = window.scrollY;
  
  // Navbar styling on scroll
  if (scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  // Scroll to top button visibility
  if (scrollY > 500) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
  
  // WhatsApp button visibility
  if (scrollY > 200) {
    whatsappFloat.classList.add('visible');
  } else {
    whatsappFloat.classList.remove('visible');
  }
  
  // Active section highlighting
  highlightActiveSection();
}

/**
 * Highlight active navigation link based on scroll position
 */
function highlightActiveSection() {
  let current = '';
  const sections = document.querySelectorAll('section[id]');
  const offset = 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - offset;
    const sectionHeight = section.clientHeight;
    const sectionId = section.getAttribute('id');
    
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = sectionId;
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    
    if (href && href.includes(current)) {
      link.classList.add('active');
    }
  });
}

/**
 * Scroll to top smoothly
 */
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

/**
 * Smooth scroll to section
 * @param {string} selector - CSS selector of target element
 */
function smoothScrollTo(selector) {
  const target = document.querySelector(selector);
  if (target) {
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// ============================================
// FORM HANDLING - FORMPREE INTEGRATION
// ============================================

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Whether email is valid
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Show form error
 * @param {HTMLElement} input - Input element
 * @param {HTMLElement} errorElement - Error message element
 * @param {string} message - Error message
 */
function showFormError(input, errorElement, message = 'This field is required') {
  errorElement.textContent = message;
  errorElement.style.display = 'block';
  input.style.borderColor = 'var(--accent-color)';
}

/**
 * Hide form error
 * @param {HTMLElement} input - Input element
 * @param {HTMLElement} errorElement - Error message element
 */
function hideFormError(input, errorElement) {
  errorElement.style.display = 'none';
  input.style.borderColor = '#e1e5e9';
}

/**
 * Show form success message
 * @param {string} successId - ID of success message element
 * @param {HTMLElement} form - Form element to reset
 * @param {HTMLElement} submitBtn - Submit button to reset
 * @param {string} originalBtnText - Original button HTML content
 */
function showFormSuccess(successId, form, submitBtn, originalBtnText) {
  const successMsg = document.getElementById(successId);
  
  if (successMsg) {
    successMsg.style.display = 'block';
  }
  
  // Reset form
  form.reset();
  
  // Reset button
  submitBtn.disabled = false;
  submitBtn.innerHTML = originalBtnText;
  
  // Hide success message after 5 seconds
  setTimeout(() => {
    if (successMsg) {
      successMsg.style.display = 'none';
    }
  }, 5000);
  
  // Scroll to show success message
  if (successMsg) {
    successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

/**
 * Handle form submission with Formspree
 * @param {Event} e - Submit event
 * @param {Object} options - Form configuration options
 */
async function handleFormspreeSubmit(e, options) {
  e.preventDefault();
  
  const { form, successId, buttonId, validationFields } = options;
  const submitBtn = form.querySelector(buttonId);
  const originalBtnText = submitBtn.innerHTML;
  let isValid = true;
  
  // Validate all fields
  validationFields.forEach(field => {
    const input = form.querySelector(field.selector);
    const error = form.querySelector(field.errorId);
    
    if (field.required && !input.value.trim()) {
      showFormError(input, error, field.errorMessage || 'This field is required');
      isValid = false;
    } else if (field.type === 'email' && input.value.trim() && !isValidEmail(input.value)) {
      showFormError(input, error, 'Please enter a valid email address');
      isValid = false;
    } else if (error) {
      hideFormError(input, error);
    }
  });
  
  if (!isValid) return;
  
  // Disable submit button and show loading state
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  
  try {
    // Get form data
    const formData = new FormData(form);
    
    // Get the Formspree endpoint from form action
    const formspreeEndpoint = form.action;
    
    // Send to Formspree
    const response = await fetch(formspreeEndpoint, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (response.ok) {
      // Show success message
      showFormSuccess(successId, form, submitBtn, originalBtnText);
    } else {
      // Try to parse error response
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Form submission failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error('Form submission error:', error);
    
    // Show error message
    const errorMsg = document.createElement('div');
    errorMsg.className = 'error-message';
    errorMsg.style.display = 'block';
    errorMsg.style.backgroundColor = 'var(--accent-color)';
    errorMsg.style.color = 'white';
    errorMsg.style.padding = '1rem';
    errorMsg.style.borderRadius = '10px';
    errorMsg.style.marginTop = '1rem';
    errorMsg.style.textAlign = 'center';
    errorMsg.innerHTML = `
      <i class="fas fa-exclamation-circle"></i>
      <p>Sorry, there was an error submitting the form. Please try again.</p>
    `;
    
    // Insert error message after form
    const formSubmit = form.querySelector('.form-submit');
    if (formSubmit) {
      formSubmit.appendChild(errorMsg);
      
      // Remove error message after 5 seconds
      setTimeout(() => {
        errorMsg.remove();
      }, 5000);
    } else {
      alert('Sorry, there was an error submitting the form. Please try again.');
    }
    
    // Reset button
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
  }
}

// ============================================
// TOOLTIP FUNCTIONALITY
// ============================================

/**
 * Initialize tooltips
 */
function initTooltips() {
  const tooltips = document.querySelectorAll('.tooltip');
  
  tooltips.forEach(tooltip => {
    const parent = tooltip.parentElement;
    
    parent.addEventListener('mouseenter', () => {
      tooltip.style.opacity = '1';
    });
    
    parent.addEventListener('mouseleave', () => {
      tooltip.style.opacity = '0';
    });
  });
}

// ============================================
// DATA STORAGE (LocalStorage)
// ============================================

/**
 * Initialize default data if not exists
 */
function initLocalStorageData() {
  // Word of the Week data
  if (!localStorage.getItem('wordsOfWeek')) {
    const wordsOfWeek = [
      {
        word: "Reverence",
        definition: "Reverence is a profound respect and awe for God that transforms how we approach His word and presence. It's not simply fear, but a deep appreciation of His holiness that inspires worship and obedience.",
        scripture: "Proverbs 9:10",
        date: "This Week"
      },
      {
        word: "Wisdom",
        definition: "The ability to discern what is true, right, and lasting. Biblical wisdom begins with the fear of the Lord and leads to right living.",
        scripture: "James 3:17",
        date: "Last Week"
      },
      {
        word: "Grace",
        definition: "The free and unmerited favor of God, as manifested in the salvation of sinners and the bestowal of blessings.",
        scripture: "Ephesians 2:8-9",
        date: "Two Weeks Ago"
      }
    ];
    localStorage.setItem('wordsOfWeek', JSON.stringify(wordsOfWeek));
  }
  
  // Gatherings data
  if (!localStorage.getItem('gatheringsData')) {
    const gatheringsData = {
      weekly: {
        day: "Wednesday",
        time: "7:00 PM - 8:30 PM",
        location: "Online (Zoom) & Church Hall",
        type: "Bible Study"
      },
      special: {
        day: "First Sunday",
        time: "3:00 PM - 5:00 PM",
        location: "Community Center",
        type: "Fellowship & Prayer"
      }
    };
    localStorage.setItem('gatheringsData', JSON.stringify(gatheringsData));
  }
}

// ============================================
// EVENT LISTENERS SETUP
// ============================================

/**
 * Set up all event listeners
 */
function setupEventListeners() {
  // Mobile menu toggle
  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
  }
  
  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
  
  // Dropdown toggle
  if (dropdownToggle) {
    dropdownToggle.addEventListener('click', toggleDropdown);
  }
  
  // Close dropdown when clicking outside
  document.addEventListener('click', closeDropdownOutside);
  
  // Window resize
  window.addEventListener('resize', handleResize);
  
  // WhatsApp functionality
  if (whatsappLink) {
    whatsappLink.addEventListener('click', (e) => {
      e.preventDefault();
      openWhatsAppGroup();
    });
  }
  
  if (whatsappFloat) {
    whatsappFloat.addEventListener('click', openWhatsAppGroup);
  }
  
  // Scroll events
  window.addEventListener('scroll', handleScroll);
  
  // Scroll to top button
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', scrollToTop);
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]:not(.dropdown-toggle)').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href !== '#' && href !== 'javascript:void(0)') {
        e.preventDefault();
        smoothScrollTo(href);
        
        // Close dropdown on mobile after clicking
        if (window.innerWidth <= 768) {
          dropdown.classList.remove('active');
        }
      }
    });
  });
  
  // Contact form submission with Formspree
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => handleFormspreeSubmit(e, {
      form: contactForm,
      successId: 'contact-success',
      buttonId: '#submit-contact',
      validationFields: [
        { 
          selector: '#contact-name', 
          errorId: '#name-error', 
          required: true,
          errorMessage: 'Please enter your name'
        },
        { 
          selector: '#email', 
          errorId: '#email-error', 
          required: true, 
          type: 'email',
          errorMessage: 'Please enter a valid email address'
        },
        { 
          selector: '#message', 
          errorId: '#message-error', 
          required: true,
          errorMessage: 'Please enter your message'
        }
      ]
    }));
    
    // Add Formspree honeypot field if not present
    const honeypot = contactForm.querySelector('[name="_gotcha"]');
    if (!honeypot) {
      const gotchaInput = document.createElement('input');
      gotchaInput.type = 'text';
      gotchaInput.name = '_gotcha';
      gotchaInput.style.display = 'none';
      contactForm.appendChild(gotchaInput);
    }
  }
  
  // Scripture form submission (keeping old method for now)
  if (scriptureForm) {
    scriptureForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = scriptureForm.querySelector('#submit-scripture');
      const originalBtnText = submitBtn.innerHTML;
      let isValid = true;
      
      // Validate fields
      const referenceInput = scriptureForm.querySelector('#reference');
      const referenceError = scriptureForm.querySelector('#reference-error');
      const reflectionInput = scriptureForm.querySelector('#reflection');
      const reflectionError = scriptureForm.querySelector('#reflection-error');
      
      if (!referenceInput.value.trim()) {
        showFormError(referenceInput, referenceError, 'Please enter a scripture reference');
        isValid = false;
      } else {
        hideFormError(referenceInput, referenceError);
      }
      
      if (!reflectionInput.value.trim()) {
        showFormError(reflectionInput, reflectionError, 'Please share your reflection');
        isValid = false;
      } else {
        hideFormError(reflectionInput, reflectionError);
      }
      
      if (!isValid) return;
      
      // Disable submit button and show loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
      
      // Simulate API request (replace with Formspree integration later)
      setTimeout(() => {
        const successMsg = document.getElementById('scripture-success');
        
        if (successMsg) {
          successMsg.style.display = 'block';
        }
        
        // Reset form
        scriptureForm.reset();
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          if (successMsg) {
            successMsg.style.display = 'none';
          }
        }, 5000);
      }, 1500);
    });
  }
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize the application
 */
function initApp() {
  // Initialize local storage data
  initLocalStorageData();
  
  // Set up event listeners
  setupEventListeners();
  
  // Initialize tooltips
  initTooltips();
  
  // Initial scroll check
  handleScroll();
  
  console.log('The Awe & Wonders Bible Study website initialized successfully!');
}

// ============================================
// PAGE LOAD HANDLING
// ============================================

/**
 * Handle page load completion
 */
function handlePageLoad() {
  // If loader exists, start loading simulation
  if (loader) {
    simulateLoadingProgress();
  } else {
    // If no loader, just initialize app
    initApp();
  }
  
  // Initialize app after a short delay (or immediately if loader completes)
  const initDelay = loader ? 2500 : 0;
  
  setTimeout(() => {
    initApp();
  }, initDelay);
}

// ============================================
// EVENT LISTENERS FOR PAGE LOAD
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', handlePageLoad);

// Fallback: Initialize when window loads completely
window.addEventListener('load', () => {
  // If DOMContentLoaded didn't fire for some reason
  if (!document.body.classList.contains('dom-loaded')) {
    handlePageLoad();
  }
});

// ============================================
// GLOBAL EXPORTS (if needed for debugging)
// ============================================

// For debugging purposes, you can expose certain functions
if (typeof window !== 'undefined') {
  window.App = {
    scrollToTop,
    smoothScrollTo,
    openWhatsAppGroup,
    isValidEmail,
    handleFormspreeSubmit
  };
}