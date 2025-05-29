$(function () { 
    let songItems = [];
    let bestSellerItems = $('.best-seller-container .best-seller-item');

    let currentPage = 0;
    let visibleCount = 0;
    
    const fetchSongsData = async () => {
        const response = await fetch('./songs.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        songItems = data;
        renderReccommendedSongs(songItems);
        renderBestSellerSongs(songItems.filter(song => song.isBestSeller));
    }
    
    const renderReccommendedSongs = (songItems) => {
        const container = $('.songs-container');
        container.empty();
        songItems.forEach(song => {
            const item = $(`
                <div class="song-item">
                    <img
                        class="album-cover"
                        src="${song.image}"
                        alt="${song.title}"
                        alt="aespa"
                    />
                    <div class="song-description">
                        <p class="title">${song.title}</p>
                        <p>${song.singer}</p>
                    </div>
                    <div class="song-action">
                        <a href="./song-detail.html?id=${song.id}" class="play-button">
                            <img src="./assets/icons/play.svg" alt="menu" />
                        </a>
                    </div>
                </div>
            `);
            container.append(item);
        });
    }

    const renderBestSellerSongs = (songItems) => {
        const container = $('.best-seller-container');
        container.empty();
        songItems.forEach(song => {
            const item = $(`
                <div class="best-seller-item">
                    <img src="${song.image}" alt="${song.title}" />
                    <h3>${song.title}</h3>
                    <p>${song.singer}</p>
                    <a href="./song-detail.html?id=${song.id}">View Details</a>
                </div>
            `);
            container.append(item);
        });

        bestSellerItems = container.find('.best-seller-item');
        updateSliderStyles(bestSellerItems);

    }


    function getVisibleCount() {
        if (window.innerWidth < 400) return 1;
        if (window.innerWidth < 600) return 2;
        if (window.innerWidth < 900) return 3;
        if (window.innerWidth < 1200) return 4;
        currentPage = 0;
        return 5;
    }

    function updateSliderStyles(bestSellerItems) {
        visibleCount = getVisibleCount();
        const sliderDots = $('.best-seller .slider-dots');
        sliderDots.empty();
        const totalPages = Math.ceil(bestSellerItems.length / visibleCount);
        for (let i = 0; i < totalPages; i++) {
            sliderDots.append('<div class="dot"></div>');
        }
        $('.best-seller .slider-dots .dot').eq(currentPage).addClass('active');
        
        bestSellerItems.css({
            'flex': '0 0 ' + (100 / visibleCount) + '%',
        });

        updateSlider();

        $('#next-btn').on('click', function () {
            const totalPages = Math.ceil(bestSellerItems.length / visibleCount);
            if (currentPage < totalPages - 1) {
                currentPage++;
            }
            if (currentPage > totalPages - 1) currentPage = totalPages - 1;
            updateSlider();
        });
        
        $('#prev-btn').on('click', function () {
            if (currentPage > 0) {
                currentPage--;
            }
            if (currentPage < 0) currentPage = 0;
            updateSlider();
        });
    }

    function updateSlider() {
        const container = $('.best-seller-container');
        const itemWidth = bestSellerItems.outerWidth(true);
        
        const totalPages = Math.ceil(bestSellerItems.length / visibleCount);
        if (currentPage > totalPages - 1) currentPage = totalPages - 1;
        if (currentPage < 0) currentPage = 0;
        container.animate({
            scrollLeft: currentPage * visibleCount * itemWidth
        }, 300);
        $('.best-seller .slider-dots .dot').removeClass('active')
        $('.best-seller .slider-dots .dot').eq(currentPage).addClass('active')
    }
    
    

    // Hero Slider
    let currentIndex = 0;
    const sliderImages = $('.hero .slider-container .slider-item')
    const totalImages = sliderImages.length
    
    function showImage(index) {
        sliderImages.hide()
        sliderImages.eq(index).fadeIn(1000)
        $('.hero .slider-dots .dot').removeClass('active')
        $('.hero .slider-dots .dot').eq(index).addClass('active')
    }
    

    /* start of the process */
    showImage(currentIndex)
    fetchSongsData().catch(error => console.error('Error fetching songs:', error));
    // updateSliderStyles();

    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalImages
        showImage(currentIndex)
    }, 3000);

    $(window).on('resize', function () {
        visibleCount = getVisibleCount();
        
        updateSliderStyles(bestSellerItems, visibleCount);
    });
    
});