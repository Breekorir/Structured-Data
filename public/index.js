// Modernized index.js with ES6+ features

// Smooth scrolling for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// CTA button hover effect
document.querySelectorAll('.cta-button').forEach(button => {
  button.addEventListener('mouseenter', () => button.style.transform = 'scale(1.05)');
  button.addEventListener('mouseleave', () => button.style.transform = 'scale(1)');
});

// Mobile menu toggle with slide animation
const toggleBtn = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

toggleBtn?.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Dark mode toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
if (darkModeToggle) {
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
      darkModeToggle.textContent = '☀️';
    } else {
      darkModeToggle.textContent = '🌙';
    }
  });
}

// Parallax effect on hero background
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  const offset = window.pageYOffset;
  if (hero) {
    hero.style.backgroundPositionY = offset * 0.5 + 'px';
  }
});

// Animated counters in about section
const counters = document.querySelectorAll('.about-text .counter');
const speed = 200; // lower is faster

const animateCounters = () => {
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;

      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
};

let countersAnimated = false;
const aboutSection = document.getElementById('about-section');
window.addEventListener('scroll', () => {
  if (!countersAnimated && aboutSection) {
    const sectionPos = aboutSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight;
    if (sectionPos < screenPos) {
      animateCounters();
      countersAnimated = true;
    }
  }
});

// Add fade-in/slide-in animations for sections on scroll
const animatedElements = document.querySelectorAll('section, .card, .about-image, .blog-post, .animate-on-scroll');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(({ target, isIntersecting }) => {
    if (isIntersecting) {
      target.classList.add('animated');
      observer.unobserve(target);
    }
  });
}, { root: null, rootMargin: '0px', threshold: 0.1 });

animatedElements.forEach(el => observer.observe(el));

// Contact form submission handling
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();

    const formData = {
      name: contactForm.name.value.trim(),
      email: contactForm.email.value.trim(),
      message: contactForm.message.value.trim(),
    };

    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('/api/contact-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      alert(response.ok ? (result.message || 'Message sent successfully!') : (result.message || 'Failed to send message.'));
      if (response.ok) contactForm.reset();
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('An error occurred while sending your message. Please try again later.');
    }
  });
}

// Back to top button
const backToTopBtn = document.createElement('button');
backToTopBtn.id = 'back-to-top';
backToTopBtn.textContent = '↑';
Object.assign(backToTopBtn.style, {
  position: 'fixed',
  bottom: '30px',
  right: '30px',
  padding: '10px 15px',
  fontSize: '24px',
  border: 'none',
  borderRadius: '50%',
  backgroundColor: '#1a73e8',
  color: 'white',
  cursor: 'pointer',
  boxShadow: '0 4px 8px rgba(26, 115, 232, 0.5)',
  display: 'none',
  zIndex: '1000',
  transition: 'opacity 0.3s ease',
});
document.body.appendChild(backToTopBtn);

backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = 'block';
    backToTopBtn.style.opacity = '1';
  } else {
    backToTopBtn.style.opacity = '0';
    setTimeout(() => { backToTopBtn.style.display = 'none'; }, 300);
  }
});

// Subtle hover animations on cards and images
document.querySelectorAll('.card, img').forEach(el => {
  el.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
  el.addEventListener('mouseenter', () => {
    el.style.transform = 'scale(1.05)';
    el.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = 'scale(1)';
    el.style.boxShadow = '';
  });
});

// Simple carousel for testimonials
const testimonialGrid = document.querySelector('#testimonials .grid');
if (testimonialGrid) {
  let currentIndex = 0;
  const testimonials = [...testimonialGrid.children];
  const total = testimonials.length;

  testimonials.forEach((t, i) => { t.style.display = i === 0 ? 'block' : 'none'; });

  const prevBtn = document.createElement('button');
  prevBtn.textContent = '←';
  const nextBtn = document.createElement('button');
  nextBtn.textContent = '→';

  [prevBtn, nextBtn].forEach(btn => {
    btn.style.margin = '0 10px';
    btn.style.cursor = 'pointer';
  });

  testimonialGrid.parentElement.insertBefore(prevBtn, testimonialGrid);
  testimonialGrid.parentElement.appendChild(nextBtn);

  prevBtn.addEventListener('click', () => {
    testimonials[currentIndex].style.display = 'none';
    currentIndex = (currentIndex - 1 + total) % total;
    testimonials[currentIndex].style.display = 'block';
  });

  nextBtn.addEventListener('click', () => {
    testimonials[currentIndex].style.display = 'none';
    currentIndex = (currentIndex + 1) % total;
    testimonials[currentIndex].style.display = 'block';
  });
}

// Lazy loading images
document.querySelectorAll('img').forEach(img => {
  if ('loading' in HTMLImageElement.prototype) {
    img.loading = 'lazy';
  }
});
