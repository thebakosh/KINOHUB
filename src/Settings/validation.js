document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('accountUpdateForm');
    const updateFeedback = document.getElementById('updateFeedback');
        const getUsers = () => {
        const users = localStorage.getItem('kinohubUsers');
        return users ? JSON.parse(users) : {};
    };

    const saveUsers = (users) => {
        localStorage.setItem('kinohubUsers', JSON.stringify(users));
    };

    const getLoggedInEmail = () => {
        return sessionStorage.getItem('loggedInUser');
    };
    
    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        if (updateFeedback) {
            updateFeedback.textContent = '';
        }
    }
    
    function loadUserData(email) {
        const users = getUsers();
        const userData = users[email];

        if (userData) {
            document.getElementById('name').value = userData.name || '';
            document.getElementById('surname').value = userData.surname || '';
            document.getElementById('email').value = email; 
            document.getElementById('phone').value = userData.phone || '';
            document.getElementById('email').disabled = true; // Email нельзя менять
        } else {
            if (updateFeedback) {
                updateFeedback.textContent = 'User data not found. Please log in first.';
                updateFeedback.style.color = 'red';
            }
            if (form) {
                 form.querySelector('button[type="submit"]').disabled = true;
            }
        }
    }
    
    const loggedInEmail = getLoggedInEmail();

    if (loggedInEmail) {
        loadUserData(loggedInEmail);
    } else {
        if (updateFeedback) {
            updateFeedback.textContent = 'You must be logged in to view or change settings.';
            updateFeedback.style.color = 'red';
        }
        if (form) {
             const saveButton = form.querySelector('button[type="submit"]');
             if (saveButton) saveButton.disabled = true;
        }
    }

    if (!form) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        clearErrors();

        let isValid = true;
        
        const name = document.getElementById('name').value.trim();
        const surname = document.getElementById('surname').value.trim();
        const email = document.getElementById('email').value.trim(); 
        const newPassword = document.getElementById('new-password').value; 
        const phone = document.getElementById('phone').value.trim();


        if (isValid) {
            const users = getUsers();
            const userData = users[email];
            
            if (userData) {
                userData.name = name;
                userData.surname = surname;
                userData.phone = phone;

                if (newPassword !== '') {
                    userData.password = newPassword;
                }
                
                saveUsers(users);

                updateFeedback.textContent = 'Account details successfully saved! Changes may appear on the Profile page.';
                updateFeedback.style.color = 'green';
                
                document.getElementById('new-password').value = ''; 

            } else {
                updateFeedback.textContent = 'Error: User data not found for saving.';
                updateFeedback.style.color = 'red';
            }
        }
    });
});