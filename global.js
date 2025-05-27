$(function () { 
    function toggleMobileNav() {
        $('.mobile-nav-links').toggleClass('active');
    }

    $('#mobile-menu-btn').on('click', function () {
        toggleMobileNav();
    });

    $(document).on('click', function(e) {
        if (!$(e.target).closest('.mobile-nav-links, #mobile-menu-btn').length) {
            $('.mobile-nav-links').removeClass('active');
        }
    });
    
});