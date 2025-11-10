$(document).ready(function() {
  const $body = $('body');
  const $darkModeToggle = $('#dark-mode');
  const $changeThemeButton = $('#changeColorBtn');
  const storageKey = 'kinohub_theme';

  function setTheme(theme) {
    if (theme === 'dark') {
      $body.addClass('dark-mode');
      $darkModeToggle.prop('checked', true);
    } else {
      $body.removeClass('dark-mode');
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
    setTheme(this.checked ? 'dark' : 'light');
  });

  $changeThemeButton.on('click', function() {
    const isDark = $body.hasClass('dark-mode');
    setTheme(isDark ? 'light' : 'dark');
  });
});
