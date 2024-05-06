const carousel = document.querySelector('.carousel');
  const carouselInner = carousel.querySelector('.carousel-inner');
  const items = carouselInner.querySelectorAll('.carousel-item');

  let currentIndex = 0;

  function showItem(index) {
    carouselInner.style.transform = `translateX(-${index * 100}%)`;
  }

  function next() {
    currentIndex = (currentIndex + 1) % items.length;
    showItem(currentIndex);
  }

  function prev() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    showItem(currentIndex);
  }

  setInterval(next, 3000); // Automatically switch slides every 3 seconds