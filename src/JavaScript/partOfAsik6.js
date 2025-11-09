document.addEventListener("DOMContentLoaded", function () {

  if (typeof button !== "undefined" && button && Array.isArray(colors)) {
    let currentColorIndex = 0;
    button.addEventListener("click", function () {
      document.body.style.backgroundColor = colors[currentColorIndex];
      currentColorIndex = (currentColorIndex + 1) % colors.length;
    });
  }
  const showTimeBtn = document.getElementById("showTimeBtn");
  const timeDisplay = document.getElementById("currentTimeDisplay");

  if (showTimeBtn && timeDisplay) {
    showTimeBtn.addEventListener("click", function () {
      if (!timeDisplay.style.display || timeDisplay.style.display === "none") {
        timeDisplay.textContent = `Current Time: ${new Date().toLocaleTimeString()}`;
        timeDisplay.style.display = "block";
      } else {
        timeDisplay.style.display = "none";
      }
    });
  }

  document.addEventListener("keydown", function (event) {
    const navButtons = document.querySelectorAll(".nav-buttons button, .nav-buttons a");
    if (!navButtons.length) return;

    let currentIndex = Array.from(navButtons).indexOf(document.activeElement);

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      currentIndex =
        event.key === "ArrowDown"
          ? (currentIndex + 1) % navButtons.length
          : (currentIndex - 1 + navButtons.length) % navButtons.length;

      navButtons[currentIndex].focus();
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    const greetingElement = document.getElementById("greeting");

    if (greetingElement) {
      const hour = new Date().getHours();
      greetingElement.textContent =
        hour < 12 ? "Good morning!" :
          hour < 18 ? "Good afternoon!" :
            "Good evening!";
    }
  });

});
