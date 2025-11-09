window.addEventListener('scroll', lazyLoadImages);

function lazyLoadImages() {
  const windowBottom = window.scrollY + window.innerHeight;
  const lazyImages = document.querySelectorAll('img[data-src]');

  lazyImages.forEach(img => {
    const imgTop = img.offsetTop;

    if (windowBottom >= imgTop - 100) {
      img.setAttribute('src', img.getAttribute('data-src'));
      img.removeAttribute('data-src');
    }
  });
}
lazyLoadImages();

