function displayPhotoErrorMessage() {
    const hairPhotoInput = document.getElementById('hairPhoto');
    const errorMessage = document.createElement('p');
    errorMessage.textContent = "Пожалуйста, загрузите фотографию!";
    errorMessage.style.color = 'red';
    errorMessage.classList.add('error-message');

    if (hairPhotoInput) {
        hairPhotoInput.insertAdjacentElement('afterend', errorMessage);
    } else {
        console.error('Форма не содержит поля для фотографии!');
    }
}

// Функция для обработки загрузки фотографии волос
function handleHairPhotoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('hairPhotoDataUrl').value = e.target.result;

            // Отображаем превью загруженной фотографии
            const previewImg = document.getElementById('hairPhotoPreview');
            if (previewImg) {
                previewImg.src = e.target.result;
                previewImg.style.display = 'block';
            }
        };
        reader.readAsDataURL(file);
    }
}

// Функция для сохранения данных о волосах
function saveHairData(event) {
    event.preventDefault();

    const userEmailElement = document.getElementById('profileEmail');
    const hairConditionElement = document.getElementById('hairCondition');
    const hairTypeElement = document.getElementById('hairType');
    const hairPorosityElement = document.getElementById('hairPorosity');
    const scalpConditionElement = document.getElementById('scalpCondition');
    const hairWashFrequencyElement = document.getElementById('hairWashFrequency');
    const splitEndsElement = document.getElementById('splitEnds');
    const coloredHairElement = document.getElementById('coloredHair');
    const hairLossElement = document.getElementById('hairLoss');
    const hairPhotoDataUrl = document.getElementById('hairPhotoDataUrl').value;

    resetErrors();

    let hasError = false;

    if (!hairPhotoDataUrl) {
        showError(document.getElementById('hairPhoto'));
        displayPhotoErrorMessage();
        hasError = true;
    }

    if (!hairConditionElement.value) {
        showError(hairConditionElement);
        hasError = true;
    }

    if (!hairTypeElement.value) {
        showError(hairTypeElement);
        hasError = true;
    }

    if (!hairPorosityElement.value) {
        showError(hairPorosityElement);
        hasError = true;
    }

    if (!hairWashFrequencyElement.value) {
        showError(hairWashFrequencyElement);
        hasError = true;
    }

    if (!scalpConditionElement || !scalpConditionElement.value) {
        showError(scalpConditionElement);
        hasError = true;
    }

    if (!splitEndsElement || !splitEndsElement.value) {
        showError(splitEndsElement);
        hasError = true;
    }

    if (!coloredHairElement || !coloredHairElement.value) {
        showError(coloredHairElement);
        hasError = true;
    }

    if (!hairLossElement || !hairLossElement.value) {
        showError(hairLossElement);
        hasError = true;
    }

    if (hasError) {
        return;
    }

    const hairData = {
        email: userEmailElement ? userEmailElement.textContent : null,
        hairCondition: hairConditionElement.value,
        hairType: hairTypeElement.value,
        hairPorosity: hairPorosityElement.value,
        usesHeatProtection: scalpConditionElement.value,
        hairWashFrequency: hairWashFrequencyElement.value,
        splitEnds: splitEndsElement.value,
        coloredHair: coloredHairElement.value,
        hairLoss: hairLossElement.value,
        hairPhoto: hairPhotoDataUrl
    };

    fetch('http://localhost:3000/api/save-hair-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hairData)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Полученные данные от сервера:', data);
            alert('Данные успешно сохранены!');
            clearForm();
        })
        .catch(error => {
            console.error('Ошибка при отправке данных:', error);
            alert('Ошибка при сохранении данных.');
        });

    removePhotoPreview('hairPhotoPreview');
}


// Функция для загрузки данных о волосах
function loadHairData() {
    const userEmailElement = document.getElementById('profileEmail');
    const email = userEmailElement ? userEmailElement.textContent : null;

    if (!email) {
        console.error('Email пользователя не найден');
        return;
    }

    fetch(`http://localhost:3000/api/get-hair-profile/${email}`)
        .then(response => response.json())
        .then(data => {
            if (data.hairCondition) document.getElementById('hairCondition').value = data.hairCondition;
            if (data.hairType) document.getElementById('hairType').value = data.hairType;
            if (data.hairPorosity) document.getElementById('hairPorosity').value = data.hairPorosity;
            if (data.usesHeatProtection) document.getElementById('scalpCondition').value = data.usesHeatProtection;
            if (data.hairWashFrequency) document.getElementById('hairWashFrequency').value = data.hairWashFrequency;

            if (data.hairPhoto) {
                const previewImg = document.getElementById('hairPhotoPreview');
                if (previewImg) {
                    previewImg.src = data.hairPhoto;
                    previewImg.style.display = 'block';
                }
                document.getElementById('hairPhotoDataUrl').value = data.hairPhoto;
            }
        })
        .catch(error => {
            console.error('Ошибка при загрузке данных о волосах:', error);
        });
}

// Вызываем функцию загрузки данных при инициализации страницы
window.onload = function () {
    initGoogleAuth();
    handleAuthResult();
    loadHairData(); // Добавляем вызов функции загрузки данных о волосах
};

function showError(inputElement) {
    inputElement.style.borderColor = 'red';
}

