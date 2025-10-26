document.addEventListener("DOMContentLoaded", () => {
  const usernameEl = document.querySelector(".username h3");
  const editBtn = document.querySelector(".username button");

  const profileSection = document.createElement("div");
  profileSection.className = "profile-extra";
  usernameEl.parentElement.parentElement.appendChild(profileSection);

  const bioEl = document.getElementById("bioText");
  const updateBtn = document.getElementById("updateProfile");

  const savedName = localStorage.getItem("username");
  const savedBio = localStorage.getItem("bio");
  if (savedName) usernameEl.textContent = savedName;
  if (savedBio) bioEl.innerHTML = savedBio;

  editBtn.addEventListener("click", () => {
    const newName = prompt("Enter new username:");
    if (newName && newName.trim() !== "") {
      usernameEl.textContent = newName.trim();
      localStorage.setItem("username", newName.trim());
    }
  });

  updateBtn.addEventListener("click", () => {
    const newBio = prompt("Enter your bio:");
    if (newBio && newBio.trim() !== "") {
      bioEl.innerHTML = `<strong>${newBio.trim()}</strong>`;
      localStorage.setItem("bio", `<strong>${newBio.trim()}</strong>`);
    }
  });
});
