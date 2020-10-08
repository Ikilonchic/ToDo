(function ($) {
    "use strict";
    $('body').scrollspy({ target: '#project-list' });

    $('[data-spy="scroll"]').each(function () {
        let $spy = $(this).scrollspy('refresh');
    });
    
})(jQuery);