function resetErrors() {
    const inputElements = document.querySelectorAll('input, select');
    inputElements.forEach(el => {
        el.style.borderColor = '';
    });

    const existingErrorMessages = document.querySelectorAll('.error-message');
    existingErrorMessages.forEach(msg => msg.remove());
}

function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(message => message.remove());
    const inputFields = document.querySelectorAll('.form-input');
    inputFields.forEach(field => field.style.borderColor = '');
}

function addPhotoErrorText() {
    const skinForm = document.querySelector('#skinForm');
    if (!skinForm) return;

    const existingErrorText = skinForm.querySelector('.photo-error-message');
    if (existingErrorText) return;

    const photoErrorText = document.createElement('p');
    photoErrorText.textContent = 'Пожалуйста, загрузите фотографию!';
    photoErrorText.style.color = 'red';
    photoErrorText.classList.add('photo-error-message');

    const saveButton = skinForm.querySelector('.form-button');
    if (saveButton) {
        skinForm.insertBefore(photoErrorText, saveButton);
    }
}


// Функция для обработки загрузки фотографии лица
function handleFacePhotoUpload(event) {
    const file = event.target.files[0];  // Получаем загруженный файл
    if (file) {
        const reader = new FileReader();  // Создаем новый объект FileReader
        reader.onload = function (e) {
            document.getElementById('facePhotoDataUrl').value = e.target.result;  // Сохраняем ссылку на изображение в hidden поле

            // Отображаем превью загруженной фотографии
            const previewImg = document.getElementById('facePhotoPreview');
            if (previewImg) {
                previewImg.src = e.target.result;  // Присваиваем ссылку на изображение
                previewImg.style.display = 'block';  // Показываем изображение
            }
        };
        reader.readAsDataURL(file);  // Читаем файл как Data URL
    }
}

function saveSkinData(event) {
    event.preventDefault(); // Останавливаем стандартное поведение формы

    const userEmailElement = document.getElementById('profileEmail');
    const email = userEmailElement ? userEmailElement.textContent.trim() : null; // Извлекаем email

    if (!email) {
        alert('Email не найден!');
        return;
    }

    const skinConditionElement = document.getElementById('skinCondition');
    const skinHydrationElement = document.getElementById('skinHydration');
    const hasRashesElement = document.getElementById('hasRashes');
    const wearsMakeupElement = document.getElementById('wearsMakeup');
    const usesSunscreenElement = document.getElementById('usesSunscreen');
    const facePhotoDataUrl = document.getElementById('facePhotoDataUrl').value;

    let hasErrors = false;

    if (!skinConditionElement.value) {
        showError(skinConditionElement);
        hasErrors = true;
    }
    if (!skinHydrationElement.value) {
        showError(skinHydrationElement);
        hasErrors = true;
    }
    if (!hasRashesElement.value) {
        showError(hasRashesElement);
        hasErrors = true;
    }
    if (!wearsMakeupElement.value) {
        showError(wearsMakeupElement);
        hasErrors = true;
    }
    if (!usesSunscreenElement.value) {
        showError(usesSunscreenElement);
        hasErrors = true;
    }

    if (!facePhotoDataUrl) {
        showError(document.getElementById('facePhoto'));
        hasErrors = true;
    }

    if (hasErrors) return;

    const skinData = {
        email: email,
        skinCondition: skinConditionElement.value,
        skinHydration: skinHydrationElement.value,
        hasRashes: hasRashesElement.value,
        wearsMakeup: wearsMakeupElement.value,
        usesSunscreen: usesSunscreenElement.value,
        facePhoto: facePhotoDataUrl
    };

    fetch('http://localhost:3000/api/save-skin-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skinData)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Полученные данные от сервера:', data);
            alert('Данные успешно сохранены!');
            clearForm();  // Очищаем форму
        })
        .catch(error => {
            console.error('Ошибка при отправке данных:', error);
            alert('Ошибка при сохранении данных.');
        });

    removePhotoPreview('facePhotoPreview');
}


// Функция для очистки всех полей формы
function clearForm() {
    const formElements = document.querySelectorAll('input, select');
    formElements.forEach(el => {
        if (el.type === 'file') {
            el.value = '';  // Для поля типа file очищаем значение
        } else {
            el.value = '';  // Очищаем обычные поля
        }
        el.style.borderColor = '';  // Сбрасываем стили ошибки
    });

    // Очистить все сообщения об ошибках
    resetErrors();

    // Очистить превью изображения
    const previewImages = document.querySelectorAll('.photo-preview');  // Подберите правильный класс или ID для изображений
    previewImages.forEach(img => {
        img.src = '';  // Убираем ссылку на изображение
        img.style.display = 'none';  // Прячем изображение
    });

    // Очистить значения в hidden полях для изображения
    const photoDataUrls = document.querySelectorAll('input[type="hidden"]');
    photoDataUrls.forEach(input => {
        input.value = '';  // Очищаем значение поля с URL изображения
    });
}

function removePhotoPreview(photoPreviewId) {
    const photoPreview = document.getElementById(photoPreviewId);
    if (photoPreview) {
        photoPreview.style.display = 'none'; // Скрывает изображение
    }
}


document.addEventListener('DOMContentLoaded', generateTrackingForms);
