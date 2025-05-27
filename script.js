$(function () { 
    let currentIndex = 0;
    const sliderImages = $('.hero .slider-container .slider-item')
    const totalImages = sliderImages.length
    
    function showImage(index) {
        sliderImages.hide()
        sliderImages.eq(index).fadeIn(1000)
        $('.hero .slider-dots .dot').removeClass('active')
        $('.hero .slider-dots .dot').eq(index).addClass('active')
    }

    const container = $('.best-seller-container');
    const songItems = container.find('.best-seller-item');
    let visibleCount = getVisibleCount();
    let currentPage = 0;
    
    function getVisibleCount() {
        if (window.innerWidth < 600) return 3;
        if (window.innerWidth < 900) return 4;
        if (window.innerWidth < 1200) return 5;
        return 6;
    }

    function updateSliderStyles() {
        visibleCount = getVisibleCount();
        const sliderDots = $('.best-seller .slider-dots');
        sliderDots.empty();
        const totalPages = Math.ceil(songItems.length / visibleCount);
        for (let i = 0; i < totalPages; i++) {
            sliderDots.append('<div class="dot"></div>');
        }
        $('.best-seller .slider-dots .dot').eq(currentPage).addClass('active');
        
        songItems.css({
            'flex': '0 0 ' + (100 / visibleCount) + '%',
            'max-width': (100 / visibleCount) + '%'
        });

        updateSlider();
    }

    function updateSlider() {
        const itemWidth = songItems.outerWidth(true);
        const totalPages = Math.ceil(songItems.length / visibleCount);
        if (currentPage > totalPages - 1) currentPage = totalPages - 1;
        if (currentPage < 0) currentPage = 0;
        container.animate({
            scrollLeft: currentPage * visibleCount * itemWidth
        }, 300);
        $('.best-seller .slider-dots .dot').removeClass('active')
        $('.best-seller .slider-dots .dot').eq(currentPage).addClass('active')
    }
    
    $('#next-btn').on('click', function () {
        const totalPages = Math.ceil(songItems.length / visibleCount);
        if (currentPage < totalPages - 1) {
            currentPage++;
            updateSlider();
        }
    });

    $('#prev-btn').on('click', function () {
        if (currentPage > 0) {
            currentPage--;
            updateSlider();
        }
    });



    /* start of the process */

    showImage(currentIndex)
    updateSliderStyles();

    // setInterval(() => {
    //     currentIndex = (currentIndex + 1) % totalImages
    //     showImage(currentIndex)
    // }, 3000);

    $(window).on('resize', function () {
        updateSliderStyles();
    });
    
});