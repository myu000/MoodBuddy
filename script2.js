// ---------- Dynamic Year ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Smooth Scroll for Nav ----------
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ---------- Scroll Reveal (Cascading Slides) ----------
const revealElements = document.querySelectorAll('.slide-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => observer.observe(el));

// ---------- Typing Effect for First Chat Bubble ----------
function typeEffect(element, speed = 50) {
  const text = element.textContent;
  element.textContent = '';
  let i = 0;
  const timer = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);
}

window.addEventListener('load', () => {
  const firstBubble = document.querySelector('.chat-bubble');
  if (firstBubble) {
    typeEffect(firstBubble, 40);
  }
});

// ---------- Formspree Submit ----------
const form = document.getElementById('moodForm');
const statusEl = document.getElementById('formStatus');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    statusEl.textContent = '✨ Sending your vibe...';
    const data = new FormData(form);
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: data
      });
      if (res.ok) {
        statusEl.textContent = '🌸 Thanks! Your mood board request is on its way.';
        form.reset();
      } else {
        statusEl.textContent = '⚠️ Oops, something went wrong. Try again.';
      }
    } catch (err) {
      statusEl.textContent = '🚫 Network error. Please check your connection.';
    }
  });
}
