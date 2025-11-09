$(document).ready(function() {
    const $body = $('body');
    const $darkModeToggle = $('#dark-mode'); 
    const $changeThemeButton = $('#changeColorBtn');
    const storageKey = 'kinohub_theme';

    function setTheme(theme) {
        if (theme === 'dark') {
            $body.attr('data-theme', 'dark');
            $darkModeToggle.prop('checked', true);
        } else {
            $body.attr('data-theme', 'light');
            $darkModeToggle.prop('checked', false);
        }
        localStorage.setItem(storageKey, theme); 
    }

    const savedTheme = localStorage.getItem(storageKey);
        if (savedTheme) {
        setTheme(savedTheme);
    } else {
        setTheme('light'); 
    }

    $darkModeToggle.on('change', function() {
        if (this.checked) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    });

    $changeThemeButton.on('click', function() {
        const currentTheme = $body.attr('data-theme');
        if (currentTheme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    });
});