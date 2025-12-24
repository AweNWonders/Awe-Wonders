// Initialize AOS
AOS.init({
  duration: 800,
  easing: 'ease',
  once: true,
  offset: 100
});

// DOM elements
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');
const scrollTopBtn = document.getElementById('scroll-top');
const scriptureForm = document.getElementById('scripture-form');
const contactForm = document.getElementById('contact-form');

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
  });
});

// Create floating WhatsApp button
function createWhatsAppButton() {
  const whatsAppBtn = document.createElement('div');
  whatsAppBtn.className = 'whatsapp-float';
  whatsAppBtn.innerHTML = `
    <i class="fab fa-whatsapp"></i>
    <div class="whatsapp-tooltip">Join WhatsApp Group</div>
  `;
  document.body.appendChild(whatsAppBtn);
  
  // Add click event to WhatsApp button
  whatsAppBtn.addEventListener('click', () => {
    // Replace with your actual WhatsApp group link
    const whatsappLink = "https://chat.whatsapp.com/GzBUWXC7hFKBsuh81Z2H5c";
    window.open(whatsappLink, '_blank');
  });
  
  return whatsAppBtn;
}

// Initialize WhatsApp button
const whatsAppBtn = createWhatsAppButton();

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
    whatsAppBtn.classList.add('visible');
  } else {
    whatsAppBtn.classList.remove('visible');
  }
  
  // Active section highlighting
  let current = '';
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
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

// Scripture form submission
if (scriptureForm) {
  scriptureForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const reference = document.getElementById('reference').value;
    const reflection = document.getElementById('reflection').value;
    
    // Simple validation
    let valid = true;
    
    if (!reference) {
      document.getElementById('reference-error').style.display = 'block';
      valid = false;
    } else {
      document.getElementById('reference-error').style.display = 'none';
    }
    
    if (!reflection) {
      document.getElementById('reflection-error').style.display = 'block';
      valid = false;
    } else {
      document.getElementById('reflection-error').style.display = 'none';
    }
    
    if (valid) {
      // Disable submit button and show loading state
      const submitBtn = document.getElementById('submit-scripture');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';
      
      // Simulate API request with timeout
      setTimeout(() => {
        // Show success message
        document.getElementById('scripture-success').style.display = 'block';
        
        // Reset form
        scriptureForm.reset();
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit';
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          document.getElementById('scripture-success').style.display = 'none';
        }, 5000);
      }, 1500);
    }
  });
}

// Contact form submission
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    let valid = true;
    
    if (!name) {
      document.getElementById('name-error').style.display = 'block';
      valid = false;
    } else {
      document.getElementById('name-error').style.display = 'none';
    }
    
    if (!email || !email.includes('@')) {
      document.getElementById('email-error').style.display = 'block';
      valid = false;
    } else {
      document.getElementById('email-error').style.display = 'none';
    }
    
    if (!message) {
      document.getElementById('message-error').style.display = 'block';
      valid = false;
    } else {
      document.getElementById('message-error').style.display = 'none';
    }
    
    if (valid) {
      // Disable submit button and show loading state
      const submitBtn = document.getElementById('submit-contact');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      
      // Simulate API request with timeout
      setTimeout(() => {
        // Show success message
        document.getElementById('contact-success').style.display = 'block';
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit';
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          document.getElementById('contact-success').style.display = 'none';
        }, 5000);
      }, 1500);
    }
  });
}

// Word of the Week data (stored in LocalStorage)
const wordOfWeek = {
  keyword: "Reverence",
  explanation: "Reverence is a profound respect and awe for God that transforms how we approach His word and presence. It's not simply fear, but a deep appreciation of His holiness that inspires worship and obedience. When we approach scripture with reverence, we open ourselves to divine wisdom that can shape our character and guide our steps."
};

// Save word of the week to localStorage for future use
localStorage.setItem('wordOfWeek', JSON.stringify(wordOfWeek));

// Gathering data (stored in LocalStorage)
const gatheringData = {
  day: "Wednesday",
  time: "18:00 - 19:30",
  location: "Church Hall / Online (Zoom)"
};

// Save gathering data to localStorage for future use
localStorage.setItem('gatheringData', JSON.stringify(gatheringData));

// Create animated background for Word of the Week section
function createAnimatedWordBackground() {
  const wordSection = document.querySelector('.word-of-week .container');
  if (!wordSection) return;
  
  const backgroundDiv = document.createElement('div');
  backgroundDiv.className = 'word-background';
  
  // Create multiple wave layers for depth
  for (let i = 0; i < 3; i++) {
    const wave = document.createElement('div');
    wave.className = 'wave-gradient';
    backgroundDiv.appendChild(wave);
  }
  
  // Insert at the beginning of the word section
  const wordContent = document.querySelector('.word-content');
  if (wordContent) {
    wordSection.insertBefore(backgroundDiv, wordContent);
  }
}

// Initialize animated background when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  createAnimatedWordBackground();
});