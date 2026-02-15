import '../scss/style.scss';
/* =========================
   BURGER MENU
========================= */
const burgerButtons = document.querySelectorAll('.button-js');
const menu = document.querySelector('.modal__navigation');
const overlay = document.querySelector('.overlay');

burgerButtons.forEach(button => {
  button.addEventListener('click', () => {
    menu.classList.toggle('modal__navigation--open');
    overlay.classList.toggle('overlay--active');
  });
});

if (overlay) {
  overlay.addEventListener('click', () => {
    menu.classList.remove('modal__navigation--open');
    overlay.classList.remove('overlay--active');
  });
}

/* =========================
   SWIPERS
========================= */
const swipers = {};

function initSwiper(containerId) {
  const container = document.getElementById(containerId);
  if (!container || swipers[containerId]) return;

  const wrapper = container.querySelector('.swiper');
  const pagination = container.querySelector('.swiper-pagination');

  if (!wrapper || !pagination) return;

  swipers[containerId] = new Swiper(wrapper, {
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 16,
    pagination: {
      el: pagination,
      clickable: true,
    },
  });
}

function destroySwiper(containerId) {
  if (swipers[containerId] && typeof swipers[containerId].destroy === 'function') {
    swipers[containerId].destroy(true, true);
    swipers[containerId] = null;
  }
}

function handleSwipers() {
  const isMobile = window.innerWidth < 768;

  ['brands-container', 'equipment-container'].forEach(containerId => {
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
      if (toggleBtn) {
        toggleBtn.style.display = wrapper.scrollHeight > wrapper.clientHeight ? 'flex' : 'none';
      }
    }
  });
}

// Инициализация при загрузке страницы
handleSwipers();

// Пересчёт при ресайзе
window.addEventListener('resize', handleSwipers);

/* =========================
   TOGGLE BUTTONS
========================= */
const toggleButtons = document.querySelectorAll('.toggle--btn');

toggleButtons.forEach(button => {
  const targetId = button.dataset.target; // ID контейнера
  const container = document.getElementById(targetId); 
  const span = button.querySelector('span'); // текст кнопки
  const textShow = button.dataset.textShow;   // текст при закрытом состоянии
  const textHide = button.dataset.textHide;   // текст при открытом состоянии

  if (!container) return;

  button.addEventListener('click', () => {
    container.classList.toggle('is-open');

    if (container.classList.contains('is-open')) {
      span.textContent = textHide;
    } else {
      span.textContent = textShow;
    }
  });
});
