$(document).ready(function() {
    $('.counter').each(function() {
        var $this = $(this);
        var target = parseInt($this.attr('data-target'));
        $({ countNum: 0 }).animate({ countNum: target }, {
            duration: 3000, 
            easing: 'swing', 

            step: function() {
                var formattedNumber = Math.floor(this.countNum).toLocaleString('en-US');
                $this.text(formattedNumber);
            },
            complete: function() {
                $this.text(target.toLocaleString('en-US'));
            }
        });
    });
});