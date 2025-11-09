let favoriteMovies = [
    { id: 101, title: "SuperErma", genre: "Action", poster: "../Main/poster1.jpg", link: "../SuperErma/superErma.html", rating: 8.5 },
    { id: 102, title: "Yes Man", genre: "Comedy", poster: "../Main/poster2.jpeg", link: "#", rating: 7.8 },
    { id: 103, title: "Mask", genre: "Comedy", poster: "../Main/poster3.jpg", link: "#", rating: 8.2 },
    { id: 104, title: "You", genre: "Drama", poster: "../Main/poster4.jpg", link: "#", rating: 9.0 },
    { id: 105, title: "The Sopranos", genre: "Crime", poster: "../Main/poster5.jpg", link: "#", rating: 9.5 },
    { id: 106, title: "Jumanji", genre: "Adventure", poster: "../Main/poster6.jpg", link: "#", rating: 7.6 }
];

const removeSound = document.getElementById('removeSound');
const listContainer = document.querySelector('.favorite-list-container');
const genreFilterSelect = document.getElementById('genreFilter');
const emptyMessage = document.getElementById('emptyListMessage');

const MovieManager = {
    createCardHTML(movie) {
        return `
            <div class="film-item" data-id="${movie.id}">
                <a href="${movie.link || '#'}"><img src="${movie.poster}" class="filmage" alt="${movie.title} poster"></a>
                <div class="film-text">
                    <h2>${movie.title}</h2>
                    <p>Genre: ${movie.genre} | Rating: ${movie.rating}</p>
                    <button class="remove-btn" data-id="${movie.id}">Delete from favorites</button>
                </div>
            </div>
            <hr data-id="${movie.id}-hr">
        `;
    },

    renderMovies(moviesToRender) {
        listContainer.innerHTML = '';
        if (moviesToRender.length === 0) {
            emptyMessage.style.display = 'block';
            return;
        }
        emptyMessage.style.display = 'none';

        moviesToRender.forEach(movie => {
            listContainer.insertAdjacentHTML('beforeend', this.createCardHTML(movie));
        });
    },

    populateFilter() {
        const allGenres = favoriteMovies.map(movie => movie.genre);
        const uniqueGenres = ['All', ...new Set(allGenres)];

        uniqueGenres.forEach(genre => {
            const option = document.createElement('option');
            option.value = genre;
            option.textContent = genre;
            genreFilterSelect.appendChild(option);
        });
    },

    filterMovies(genre) {
        let filteredList = favoriteMovies;
        if (genre !== 'All') {
            filteredList = favoriteMovies.filter(movie => movie.genre === genre);
        }
        this.renderMovies(filteredList);
    },

    removeMovie(id) {
        favoriteMovies = favoriteMovies.filter(movie => movie.id !== id);
        this.renderMovies(favoriteMovies);
    }
};


document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('changeColorBtn');
    const body = document.body;
    const THEME_KEY = 'userTheme';

    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
    }

    function updateThemeAndButton() {
        if (body.classList.contains('dark-theme')) {
            themeToggleBtn.textContent = 'Change Theme';
            localStorage.setItem(THEME_KEY, 'dark');
        } else {
            themeToggleBtn.textContent = 'Change Theme';
            localStorage.removeItem(THEME_KEY);
        }
    }

    updateThemeAndButton();

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            updateThemeAndButton();
        });
    }

    const showTimeBtn = document.getElementById('showTimeBtn');
    const timeDisplay = document.getElementById('currentTimeDisplay');

    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        timeDisplay.textContent = timeString;
    }

    if (showTimeBtn && timeDisplay) {
        showTimeBtn.addEventListener('click', () => {
            if (timeDisplay.style.display === 'block') {
                timeDisplay.style.display = 'none';
                showTimeBtn.textContent = 'Show Time';
            } else {
                timeDisplay.style.display = 'block';
                showTimeBtn.textContent = 'Hide Time';
                updateTime();
            }
        });

        setInterval(() => {
            if (timeDisplay.style.display === 'block') {
                updateTime();
            }
        }, 1000);
    }

    MovieManager.populateFilter();
    MovieManager.renderMovies(favoriteMovies);

    genreFilterSelect.addEventListener('change', (e) => {
        MovieManager.filterMovies(e.target.value);
    });

    listContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const movieId = parseInt(e.target.dataset.id);

            const filmItem = e.target.closest('.film-item');
            if (filmItem) {
                filmItem.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
                filmItem.style.opacity = '0';
                filmItem.style.transform = 'translateX(-100%)';
            }

            setTimeout(() => {
                MovieManager.removeMovie(movieId);
              showToast("Movie removed from favorites");

                if (removeSound) {
                    removeSound.currentTime = 0;
                    removeSound.play();
                }
            }, 500);
        }
    });

    document.getElementById('clearAllBtn').addEventListener('click', () => {
        if (confirm("Are you sure?")) {
             listContainer.style.transition = 'opacity 0.5s ease-out';
             listContainer.style.opacity = '0';
          showToast("All movies removed");
          setTimeout(() => {
                favoriteMovies = [];
                MovieManager.renderMovies(favoriteMovies);
                listContainer.style.opacity = '1';

                if (removeSound) {
                    removeSound.currentTime = 0;
                    removeSound.play();
                }
            }, 500);
        }
    });
});
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 1200);
}
