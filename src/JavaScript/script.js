$(document).ready(function (){
    console.log("Document is ready!");
    console.log("version:" + $.fn.jquery);
})

$(document).ready(function () {
  $('#searchInput').on('keyup', function () {
    var query = $(this).val().trim().toLowerCase();
    if (query === "") {
      $('#searchResults').fadeOut().empty();
      return;
    }

    var resultsHtml = '';
    var seenTitles = new Set();

    $('.movie-card').each(function () {
      var title = $(this).data('title').trim().toLowerCase();
      if (title.indexOf(query) > -1 && !seenTitles.has(title)) {
        seenTitles.add(title);

        resultsHtml += `
          <div class="movie-card" data-title="${title}">
            <p class="title">${$(this).find('.title').text()}</p>
          </div>
        `;
      }
    });

    if (resultsHtml) {
      $('#searchResults').html(resultsHtml).fadeIn();
    } else {
      $('#searchResults').fadeOut();
    }
  });

  $(document).click(function (e) {
    if (!$(e.target).closest('.search-form, #searchResults').length) {
      $('#searchResults').fadeOut();
    }
  });

  $(document).on('click', '.movie-card', function () {
    var selectedTitle = $(this).data('title');
    $('#searchInput').val(selectedTitle);
    $('#searchResults').fadeOut();
  });
});

$(document).ready(function(){
  $('#searchNewsForm').on('submit', function() {
    var searchNewsQuery = $('#searchNewsInput').val().toLowerCase();
    if (searchNewsQuery) {
      $('.highlight').each(function() {
        var text = $(this).text();
        $(this).replaceWith(text);
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
