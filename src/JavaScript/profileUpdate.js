function loadProfileData() {
    const displayNameEl = document.getElementById('displayName');
    const bioTextEl = document.getElementById('bioText');
    const pfpImgEl = document.querySelector('.pfp img');
    const updateProfileBtn = document.getElementById('updateProfile');

    const email = sessionStorage.getItem('loggedInUser');
    const users = JSON.parse(localStorage.getItem('kinohubUsers') || '{}');
    const userData = users[email];
    const DEFAULT_PFP = 'pfp.png';

    if (userData) {
        displayNameEl.textContent = userData.displayName || userData.name || 'User Profile';
        bioTextEl.textContent = userData.bio || 'Say something about yourself!';
        pfpImgEl.src = userData.pfp || DEFAULT_PFP;
        updateProfileBtn.textContent = 'Update Profile';
        updateProfileBtn.classList.remove('login-mode');

    } else {
        displayNameEl.textContent = 'Guest User';
        pfpImgEl.src = DEFAULT_PFP;
        updateProfileBtn.textContent = 'Log in to customize your profile.';
    }
}


document.addEventListener('DOMContentLoaded', () => {
    loadProfileData();

    const editProfileModal = document.getElementById('editProfileModal');
    const closeProfileModalBtn = document.getElementById('closeProfileModal');
    const updateProfileBtn = document.getElementById('updateProfile');
    const editProfileForm = document.getElementById('editProfileForm');


    const getLoggedInEmail = () => sessionStorage.getItem('loggedInUser');
    const getUsers = () => JSON.parse(localStorage.getItem('kinohubUsers') || '{}');
    const saveUsers = (users) => localStorage.setItem('kinohubUsers', JSON.stringify(users));


    function closeEditModal() {
        if (editProfileModal) editProfileModal.style.display = 'none';
    }

    function openEditModal() {
        const email = getLoggedInEmail();
        const users = getUsers();
        const userData = users[email];

        if (!userData || !editProfileModal) return;

        document.getElementById('newDisplayName').value = userData.displayName || '';
        document.getElementById('newBioText').value = userData.bio || '';
        document.getElementById('currentPfp').src = userData.pfp || 'pfp.png';
        document.getElementById('profileUpdateFeedback').textContent = '';
        document.getElementById('newPfpFile').value = '';

        editProfileModal.style.display = 'flex';
    }

    if (updateProfileBtn) {
    updateProfileBtn.addEventListener('click', () => {
        const email = getLoggedInEmail();
        if (email) {
            openEditModal();
        } else {
            if (typeof openModal === 'function') {
                openModal('login');
            } else {
                console.error("openModal is not defined. Check script loading order.");
            }
        }
    });
}

    if (closeProfileModalBtn) closeProfileModalBtn.addEventListener('click', closeEditModal);

    if (editProfileForm) {
        editProfileForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = getLoggedInEmail();
            if (!email) return;

            let users = getUsers();
            const userData = users[email];
            if (!userData) return;

            const newName = document.getElementById('newDisplayName').value.trim();
            const newBio = document.getElementById('newBioText').value.trim();
            const pfpFile = document.getElementById('newPfpFile').files[0];
            const feedbackEl = document.getElementById('profileUpdateFeedback');

            if (newName === '') {
                feedbackEl.textContent = 'Display Name cannot be empty.';
                feedbackEl.style.color = 'red';
                return;
            }

            userData.displayName = newName;
            userData.bio = newBio;

            feedbackEl.textContent = 'Saving...';
            feedbackEl.style.color = 'orange';

            if (pfpFile) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    userData.pfp = event.target.result;
                    saveUsers(users);
                    loadProfileData();
                    feedbackEl.textContent = 'Profile updated successfully!';
                    feedbackEl.style.color = 'green';
                    setTimeout(closeEditModal, 1500);
                };
                reader.readAsDataURL(pfpFile);
            } else {
                saveUsers(users);
                loadProfileData();
                feedbackEl.textContent = 'Profile updated successfully!';
                feedbackEl.style.color = 'green';
                setTimeout(closeEditModal, 1500);
            }
        });
    }

    const newPfpFileInput = document.getElementById('newPfpFile');
    const currentPfpInModal = document.getElementById('currentPfp');
    if (newPfpFileInput && currentPfpInModal) {
        newPfpFileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    currentPfpInModal.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
});
