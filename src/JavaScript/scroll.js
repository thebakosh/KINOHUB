$(document).ready(function() {
    var $progressBar = $('#progressBar');

    function updateProgressBar() {
        var scrollTop = $(window).scrollTop();
        var docHeight = $(document).height();
        var winHeight = $(window).height();
        var scrollableHeight = docHeight - winHeight;
        if (scrollableHeight === 0) {
            $progressBar.css('width', '100%');
            return;
        }
        var scrollPercent = (scrollTop / scrollableHeight) * 100;
        $progressBar.css('width', scrollPercent + '%');
    }
    $(window).on('scroll', updateProgressBar);
    updateProgressBar();
});