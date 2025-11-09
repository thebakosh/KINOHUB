const colors = ['#FF5733', '#333333'];
const button = document.getElementById("changeColorBtn");
let currentColorIndex = 0;

button.addEventListener("click", function() {
  document.body.style.backgroundColor = colors[currentColorIndex];
  currentColorIndex = (currentColorIndex + 1) % colors.length;
});

document.getElementById("showTimeBtn").addEventListener("click", function() {
  const timeDisplay = document.getElementById("currentTimeDisplay");

  if (timeDisplay.style.display === "none" || timeDisplay.style.display === "") {
    const currentTime = new Date().toLocaleTimeString();
    timeDisplay.textContent = `Current Time: ${currentTime}`;
    timeDisplay.style.display = "block";
  } else {
    timeDisplay.style.display = "none";
  }
});

document.addEventListener("keydown", function(event) {
  const navButtons = document.querySelectorAll('.nav-buttons button, .nav-buttons a');
  let currentIndex = Array.from(navButtons).indexOf(document.activeElement);

  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();

    if (event.key === "ArrowDown") {
      currentIndex = (currentIndex + 1) % navButtons.length;
    } else if (event.key === "ArrowUp") {
      currentIndex = (currentIndex - 1 + navButtons.length) % navButtons.length;
    }

    navButtons[currentIndex].focus();
  }
});

function getGreeting() {
  const currentHour = new Date().getHours();

  let greetingMessage = "";

  if (currentHour >= 5 && currentHour < 12) {
    greetingMessage = "Good morning!";
  } else if (currentHour >= 12 && currentHour < 18) {
    greetingMessage = "Good afternoon!";
  } else {
    greetingMessage = "Good evening!";
  }

  document.getElementById("greeting").textContent = greetingMessage;
}

window.onload = getGreeting;
