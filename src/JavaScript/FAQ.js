const faqButton = document.getElementById('faqButton');
const faqPopup = document.getElementById('faqPopup');
const closeFaq = document.getElementById('closeFaq');

faqButton.addEventListener('click', () => {
  faqPopup.style.display = 'flex';
});

closeFaq.addEventListener('click', () => {
  faqPopup.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === faqPopup) {
    faqPopup.style.display = 'none';
  }
});

const questions = document.querySelectorAll('.faq-question');
questions.forEach(q => {
  q.addEventListener('click', () => {
    const answer = q.nextElementSibling;
    q.classList.toggle('active');
    if (q.classList.contains('active')) {
      answer.style.maxHeight = answer.scrollHeight + 'px';
    } else {
      answer.style.maxHeight = null;
    }
  });
});


