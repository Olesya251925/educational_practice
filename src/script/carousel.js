document.addEventListener('DOMContentLoaded', function () {
    const carouselImages = document.querySelector('.carousel-images');
    const images = document.querySelectorAll('.carousel-images img');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const photoModal = document.createElement('div');
    const photoModalImg = document.createElement('img');
    const closePhotoModalButton = document.createElement('button');

    let currentIndex = 0;

    function updateCarousel() {
        const offset = -currentIndex * (images[0].clientWidth + 11);
        carouselImages.style.transform = `translateX(${offset}px)`;

        prevButton.style.display = currentIndex > 0 ? 'block' : 'none';
        nextButton.style.display = currentIndex < images.length - 5 ? 'block' : 'none';
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

    function openPhotoModal(src) {
        photoModal.style.display = 'flex';
        photoModalImg.src = src;
    }

    function closePhotoModal() {
        photoModal.style.display = 'none';
    }

    photoModal.classList.add('photo-modal');
    photoModalImg.classList.add('photo-modal-img');
    closePhotoModalButton.classList.add('close-photo-modal');
    closePhotoModalButton.innerHTML = '&times;';

    photoModal.appendChild(photoModalImg);
    photoModal.appendChild(closePhotoModalButton);
    document.body.appendChild(photoModal);

    images.forEach(image => {
        image.addEventListener('click', function () {
            openPhotoModal(image.src);
        });
    });

    closePhotoModalButton.addEventListener('click', closePhotoModal);

    photoModal.addEventListener('click', function (event) {
        if (event.target !== photoModalImg && event.target !== closePhotoModalButton) {
            closePhotoModal();
        }
    });

    nextButton.addEventListener('click', goToNextImage);
    prevButton.addEventListener('click', goToPrevImage);
    updateCarousel();
});
