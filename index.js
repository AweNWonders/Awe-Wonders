// Initialize AOS
AOS.init({
  duration: 800,
  easing: 'ease-out',
  once: true,
  offset: 100,
  delay: 100
});

// DOM elements
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a:not(.dropdown-toggle)');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');
const scrollTopBtn = document.getElementById('scroll-top');
const whatsappFloat = document.getElementById('whatsapp-float');
const scriptureForm = document.getElementById('scripture-form');
const contactForm = document.getElementById('contact-form');
const whatsappLink = document.getElementById('whatsapp-link');
const dropdown = document.querySelector('.dropdown');
const dropdownToggle = document.querySelector('.dropdown-toggle');

// Mobile menu toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close menu when clicking a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    
    // Close dropdown on mobile
    if (window.innerWidth <= 768) {
      dropdown.classList.remove('active');
    }
  });
});

// Dropdown toggle
if (dropdownToggle) {
  dropdownToggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.innerWidth <= 768) {
      // On mobile, toggle dropdown visibility
      dropdown.classList.toggle('active');
    } else {
      // On desktop, toggle dropdown
      dropdown.classList.toggle('active');
    }
  });
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!dropdown.contains(e.target)) {
    dropdown.classList.remove('active');
  }
});

// Close dropdown on mobile when resizing to desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  }
});

// WhatsApp functionality
if (whatsappLink) {
  whatsappLink.addEventListener('click', (e) => {
    e.preventDefault();
    const whatsappGroupLink = "https://chat.whatsapp.com/GzBUWXC7hFKBsuh81Z2H5c";
    window.open(whatsappGroupLink, '_blank');
  });
}

if (whatsappFloat) {
  whatsappFloat.addEventListener('click', () => {
    const whatsappGroupLink = "https://chat.whatsapp.com/GzBUWXC7hFKBsuh81Z2H5c";
    window.open(whatsappGroupLink, '_blank');
  });
}

// Scroll events
window.addEventListener('scroll', () => {
  // Navbar styling on scroll
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  // Scroll to top button visibility
  if (window.scrollY > 500) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
  
  // WhatsApp button visibility
  if (window.scrollY > 200) {
    whatsappFloat.classList.add('visible');
  } else {
    whatsappFloat.classList.remove('visible');
  }
  
  // Active section highlighting
  let current = '';
  const sections = document.querySelectorAll('section[id]');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href && href.includes(current)) {
      link.classList.add('active');
    }
  });
});

// Scroll to top button functionality
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Form handling
function handleFormSubmit(form, successId, buttonId, validationFields) {
  return function(e) {
    e.preventDefault();
    
    let valid = true;
    
    // Validate required fields
    validationFields.forEach(field => {
      const input = form.querySelector(field.selector);
      const error = form.querySelector(field.errorId);
      
      if (field.required && !input.value.trim()) {
        error.style.display = 'block';
        input.style.borderColor = 'var(--accent-color)';
        valid = false;
      } else if (field.type === 'email' && input.value.trim() && !isValidEmail(input.value)) {
        error.style.display = 'block';
        error.textContent = 'Please enter a valid email address';
        input.style.borderColor = 'var(--accent-color)';
        valid = false;
      } else {
        error.style.display = 'none';
        input.style.borderColor = '#e1e5e9';
      }
    });
    
    if (valid) {
      const submitBtn = form.querySelector(buttonId);
      const successMsg = document.getElementById(successId);
      
      // Disable submit button and show loading state
      submitBtn.disabled = true;
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
      
      // Simulate API request
      setTimeout(() => {
        // Show success message
        successMsg.style.display = 'block';
        
        // Reset form
        form.reset();
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          successMsg.style.display = 'none';
        }, 5000);
        
        // Scroll to show success message
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 1500);
    }
  };
}

// Email validation
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Scripture form submission
if (scriptureForm) {
  scriptureForm.addEventListener('submit', handleFormSubmit(scriptureForm, 'scripture-success', '#submit-scripture', [
    { selector: '#reference', errorId: '#reference-error', required: true },
    { selector: '#reflection', errorId: '#reflection-error', required: true },
    { selector: '#name', errorId: null, required: false }
  ]));
}

// Contact form submission
if (contactForm) {
  contactForm.addEventListener('submit', handleFormSubmit(contactForm, 'contact-success', '#submit-contact', [
    { selector: '#contact-name', errorId: '#name-error', required: true },
    { selector: '#email', errorId: '#email-error', required: true, type: 'email' },
    { selector: '#message', errorId: '#message-error', required: true }
  ]));
}

// Word of the Week data
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

// Save to localStorage
localStorage.setItem('wordsOfWeek', JSON.stringify(wordsOfWeek));

// Gatherings data
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Add smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]:not(.dropdown-toggle)').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== 'javascript:void(0)') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Close dropdown after clicking a link
          if (window.innerWidth <= 768) {
            dropdown.classList.remove('active');
          }
        }
      }
    });
  });
  
  // Initialize tooltips
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
})