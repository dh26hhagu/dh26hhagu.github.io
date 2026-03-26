document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('ui-enhanced');

  // ===== Highlight trang hiện tại =====
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-main[href]').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === current) {
      link.classList.add('active-page');
    }
  });

  // ===== Enhance search input =====
  document.querySelectorAll('#searchInput').forEach((input) => {
    if (input.dataset.enhanced === '1') return;

    if (!input.parentNode) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'ui-search-wrap';

    input.parentNode.insertBefore(wrapper, input);
    wrapper.appendChild(input);

    const icon = document.createElement('span');
    icon.className = 'ui-search-icon';
    icon.textContent = '🔎';
    wrapper.appendChild(icon);

    input.dataset.enhanced = '1';

    // Fix lỗi placeholder null
    if (input.placeholder) {
      input.placeholder = input.placeholder.replace('🔍', '').trim();
    }
  });

  // ===== Bảo mật link mở tab mới =====
  document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    const existingRel = link.getAttribute('rel') || '';
    const relTokens = new Set(existingRel.split(/\s+/).filter(Boolean));

    relTokens.add('noopener');
    relTokens.add('noreferrer');

    link.setAttribute('rel', Array.from(relTokens).join(' '));
  });

  // ===== Tối ưu ảnh & nút  =====
  document.querySelectorAll('img').forEach((img) => {
    if (!img.hasAttribute('loading')) {
      img.loading = 'lazy';
    }

    if (!img.hasAttribute('decoding')) {
      img.decoding = 'async';
    }

    if (!img.getAttribute('alt') || !img.getAttribute('alt').trim()) {
      const cardTitle = img.closest('.card')?.querySelector('h3')?.textContent?.trim();
      img.alt = cardTitle ? `Thumbnail: ${cardTitle}` : 'Thumbnail video thí nghiệm hóa học';
    }
  });
document.querySelectorAll('a.play-btn').forEach((button) => {
    if (button.getAttribute('aria-label')) return;
    const cardTitle = button.closest('.card')?.querySelector('h3')?.textContent?.trim();
    button.setAttribute('aria-label', cardTitle ? `Mở video: ${cardTitle}` : 'Mở video thí nghiệm');
  });
  
  // ===== Animation card khi scroll =====
  const cards = document.querySelectorAll('.card');

  if (!cards.length) return;
const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    cards.forEach((card) => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
      card.style.transition = 'none';
      card.style.transitionDelay = '0ms';
    });
    return;
  }

  // Fallback cho trình duyệt cũ
  if (!('IntersectionObserver' in window)) {
    cards.forEach((card) => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    });
    return;
  }

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
    card.style.transition = 'all 0.4s ease';
    card.style.transitionDelay = `${Math.min(i * 25, 220)}ms`;

    observer.observe(card);
  });
});
