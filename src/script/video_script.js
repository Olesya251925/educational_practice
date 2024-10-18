const video = document.getElementById('educational-video');
const secondVideo = document.getElementById('second-educational-video');
const thirdVideo = document.getElementById('third-educational-video');

window.addEventListener('load', () => {
    video.loop = true;
    secondVideo.loop = true;
    thirdVideo.loop = true;

    video.play().catch(error => console.error('Ошибка воспроизведения первого видео:', error));
    secondVideo.play().catch(error => console.error('Ошибка воспроизведения второго видео:', error));
    thirdVideo.play().catch(error => console.error('Ошибка воспроизведения третьего видео:', error));

    video.addEventListener('error', () => {
        console.error('Ошибка воспроизведения первого видео.');
    });
    secondVideo.addEventListener('error', () => {
        console.error('Ошибка воспроизведения второго видео.');
    });
    thirdVideo.addEventListener('error', () => {
        console.error('Ошибка воспроизведения третьего видео.');
    });

    video.addEventListener('ended', () => {
        video.currentTime = 0;
        video.play();
    });

    secondVideo.addEventListener('ended', () => {
        secondVideo.currentTime = 0;
        secondVideo.play();
    });

    thirdVideo.addEventListener('ended', () => {
        thirdVideo.currentTime = 0;
        thirdVideo.play();
    });
});
