// Cursor glow
const glow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top  = e.clientY + 'px';
});

// Scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Certificate popup modal
const certModal = document.getElementById('certModal');
const certModalTitle = document.getElementById('certModalTitle');
const certModalBody = document.getElementById('certModalBody');

if (certModal && certModalTitle && certModalBody) {
  const openModal = (title, src) => {
    certModalTitle.textContent = title || 'Certificate';

    if (!src) {
      certModalBody.innerHTML = "<p class='cert-modal-empty'>No certificate media linked yet. Add a file path in the button's <code>data-cert-src</code> attribute.</p>";
    } else if (src.toLowerCase().endsWith('.pdf')) {
      certModalBody.innerHTML = `<iframe src="${src}" title="${title || 'Certificate'}"></iframe>`;
    } else {
      certModalBody.innerHTML = `<img src="${src}" alt="${title || 'Certificate'}" />`;
    }

    certModal.classList.add('open');
    certModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    certModal.classList.remove('open');
    certModal.setAttribute('aria-hidden', 'true');
    certModalBody.innerHTML = '';
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.cert-view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      openModal(btn.dataset.certTitle, btn.dataset.certSrc);
    });
  });

  certModal.querySelectorAll('[data-modal-close]').forEach(el => {
    el.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && certModal.classList.contains('open')) {
      closeModal();
    }
  });
}
