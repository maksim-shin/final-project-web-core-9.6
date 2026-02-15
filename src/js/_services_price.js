 const servicesId = 'services-container';
  if (!swipers[servicesId]) {
    const container = document.getElementById(servicesId);
    if (container) {
      const wrapper = container.querySelector('.swiper-wrapper');
      const pagination = container.querySelector('.swiper-pagination');

      if (wrapper && pagination) {
        swipers[servicesId] = new Swiper(wrapper, {
          slidesPerView: 'auto',
          centeredSlides: true,
          spaceBetween: 16,
          pagination: {
            el: pagination,
            clickable: true,
          },
        });
      }
    }
  }