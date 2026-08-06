const preloader = document.querySelector('.preloader');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const backToTop = document.querySelector('.back-to-top');
const revealItems = document.querySelectorAll('.reveal');
const counters = document.querySelectorAll('.counter');
const filterButtons = document.querySelectorAll('.filter-btn');
const dishCards = document.querySelectorAll('.dish-card');
const searchInput = document.getElementById('searchInput');
const addButtons = document.querySelectorAll('.add-btn');
const testimonials = document.querySelectorAll('.testimonial-card');
const countdownEls = {
  hours: document.getElementById('hours'),
  minutes: document.getElementById('minutes'),
  seconds: document.getElementById('seconds')
};

window.addEventListener('load', () => {
  preloader.classList.add('hidden');
  setTimeout(() => preloader.remove(), 600);
});

menuToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

const updateActiveLink = () => {
  const sections = document.querySelectorAll('main section[id]');
  const scrollPosition = window.scrollY + 150;
  sections.forEach((section) => {
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link && section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
      document.querySelectorAll('.nav-links a').forEach((item) => item.classList.remove('active'));
      link.classList.add('active');
    }
  });
};

window.addEventListener('scroll', () => {
  updateActiveLink();
  backToTop.classList.toggle('show', window.scrollY > 600);
  const offset = window.scrollY * 0.06;
  parallaxElements.forEach((element) => {
    element.style.transform = `translateY(${offset}px)`;
  });
});

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const animateCounter = (element) => {
  const target = Number(element.dataset.target);
  const duration = 1400;
  const startTime = performance.now();
  const step = (currentTime) => {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const value = progress * target;
    element.textContent = target % 1 === 0 ? Math.round(value) : value.toFixed(1);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      if (!counter.dataset.animated) {
        counter.dataset.animated = 'true';
        animateCounter(counter);
      }
    }
  });
}, { threshold: 0.7 });

counters.forEach((counter) => observer.observe(counter));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealItems.forEach((item) => revealObserver.observe(item));

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    dishCards.forEach((card) => {
      const matches = filter === 'all' || card.dataset.category === filter;
      card.style.display = matches ? 'block' : 'none';
    });
  });
});

searchInput?.addEventListener('input', (event) => {
  const query = event.target.value.toLowerCase();
  dishCards.forEach((card) => {
    const text = card.textContent.toLowerCase();
    const match = text.includes(query);
    card.style.display = match ? 'block' : 'none';
  });
});

addButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const notice = document.createElement('div');
    notice.className = 'cart-notice show';
    notice.textContent = 'Added to cart';
    document.body.appendChild(notice);
    setTimeout(() => notice.remove(), 1400);
  });
});

let testimonialIndex = 0;
setInterval(() => {
  testimonials.forEach((card) => card.classList.remove('active'));
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  testimonials[testimonialIndex].classList.add('active');
}, 5000);

const countdownTarget = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 45;
const updateCountdown = () => {
  const difference = countdownTarget - Date.now();
  if (difference <= 0) return;
  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  countdownEls.hours.textContent = String(hours).padStart(2, '0');
  countdownEls.minutes.textContent = String(minutes).padStart(2, '0');
  countdownEls.seconds.textContent = String(seconds).padStart(2, '0');
};

setInterval(updateCountdown, 1000);
updateCountdown();

const contactForm = document.querySelector('.contact-form');
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const button = contactForm.querySelector('button');
  button.textContent = 'Message Sent';
  button.disabled = true;
  setTimeout(() => {
    button.textContent = 'Send Message';
    button.disabled = false;
    contactForm.reset();
  }, 1800);
});

const parallaxElements = document.querySelectorAll('.hero-visual, .offer-card-large');
