document.addEventListener("DOMContentLoaded", () => {
    const luckyBtn = document.getElementById("luckyBtn");
    const luckyPopup = document.getElementById("luckyPopup");
    const closeLucky = document.querySelector(".close-lucky");
    const luckyNumberDisplay = document.getElementById("luckyNumberDisplay");
    const generateRandomNumber = () => {
        return Math.floor(Math.random() * 100) + 1;
    };

    luckyBtn.addEventListener("click", () => {
        const randomNumber = generateRandomNumber();
        luckyNumberDisplay.textContent = randomNumber;
        luckyPopup.style.display = "flex"; 
    });
    closeLucky.addEventListener("click", () => {
        luckyPopup.style.display = "none";
    });
    luckyPopup.addEventListener("click", (event) => {
        if (event.target === luckyPopup) {
            luckyPopup.style.display = "none";
        }
    });
});