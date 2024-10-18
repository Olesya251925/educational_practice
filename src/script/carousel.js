document.addEventListener('DOMContentLoaded', function () {
    const carouselImages = document.querySelector('.carousel-images');
    const images = document.querySelectorAll('.carousel-images img');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    let currentIndex = 0;

    function updateCarousel() {
        const offset = -currentIndex * (images[0].clientWidth + 10);
        carouselImages.style.transform = `translateX(${offset}px)`;

        prevButton.style.display = currentIndex > 0 ? 'block' : 'none';
        nextButton.style.display = currentIndex < images.length - 4 ? 'block' : 'none';
    }

    function goToNextImage() {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    }

    function goToPrevImage() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }

    nextButton.addEventListener('click', goToNextImage);
    prevButton.addEventListener('click', goToPrevImage);

    updateCarousel();
});
