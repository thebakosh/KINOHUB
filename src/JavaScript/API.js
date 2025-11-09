const apiKey = 'e0f8a9ad'; // Ваш API-ключ OMDb
const apiUrl = 'http://www.omdbapi.com/?apikey=' + apiKey;

const movieIds = [
  'tt1375666',
  'tt0068646',
  'tt0241527',
  'tt1022603',
  'tt0245429',
  'tt0110475',
  'tt0109830',
  'tt0111161',
  'tt30472557',
  'tt0137523',
  'tt0145487',
  'tt7335184'
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function loadMovies() {
  const movieListDiv = document.querySelector('.movie-list');

  const shuffledMovies = shuffleArray([...movieIds]).slice(0, 5);

  let movieCount = 0;

  shuffledMovies.forEach(movieId => {
    const url = `${apiUrl}&i=${movieId}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.Response === "True" && data.Poster !== "N/A") {
          displayMovie(data, movieListDiv);
          movieCount++;
        }

        if (movieCount >= 5) return;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  });
}

function displayMovie(movie, container) {
  const movieCard = document.createElement('div');
  movieCard.classList.add('movie-card', 'col-12', 'col-sm-6', 'col-md-4', 'col-lg-3');

  movieCard.innerHTML = `
        <a href="#"><img src="${movie.Poster}" alt="${movie.Title}" class="lazy-image img-fluid"></a>
        <p class="title">${movie.Title}</p>
        <p class="date">${movie.Year}</p>
    `;

  container.appendChild(movieCard);
}

document.addEventListener('DOMContentLoaded', loadMovies);
