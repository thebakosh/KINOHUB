const contactButton = document.getElementById('contactButton');
const contactPopup = document.getElementById('contactPopup');
const closeContact = document.getElementById('closeContact');
const contactForm = document.getElementById('contactForm');
const feedbackMessage = document.getElementById('feedbackMessage');
const toast = document.getElementById("toast");

contactButton.addEventListener('click', () => {
  contactPopup.style.display = 'flex';
});

closeContact.addEventListener('click', () => {
  contactPopup.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === contactPopup) {
    contactPopup.style.display = 'none';
  }
});

contactForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const name = document.getElementById("contactName").value;
  const email = document.getElementById("contactEmail").value;
  const message = document.getElementById("message").value;

  const formData = {
    name: name,
    email: email,
    message: message
  };

  submitFormData(formData, handleFormSubmissionResponse);
});

function submitFormData(data, callback) {
  fetch('https://formspree.io/f/xwprjpkb', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      callback(true, data);
    })
    .catch(error => {
      callback(false, error);
    });
}

function handleFormSubmissionResponse(success, data) {
  if (success) {
    feedbackMessage.textContent = "Your message has been sent successfully!";
    feedbackMessage.style.color = 'green';
    contactForm.reset();  // Сбрасываем форму
    contactPopup.style.display = 'none'; // Закрываем попап
    showToastMessage();
  } else {
    feedbackMessage.textContent = "There was an error sending your message. Please try again.";
    feedbackMessage.style.color = 'red';
  }
}

function showToastMessage() {
  toast.textContent = "Form submitted successfully!";
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 1200);
}

document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector(".popup-content form");

  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();

      // Показать успешное сообщение
      toast.textContent = "Form submitted successfully!";
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 1200);
      form.reset();
    });
  }
});
