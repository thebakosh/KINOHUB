const stars = document.querySelectorAll('.rating i');

stars.forEach((star, index1) => {
  star.addEventListener('click', () => {
    stars.forEach((star, index2) => {
      if (index2 >= index1) {
        star.classList.add('active');
      } else {
        star.classList.remove('active');
      }
    });

    localStorage.setItem('userRating', 5 - index1);
  });
});
window.addEventListener('load', () => {
  const savedRating = localStorage.getItem('userRating');
  if (savedRating) {
    stars.forEach((star, index) => {
      if (5 - index <= savedRating) {
        star.classList.add('active');
      }
    });
  }
});


