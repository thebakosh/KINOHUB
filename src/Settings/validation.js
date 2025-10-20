document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('accountUpdateForm');
    if (!form) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        clearErrors();

        let isValid = true;
        
        const name = document.getElementById('name').value.trim();
        const surname = document.getElementById('surname').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('new-password').value; 
        const phone = document.getElementById('phone').value.trim();

        if (name === '') {
            displayError('nameError', 'Name is required.');
            isValid = false;
        }
        
        if (surname === '') {
            displayError('surnameError', 'Surname is required.');
            isValid = false;
        }
        
        if (email === '') {
            displayError('emailError', 'Email is required.');
            isValid = false;
        } else if (!isValidEmail(email)) {
            displayError('emailError', 'Enter a valid Email address.');
            isValid = false;
        }

        const MIN_PASSWORD_LENGTH = 8;
        if (password !== '' && password.length < MIN_PASSWORD_LENGTH) {
            displayError('passwordError', `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`);
            isValid = false;
        }

        if (phone !== '') {
            const phonePattern = /^[+\d\s()-]+$/; 
            if (phone.replace(/[()\s-]/g, '').length < 10 || !phonePattern.test(phone)) {
                 displayError('phoneError', 'Enter a valid phone number (minimum 10 digits).');
                 isValid = false;
            }
        }

        if (isValid) {
            alert('Account details successfully updated! (Form passed validation)');
        }
    });

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function displayError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    }
});