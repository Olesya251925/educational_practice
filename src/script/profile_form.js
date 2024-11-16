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


// Функция для сохранения данных о волосах
function saveHairData(event) {
    event.preventDefault(); // Отменяем стандартное поведение формы (перезагрузку страницы)

    // Получаем элементы формы и проверяем их наличие
    const userEmailElement = document.getElementById('profileEmail'); // Извлекаем email из элемента с id="profileEmail"
    const hairConditionElement = document.getElementById('hairCondition');
    const hairTypeElement = document.getElementById('hairType');
    const hairPorosityElement = document.getElementById('hairPorosity');
    const scalpConditionElement = document.getElementById('scalpCondition');
    const hairWashFrequencyElement = document.getElementById('hairWashFrequency');
    const hairPhotoElement = document.getElementById('hairPhoto');

    // Извлекаем email из элемента, если он существует
    const email = userEmailElement ? userEmailElement.textContent : null;

    resetErrors();

    let hasError = false;

    if (!hairPhotoElement.files.length) {
        showError(hairPhotoElement);
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

    if (hasError) {
        return;
    }

    // Проверяем, существуют ли элементы и создаем объект с данными
    const hairData = {
        email: email, // Получаем email из профиля
        hairCondition: hairConditionElement ? hairConditionElement.value : null,
        hairType: hairTypeElement ? hairTypeElement.value : null,
        hairPorosity: hairPorosityElement ? hairPorosityElement.value : null,
        usesHeatProtection: scalpConditionElement ? scalpConditionElement.value : null,
        hairWashFrequency: hairWashFrequencyElement ? hairWashFrequencyElement.value : null,
        hairPhoto: hairPhotoElement && hairPhotoElement.files[0] ? hairPhotoElement.files[0].name : null
    };

    // Отправляем данные на сервер для сохранения
    fetch('http://localhost:3000/api/save-hair-profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(hairData), // Преобразуем объект в JSON
    })
        .then(response => {
            console.log('Ответ от сервера:', response); // Логируем ответ от сервера
            return response.json(); // Преобразуем в JSON, чтобы получить данные
        })
        .then(data => {
            console.log('Полученные данные от сервера:', data);
            alert('Данные успешно сохранены!');
            clearForm();
        })
        .catch(error => {
            console.error('Ошибка при отправке данных:', error);
            alert('Ошибка при сохранении данных.');
        });

}

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

function saveSkinData(event) {
    event.preventDefault(); // Останавливаем стандартное поведение формы

    // Получаем email из элемента, содержащего почту
    const userEmailElement = document.getElementById('profileEmail'); // Элемент, где хранится email
    const email = userEmailElement ? userEmailElement.textContent.trim() : null; // Извлекаем email

    if (!email) {
        alert('Email не найден!');
        return;
    }

    // Получаем данные из формы
    const skinConditionElement = document.getElementById('skinCondition');
    const skinHydrationElement = document.getElementById('skinHydration');
    const hasRashesElement = document.getElementById('hasRashes');
    const wearsMakeupElement = document.getElementById('wearsMakeup');
    const usesSunscreenElement = document.getElementById('usesSunscreen');
    const facePhotoElement = document.getElementById('facePhoto');

    // Собираем данные в объект
    const skinData = {
        email: email,
        skinCondition: skinConditionElement ? skinConditionElement.value : null,
        skinHydration: skinHydrationElement ? skinHydrationElement.value : null,
        hasRashes: hasRashesElement ? hasRashesElement.value : null,
        wearsMakeup: wearsMakeupElement ? wearsMakeupElement.value : null,
        usesSunscreen: usesSunscreenElement ? usesSunscreenElement.value : null,
        facePhoto: facePhotoElement && facePhotoElement.files[0] ? facePhotoElement.files[0].name : null
    };

    clearErrors();

    // Логируем итоговые данные
    console.log('Собранные данные:', skinData);

    let hasErrors = false;

    if (!skinData.skinCondition) {
        showError(skinConditionElement);
        hasErrors = true;
    }
    if (!skinData.skinHydration) {
        showError(skinHydrationElement);
        hasErrors = true;
    }
    if (!skinData.hasRashes) {
        showError(hasRashesElement);
        hasErrors = true;
    }
    if (!skinData.wearsMakeup) {
        showError(wearsMakeupElement);
        hasErrors = true;
    }
    if (!skinData.usesSunscreen) {
        showError(usesSunscreenElement);
        hasErrors = true;
    }

    if (!skinData.facePhoto) {
        addPhotoErrorText();
        hasErrors = true;
    }

    if (hasErrors) {
        return;
    }

    // Отправляем данные на сервер для сохранения
    fetch('http://localhost:3000/api/save-skin-profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(skinData), // Преобразуем объект в JSON
    })
        .then(response => response.json())
        .then(data => {
            console.log('Ответ от сервера:', data);
            // Выводим сообщение о том, что данные были успешно сохранены
            alert('Данные успешно сохранены!');
            clearForm();
        })
        .catch(error => {
            console.error('Ошибка при отправке данных:', error);
            alert('Ошибка при сохранении данных.');
        });
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
}



document.addEventListener('DOMContentLoaded', generateTrackingForms);
