/**
 *VanaTvam - Natural Farms & Nature Communities
 * Interactive Web Application Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const header = document.getElementById('main-header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Modal Popup Management
  const visitModal = document.getElementById('visit-modal');
  const bookVisitBtn = document.getElementById('book-visit-btn');
  const planVisitBtn = document.getElementById('plan-visit-btn');
  const enquireQuickBtn = document.getElementById('enquire-quick-btn');
  const modalClose = document.getElementById('modal-close');
  const visitForm = document.getElementById('visit-form');

  function openModal() {
    visitModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    visitModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (bookVisitBtn) bookVisitBtn.addEventListener('click', openModal);
  if (planVisitBtn) planVisitBtn.addEventListener('click', openModal);
  if (enquireQuickBtn) enquireQuickBtn.addEventListener('click', openModal);
  if (modalClose) modalClose.addEventListener('click', closeModal);

  visitModal.addEventListener('click', (e) => {
    if (e.target === visitModal) {
      closeModal();
    }
  });

  // Form submission handler
  if (visitForm) {
    visitForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const phone = document.getElementById('phone').value;
      
      closeModal();
      showToast(`Thank you, ${name}! Your visit request has been received. Our team will contact you shortly at ${phone}.`);
      visitForm.reset();
    });
  }

  // 3. Project Card Click Modal / Interaction
  const projectCards = document.querySelectorAll('.project-card, .card-v3');
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const titleEl = card.querySelector('.project-name, .card-v3-title, .card-v3-title-inline');
      const detailsEl = card.querySelector('.project-details, .card-v3-meta');
      const projectName = titleEl ? titleEl.innerText : 'VanaTvam Project';
      const projectDetails = detailsEl ? detailsEl.innerText : '';
      showToast(`Selected Project: ${projectName} (${projectDetails}). Click 'Book a Visit' to schedule a tour!`);
    });
  });

  // 4. Custom Toast Notification System
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
      <div style="display: flex; align-items: center; gap: 12px;">
        <i class="fa-solid fa-leaf" style="color: #C6A265; font-size: 1.2rem;"></i>
        <span>${message}</span>
      </div>
    `;

    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '30px',
      left: '50%',
      transform: 'translateX(-50%) translateY(100px)',
      background: '#122217',
      color: '#FFFFFF',
      padding: '16px 28px',
      borderRadius: '50px',
      boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
      fontSize: '0.9rem',
      zIndex: '3000',
      transition: 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
      border: '1px solid rgba(198, 162, 101, 0.4)',
      maxWidth: '90vw',
      textAlign: 'center'
    });

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.transform = 'translateX(-50%) translateY(0)';
    }, 100);

    setTimeout(() => {
      toast.style.transform = 'translateX(-50%) translateY(100px)';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 500);
    }, 4500);
  }

  // 5. Scroll Animations (IntersectionObserver)
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(
    '.intro-heading, .projects-title, .philosophy-heading, .experiences-title, .impact-title, .journal-title, .cta-title'
  );

  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
    observer.observe(el);
  });

  // 7. Impact Stats Counter Animation
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute('data-target'));
          let current = 0;
          const step = Math.max(1, Math.ceil(target / 50));

          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              entry.target.innerText = target;
              clearInterval(timer);
            } else {
              entry.target.innerText = current;
            }
          }, 30);

          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    statNumbers.forEach(el => statsObserver.observe(el));
  }
  // 8. Projects Page Filter Tabs
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCardsDetailed = document.querySelectorAll('.project-detailed-card');

  if (filterBtns.length > 0 && projectCardsDetailed.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        projectCardsDetailed.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => { card.style.display = 'none'; }, 300);
          }
        });
      });
    });
  }

  // 9. Contact Page Form Submit Listener
  const contactPageForm = document.getElementById('contact-page-form');
  if (contactPageForm) {
    contactPageForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const cName = document.getElementById('c-name').value;
      showToast(`Thank you, ${cName}! Your inquiry has been logged. Our advisory team will connect with you shortly.`);
      contactPageForm.reset();
    });
  }
});



