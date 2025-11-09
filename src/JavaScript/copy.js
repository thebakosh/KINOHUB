const copyBtn = document.getElementById("copyBtn");
const copyText = document.getElementById("copyText");
const tooltip = document.getElementById("tooltip");
const icon = copyBtn.querySelector(".copy-icon");

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(copyText.textContent)
    .then(() => {
      icon.textContent = "📩";
      tooltip.classList.add("show");
      setTimeout(() => {
        tooltip.classList.remove("show");
        icon.textContent = "📋";
      }, 1500);
    })
    .catch(err => console.error("Clipboard error:", err));
});
