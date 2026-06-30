document.addEventListener("DOMContentLoaded", function() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slides img');
    const monogram = document.querySelector('.header-logo');

// کمپیوٹر کے لیے (Mouse)
monogram.addEventListener('mouseenter', startPulse);

// موبائل کے لیے (Touch)
monogram.addEventListener('touchstart', startPulse, {passive: true});

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    if (slides.length > 0) {
        setInterval(nextSlide, 3000);
    }
});
