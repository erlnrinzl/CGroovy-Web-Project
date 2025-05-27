$(function () { 
    let currentIndex = 0;
    const sliderImages = $('.hero .slider-container .slider-item')
    const totalImages = sliderImages.length
    // $('#next-btn').on('click', () => { 
    //     currentIndex = (currentIndex + 1) % totalImages
    //     showImage(currentIndex)
    // })
    // $('#prev-btn').on('click', () => { 
    //     currentIndex = (currentIndex - 1) % totalImages
    //     showImage(currentIndex)
    // })
    
    showImage(currentIndex)
    
    function showImage(index) {
        sliderImages.hide()
        sliderImages.eq(index).fadeIn(500)
        $('.hero .slider-dots .dot').removeClass('active')
        $('.hero .slider-dots .dot').eq(index).addClass('active')
    }

    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalImages
        showImage(currentIndex)
    }, 3000);

    let currentSongsGroup = 0;
})