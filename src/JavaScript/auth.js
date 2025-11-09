document.addEventListener('DOMContentLoaded', () => {
    const authModal = document.getElementById('authModal');
    const signUpFormContainer = document.getElementById('signUpFormContainer');
    const loginFormContainer = document.getElementById('loginFormContainer');
    const showSignUpBtn = document.getElementById('showSignUpBtn');
    const showLoginBtn = document.getElementById('showLoginBtn');
    const logOutBtn = document.getElementById('logOutBtn'); 
    const closeBtn = document.querySelector('.auth-close-btn');
    const switchToLoginLink = document.getElementById('switchToLogin');
    const switchToSignUpLink = document.getElementById('switchToSignUp');
    const signUpSubmitBtn = document.getElementById('signUpSubmitBtn');
    const logInSubmitBtn = document.getElementById('logInSubmitBtn');
    const greetingEl = document.getElementById('greeting');
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function displayFormError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.color = 'red';
        }
    }

    function clearFormMessages() {
        displayFormError('signup-message', '');
        displayFormError('login-message', '');
    }
    
    function clearInputFields() {
        const signupName = document.getElementById('signup-name');
        if (signupName) signupName.value = '';
        
        const signupSurname = document.getElementById('signup-surname');
        if (signupSurname) signupSurname.value = '';
        
        const signupEmail = document.getElementById('signup-email');
        if (signupEmail) signupEmail.value = '';
        
        const signupPassword = document.getElementById('signup-password');
        if (signupPassword) signupPassword.value = '';
        
        const signupPhone = document.getElementById('signup-phone');
        if (signupPhone) signupPhone.value = '';
        
        const loginEmail = document.getElementById('login-email');
        if (loginEmail) loginEmail.value = '';
        
        const loginPassword = document.getElementById('login-password');
        if (loginPassword) loginPassword.value = '';
    }

    function validateSignUp(name, surname, email, password, phone, messageElId = 'signup-message') {
        let isValid = true;
        let errorMessage = '';
        const MIN_PASSWORD_LENGTH = 8;
        if (name === '' || surname === '') {
            errorMessage += 'Name and Surname are required. ';
            isValid = false;
        }

        if (email === '') {
            errorMessage += 'Email is required. ';
            isValid = false;
        } else if (!isValidEmail(email)) {
            errorMessage += 'Enter a valid Email address. ';
            isValid = false;
        }
        
        if (password === '') {
            errorMessage += 'Password is required. ';
            isValid = false;
        } else if (password.length < MIN_PASSWORD_LENGTH) {
            errorMessage += `Password must be at least ${MIN_PASSWORD_LENGTH} characters long. `;
            isValid = false;
        }

        if (phone === '') {
            errorMessage += 'Phone Number is required. ';
            isValid = false;
        } else {
            const phonePattern = /^[+\d\s()-]+$/; 
            if (phone.replace(/[()\s-]/g, '').length < 10 || !phonePattern.test(phone)) {
                errorMessage += 'Enter a valid phone number (minimum 10 digits). ';
                isValid = false;
            }
        }
        
        displayFormError(messageElId, errorMessage.trim());
        return isValid;
    }


    const getUsers = () => {
        const users = localStorage.getItem('kinohubUsers');
        return users ? JSON.parse(users) : {};
    };

    const saveUsers = (users) => {
        localStorage.setItem('kinohubUsers', JSON.stringify(users));
    };

    function openModal(formToShow) {
        if (!authModal) return; 
        clearFormMessages();
        clearInputFields();

        if (formToShow === 'login') {
            if (loginFormContainer) loginFormContainer.classList.remove('hidden-auth-form');
            if (signUpFormContainer) signUpFormContainer.classList.add('hidden-auth-form');
        } else {
            if (signUpFormContainer) signUpFormContainer.classList.remove('hidden-auth-form');
            if (loginFormContainer) loginFormContainer.classList.add('hidden-auth-form');
        }
        authModal.style.display = 'flex';
    }

    function closeModal() {
        if (!authModal) return;
        authModal.style.display = 'none';
        clearFormMessages();
        clearInputFields();
    }
    
    function updateHeaderButtons(isLoggedIn, userEmail = '') {
        if (showSignUpBtn) showSignUpBtn.classList[isLoggedIn ? 'add' : 'remove']('hidden-auth-form');
        if (showLoginBtn) showLoginBtn.classList[isLoggedIn ? 'add' : 'remove']('hidden-auth-form');
        if (logOutBtn) logOutBtn.classList[isLoggedIn ? 'remove' : 'add']('hidden-auth-form');
        
        if (greetingEl) {
            if (isLoggedIn) {
                const users = getUsers();
                const displayName = users[userEmail] && users[userEmail].name ? users[userEmail].name : userEmail;
                greetingEl.textContent = `Hello, ${displayName}! Enjoy your movies.`;
            } else {
                greetingEl.textContent = 'Welcome to KINOHUB!';
            }
        }
    }
    
    if (showSignUpBtn) showSignUpBtn.addEventListener('click', () => openModal('signup'));
    if (showLoginBtn) showLoginBtn.addEventListener('click', () => openModal('login'));
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    
    if (authModal) {
        window.addEventListener('click', (event) => {
            if (event.target === authModal) {
                closeModal();
            }
        });
    }

    if (switchToLoginLink) switchToLoginLink.addEventListener('click', (e) => { e.preventDefault(); openModal('login'); });
    if (switchToSignUpLink) switchToSignUpLink.addEventListener('click', (e) => { e.preventDefault(); openModal('signup'); });

    if (signUpSubmitBtn) {
        signUpSubmitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const name = document.getElementById('signup-name').value.trim();
            const surname = document.getElementById('signup-surname').value.trim();
            const email = document.getElementById('signup-email').value.trim();
            const password = document.getElementById('signup-password').value.trim();
            const phone = document.getElementById('signup-phone').value.trim();
            const messageElId = 'signup-message';

            if (!validateSignUp(name, surname, email, password, phone, messageElId)) {
                return;
            }

            let users = getUsers();
            if (users[email]) {
                displayFormError(messageElId, 'User with this email already exists.');
                return;
            }

            users[email] = {
                name: name,
                surname: surname,
                password: password, 
                phone: phone
            }; 
            saveUsers(users);

            displayFormError(messageElId, 'Registration successful! You can now log in.');
            document.getElementById(messageElId).style.color = 'green';
            
            setTimeout(() => openModal('login'), 1500);
        });
    }
    
    if (logInSubmitBtn) {
        logInSubmitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value.trim();
            const messageElId = 'login-message';
            
            displayFormError(messageElId, '');

            if (!email || !password || !isValidEmail(email)) {
                displayFormError(messageElId, 'Please enter a valid email and password.');
                return;
            }

            const users = getUsers();

            if (users[email] && users[email].password === password) {
                sessionStorage.setItem('loggedInUser', email); 
                displayFormError(messageElId, 'Login successful! Welcome to KINOHUB!');
                document.getElementById(messageElId).style.color = 'green';
                
                setTimeout(() => {
                    closeModal();
                    updateHeaderButtons(true, email); 
                    
                    if (typeof loadProfileData === 'function') {
                        loadProfileData();
                    }

                    if (window.location.pathname.includes('a4p1t1.html') || window.location.pathname.includes('moviehub.html')) {
                        window.location.reload(); 
                    }
                    
                }, 1000);

            } else {
                displayFormError(messageElId, 'Invalid email or password.');
            }
        });
    }

    if (logOutBtn) {
        logOutBtn.addEventListener('click', () => {
            sessionStorage.removeItem('loggedInUser');
            updateHeaderButtons(false); 
            alert('You have been logged out.');
            
            if (typeof loadProfileData === 'function') {
                loadProfileData();
            }

            if (window.location.pathname.includes('a4p1t1.html') || window.location.pathname.includes('moviehub.html')) {
                 window.location.reload(); 
            }
        });
    }

    const initialUserEmail = sessionStorage.getItem('loggedInUser');
    if (initialUserEmail) {
        updateHeaderButtons(true, initialUserEmail);
    } else {
        updateHeaderButtons(false);
    }
});