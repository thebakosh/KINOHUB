document.addEventListener("DOMContentLoaded", () => {
  const luckyBtn = document.getElementById("luckyBtn");
  const luckyPopup = document.getElementById("luckyPopup");
  const closeLucky = document.querySelector(".close-lucky");
  const luckyNumberDisplay = document.getElementById("luckyNumberDisplay");

  const numbers = [14, 22, 1];

  luckyBtn.addEventListener("click", () => {
    const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
    luckyNumberDisplay.textContent = randomNumber;
    luckyPopup.style.display = "flex";
  });

  closeLucky.addEventListener("click", () => {
    luckyPopup.style.display = "none";
  });
});
