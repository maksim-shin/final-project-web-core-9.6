import '../scss/style.scss';

/* =========================
   BURGER MENU
========================= */
const burgerButtons = document.querySelectorAll('.button-js');
const menu = document.querySelector('.modal__navigation');
const overlay = document.querySelector('.overlay');

if (menu && overlay) {
  burgerButtons.forEach(button => {
    button.addEventListener('click', () => {
      menu.classList.toggle('modal__navigation--open');
      overlay.classList.toggle('overlay--active');
    });
  });

  overlay.addEventListener('click', () => {
    menu.classList.remove('modal__navigation--open');
    overlay.classList.remove('overlay--active');
  });
}

/* =========================
   SWIPERS
========================= */
const swipers = {};
const swiperContainers = ['brands-container', 'equipment-container', 'services-container'];

function initSwiper(containerId) {
  const container = document.getElementById(containerId);
  if (!container || swipers[containerId]) return;

  const pagination = container.querySelector('.swiper-pagination');
  if (!pagination) return;

  try {
    swipers[containerId] = new Swiper(container.querySelector('.swiper') || container, {
      slidesPerView: 'auto',
      centeredSlides: true,
      spaceBetween: 16,
      pagination: {
        el: pagination,
        clickable: true,
      },
      observer: true,
      observeParents: true,
    });
  } catch (e) {
    console.error('Swiper init error for', containerId, e);
  }
}

function destroySwiper(containerId) {
  if (swipers[containerId]?.destroy) {
    swipers[containerId].destroy(true, true);
    swipers[containerId] = null;
  }
}

function handleSwipers() {
  const isMobile = window.innerWidth < 768;

  swiperContainers.forEach(containerId => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const wrapper = container.querySelector('.swiper-wrapper');
    const toggleBtn = container.querySelector('.toggle--btn');

    if (isMobile) {
      initSwiper(containerId);
      if (toggleBtn) toggleBtn.style.display = 'none';
      container.classList.remove('is-open');
    } else {
      destroySwiper(containerId);
      if (toggleBtn && wrapper) {
        toggleBtn.style.display = wrapper.scrollHeight > wrapper.clientHeight ? 'flex' : 'none';
      }
    }
  });
}

// Инициализация при загрузке страницы
window.addEventListener('load', handleSwipers);
// Пересчёт при ресайзе
window.addEventListener('resize', handleSwipers);

/* =========================
   TOGGLE BUTTONS
========================= */
const toggleButtons = document.querySelectorAll('.toggle--btn');

toggleButtons.forEach(button => {
  const targetId = button.dataset.target;
  const container = document.getElementById(targetId);
  const span = button?.querySelector('span');
  const textShow = button.dataset.textShow;
  const textHide = button.dataset.textHide;

  if (!container || !span) return;

  button.addEventListener('click', () => {
    container.classList.toggle('is-open');
    span.textContent = container.classList.contains('is-open') ? textHide : textShow;
  });
});
