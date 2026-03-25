document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('ui-enhanced');

  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-main[href]').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === current) link.classList.add('active-page');
  });

  document.querySelectorAll('#searchInput').forEach((input) => {
    if (input.dataset.enhanced === '1') return;
    const wrapper = document.createElement('div');
    wrapper.className = 'ui-search-wrap';
    input.parentNode.insertBefore(wrapper, input);
    wrapper.appendChild(input);

    const icon = document.createElement('span');
    icon.className = 'ui-search-icon';
    icon.textContent = '🔎';
    wrapper.appendChild(icon);

    input.dataset.enhanced = '1';
    input.placeholder = input.placeholder.replace('🔍', '').trim();
  });

  const cards = document.querySelectorAll('.card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(12px)';
    card.style.transitionDelay = `${Math.min(i * 25, 220)}ms`;
    observer.observe(card);
  });
});
