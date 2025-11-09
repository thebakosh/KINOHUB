$(document).ready(function () {
  console.log("Document is ready!");
  console.log("jQuery version: " + $.fn.jquery);

  const apiKey = 'e0f8a9ad'; // Ваш API-ключ OMDb
  const apiUrl = 'http://www.omdbapi.com/?apikey=' + apiKey;

  $('#searchInput').on('keyup', function () {
    var query = $(this).val().trim().toLowerCase();
    var searchResultsDiv = $('#searchResults');

    if (query === "") {
      searchResultsDiv.fadeOut().empty();
      return;
    }

    var resultsHtml = '';
    var seenTitles = new Set();

    const url = `${apiUrl}&s=${encodeURIComponent(query)}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.Response === "True") {
          // Перебираем результаты поиска
          data.Search.forEach(movie => {
            var titleText = movie.Title.toLowerCase();
            var linkUrl = `https://www.imdb.com/title/${movie.imdbID}`;

            if (titleText.indexOf(query) > -1 && !seenTitles.has(titleText)) {
              seenTitles.add(titleText);

              resultsHtml += `
                                <div class="movie-card" data-title="${movie.Title}" data-url="${linkUrl}">
                                    <p class="title">${movie.Title}</p>
                                    <p class="date">${movie.Year}</p>
                                </div>
                            `;
            }
          });
        } else {
          console.error('No movies found for query:', query);
        }

        if (resultsHtml) {
          searchResultsDiv.html(resultsHtml).fadeIn();
        } else {
          searchResultsDiv.fadeOut();
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  });

  $(document).click(function (e) {
    if (!$(e.target).closest('.search-form, #searchResults').length) {
      $('#searchResults').fadeOut();
    }
  });

  $(document).on('click', '#searchResults .movie-card', function () {
    var selectedUrl = $(this).data('url');

    if (selectedUrl && selectedUrl !== '#') {
      window.location.href = selectedUrl;
    } else {
      var selectedTitle = $(this).data('title');
      $('#searchInput').val(selectedTitle);
      $('#searchResults').fadeOut();
    }
  });

  $('#searchNewsForm').on('submit', function(e) {
    e.preventDefault();

    var searchNewsQuery = $('#searchNewsInput').val().toLowerCase();

    if (searchNewsQuery) {
      $('.news-content').each(function() {
        var $content = $(this);
        var text = $content.html();
        var cleanText = text.replace(/<span class="highlight">(.+?)<\/span>/gi, '$1');
        $content.html(cleanText);
      });

      $('.news-content').each(function() {
        var content = $(this).html();
        var regex = new RegExp('(' + searchNewsQuery + ')', 'gi');
        var highlighted = content.replace(regex, '<span class="highlight">$1</span>');
        $(this).html(highlighted);
      });
    }
  });
});
