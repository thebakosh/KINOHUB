$(document).ready(function (){
    console.log("Document is ready!");
    console.log("jQuery version: " + $.fn.jquery);
    
    $('#searchInput').on('keyup', function () {
        var query = $(this).val().trim().toLowerCase();
        var searchResultsDiv = $('#searchResults');

        if (query === "") {
            searchResultsDiv.fadeOut().empty();
            return;
        }

        var resultsHtml = '';
        var seenTitles = new Set();
        
        $('.movie-section .movie-list .movie-card').each(function () {
            var $card = $(this);
            var titleElement = $card.find('.title');
            var titleText = titleElement.text().trim().toLowerCase();
            
            var linkUrl = $card.find('a').attr('href') || '#'; 

            if (titleText.indexOf(query) > -1 && !seenTitles.has(titleText)) {
                seenTitles.add(titleText);
                
                resultsHtml += `
                    <div class="movie-card" data-title="${titleText}" data-url="${linkUrl}">
                        <p class="title">${titleElement.text()}</p>
                        <p class="date">${$card.find('.date').text()}</p>
                    </div>
                `;
            }
        });

        if (resultsHtml) {
            searchResultsDiv.html(resultsHtml).fadeIn();
        } else {
            searchResultsDiv.fadeOut();
        }
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