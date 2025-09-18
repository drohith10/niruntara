// mobile menu
const menuBtn = document.querySelector('.menu-btn');
const navList = document.querySelector('nav ul');
if (menuBtn && navList) {
  menuBtn.addEventListener('click', () => navList.classList.toggle('open'));
}

// gallery lightbox
const lightbox = document.querySelector('.lightbox');
if (lightbox) {
  document.addEventListener('click', (e) => {
    if (e.target.matches('.gallery img')) {
      lightbox.querySelector('img').src = e.target.src;
      lightbox.classList.add('open');
    } else if (e.target === lightbox) {
      lightbox.classList.remove('open');
      lightbox.querySelector('img').src = '';
    }
  });
}

// contact form (Formspree)
// 1) create a form at https://formspree.io (free tier), copy the endpoint URL
// 2) paste it below in CONTACT_ENDPOINT
const CONTACT_ENDPOINT = "https://formspree.io/f/your-id-here";

async function submitContact(e){
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true; btn.textContent = 'Sending...';

  const data = Object.fromEntries(new FormData(form).entries());
  try {
    const res = await fetch(CONTACT_ENDPOINT, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    });
    if (!res.ok) throw new Error('Network error');
    form.reset();
    alert('Thanks! We will get back to you soon.');
  } catch (err) {
    alert('Sorry, message could not be sent. Please email or call us.');
    console.error(err);
  } finally {
    btn.disabled = false; btn.textContent = 'Send Message';
  }
}
