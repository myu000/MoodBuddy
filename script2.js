// ---------- Dynamic Year ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Formspree Submit ----------
const form = document.getElementById('moodForm');
const statusEl = document.getElementById('formStatus');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    statusEl.textContent = 'Submitting your vibe...';
    const data = new FormData(form);
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: data
      });
      if (res.ok) {
        statusEl.textContent = '✨ Thanks! Your mood board request has been sent. I’ll reply by email.';
        form.reset();
      } else {
        statusEl.textContent = '⚠️ Something went wrong. Please try again.';
      }
    } catch (err) {
      statusEl.textContent = '🚫 Network error. Please check your connection.';
    }
  });
}

// ---------- Scroll Reveal ----------
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.card, .form, .chat-bubble, .section-title').forEach(el => observer.observe(el));

// ---------- Parallax Hero ----------
const hero = document.querySelector('.hero');
if (hero) {
  window.addEventListener('scroll', () => {
    const offset = window.scrollY * 0.3;
    hero.style.backgroundPosition = `center ${offset}px`;
  });
}

// ---------- Surprise Mode (Optional) ----------
const surpriseBtn = document.querySelector('.btn-surprise');
if (surpriseBtn) {
  surpriseBtn.addEventListener('click', () => {
    alert("🎁 Surprise! You'll receive a random mood board based on your vibe.");
  });
}