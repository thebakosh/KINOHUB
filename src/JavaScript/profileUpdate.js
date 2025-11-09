function loadProfileData() {
    const displayNameEl = document.getElementById('displayName');
    const bioTextEl = document.getElementById('bioText');
    const pfpImgEl = document.querySelector('.pfp img'); 
    const updateProfileBtn = document.getElementById('updateProfile');
    // Используем ID кнопки Log Out с универсальной страницы
    const logoutBtn = document.getElementById('logout-button'); 

    const email = sessionStorage.getItem('loggedInUser');
    const users = JSON.parse(localStorage.getItem('kinohubUsers') || '{}');
    const userData = users[email];
    const DEFAULT_PFP = 'pfp.png'; 

    if (userData) {
        // Пользователь вошел в систему
        displayNameEl.textContent = userData.displayName || userData.name || 'User Profile'; 
        bioTextEl.textContent = userData.bio || 'Say something about yourself!';
        pfpImgEl.src = userData.pfp || DEFAULT_PFP; 
        updateProfileBtn.textContent = 'Update Profile';
        updateProfileBtn.classList.remove('login-mode');
        // Кнопка Log Out управляется здесь, чтобы синхронизировать видимость с данными профиля
        if (logoutBtn) logoutBtn.style.display = 'block'; 

    } else {
        // Пользователь не вошел в систему
        displayNameEl.textContent = 'Guest User';
        bioTextEl.textContent = 'Log in to customize your profile.';
        pfpImgEl.src = DEFAULT_PFP;
        updateProfileBtn.textContent = 'Log In'; 
        updateProfileBtn.classList.add('login-mode');
        if (logoutBtn) logoutBtn.style.display = 'none';
    }
}


document.addEventListener('DOMContentLoaded', () => {
    loadProfileData(); // Инициализация

    const editProfileModal = document.getElementById('editProfileModal');
    const closeProfileModalBtn = document.getElementById('closeProfileModal');
    const updateProfileBtn = document.getElementById('updateProfile');
    const editProfileForm = document.getElementById('editProfileForm');

    // !!! УДАЛЕНЫ ЭЛЕМЕНТЫ МОДАЛЬНОГО ОКНА ВХОДА (logInModal, closeLogInModalBtn) !!!
    
    // Вспомогательные функции для Local Storage
    const getLoggedInEmail = () => sessionStorage.getItem('loggedInUser');
    const getUsers = () => JSON.parse(localStorage.getItem('kinohubUsers') || '{}');
    const saveUsers = (users) => localStorage.setItem('kinohubUsers', JSON.stringify(users));

    // !!! УДАЛЕНЫ ФУНКЦИИ closeLogInModal() И openLogInModal() !!!

    function closeEditModal() {
        if (editProfileModal) editProfileModal.style.display = 'none';
    }

    function openEditModal() {
        const email = getLoggedInEmail();
        const users = getUsers();
        const userData = users[email];
        
        if (!userData || !editProfileModal) return; 

        // Заполнение модального окна текущими данными
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
            // Вызываем глобальную функцию из auth.js
            if (typeof openModal === 'function') {
                openModal('login'); 
            } else {
                // Fallback
                console.error("openModal is not defined. Check script loading order.");
            }
        }
    });
}
    
    // Обработчик закрытия модального окна РЕДАКТИРОВАНИЯ
    if (closeProfileModalBtn) closeProfileModalBtn.addEventListener('click', closeEditModal);

    // --- ОБРАБОТЧИК СОХРАНЕНИЯ ФОРМЫ РЕДАКТИРОВАНИЯ (БЕЗ ИЗМЕНЕНИЙ) ---
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

    // Предварительный просмотр аватара (БЕЗ ИЗМЕНЕНИЙ)
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