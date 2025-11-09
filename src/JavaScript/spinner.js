$(document).ready(function() {
    var $form = $('#accountUpdateForm');
    var $btn = $form.find('.save-button');
    var originalText = $btn.text(); 
    
    $form.on('submit', function(e) {
        e.preventDefault();
        $btn.prop('disabled', true);
        $btn.html('<span class="spinner"></span> Please wait...'); 
        setTimeout(function() {
            $btn.text(originalText);
            $btn.prop('disabled', false);
        }, 2500); 
    });
});