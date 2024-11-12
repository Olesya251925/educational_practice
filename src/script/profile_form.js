function generateTrackingForms() {
    const trackingFormsContainer = document.querySelector('.tracking-forms');

    // Создаем контейнер для форм
    const formContainer = document.createElement('div');
    formContainer.classList.add('form-container');

    // Форма для состояния волос
    const hairForm = document.createElement('form');
    hairForm.id = 'hairForm';
    hairForm.onsubmit = (event) => saveHairData(event);

    // Заголовок формы
    const hairHeading = document.createElement('h3');
    hairHeading.textContent = 'Состояние волос';
    hairForm.appendChild(hairHeading);

    // Состояние волос
    const hairConditionLabel = document.createElement('label');
    hairConditionLabel.setAttribute('for', 'hairCondition');
    hairConditionLabel.textContent = 'Выберите состояние волос:';
    hairConditionLabel.classList.add('form-label');
    hairForm.appendChild(hairConditionLabel);

    const hairConditionSelect = document.createElement('select');
    hairConditionSelect.id = 'hairCondition';
    hairConditionSelect.name = 'hairCondition';
    hairConditionSelect.required = true;
    hairConditionSelect.classList.add('form-select');

    // Пустое значение по умолчанию
    const defaultOptionCondition = document.createElement('option');
    defaultOptionCondition.textContent = 'Состояние';
    defaultOptionCondition.disabled = true;
    defaultOptionCondition.selected = true;
    hairConditionSelect.appendChild(defaultOptionCondition);

    const hairConditions = ['Здоровые', 'Сухие', 'Поврежденные', 'Тонкие', 'Жирные'];
    hairConditions.forEach(condition => {
        const option = document.createElement('option');
        option.value = condition;
        option.textContent = condition;
        hairConditionSelect.appendChild(option);
    });
    hairForm.appendChild(hairConditionSelect);

    // Тип волос
    const hairTypeLabel = document.createElement('label');
    hairTypeLabel.setAttribute('for', 'hairType');
    hairTypeLabel.textContent = 'Тип волос:';
    hairTypeLabel.classList.add('form-label');
    hairForm.appendChild(hairTypeLabel);

    const hairTypeSelect = document.createElement('select');
    hairTypeSelect.id = 'hairType';
    hairTypeSelect.name = 'hairType';
    hairTypeSelect.required = true;
    hairTypeSelect.classList.add('form-select');

    // Пустое значение по умолчанию
    const defaultOptionType = document.createElement('option');
    defaultOptionType.textContent = 'Тип';
    defaultOptionType.disabled = true;
    defaultOptionType.selected = true;
    hairTypeSelect.appendChild(defaultOptionType);

    const hairTypes = ['Прямые', 'Волнистые', 'Кудрявые', 'Поврежденные'];
    hairTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        hairTypeSelect.appendChild(option);
    });
    hairForm.appendChild(hairTypeSelect);

    // Пористость волос
    const hairPorosityLabel = document.createElement('label');
    hairPorosityLabel.setAttribute('for', 'hairPorosity');
    hairPorosityLabel.textContent = 'Пористость волос:';
    hairPorosityLabel.classList.add('form-label');
    hairForm.appendChild(hairPorosityLabel);

    const hairPorositySelect = document.createElement('select');
    hairPorositySelect.id = 'hairPorosity';
    hairPorositySelect.name = 'hairPorosity';
    hairPorositySelect.required = true;
    hairPorositySelect.classList.add('form-select');

    // Пустое значение по умолчанию
    const defaultOptionPorosity = document.createElement('option');
    defaultOptionPorosity.textContent = 'Пористость';
    defaultOptionPorosity.disabled = true;
    defaultOptionPorosity.selected = true;
    hairPorositySelect.appendChild(defaultOptionPorosity);

    const porosityLevels = ['Низкая', 'Средняя', 'Высокая'];
    porosityLevels.forEach(level => {
        const option = document.createElement('option');
        option.value = level;
        option.textContent = level;
        hairPorositySelect.appendChild(option);
    });
    hairForm.appendChild(hairPorositySelect);

    // Состояние кожи головы
    const scalpConditionLabel = document.createElement('label');
    scalpConditionLabel.setAttribute('for', 'scalpCondition');
    scalpConditionLabel.textContent = 'Термозащита:';
    scalpConditionLabel.classList.add('form-label');
    hairForm.appendChild(scalpConditionLabel);

    const scalpConditionSelect = document.createElement('select');
    scalpConditionSelect.id = 'scalpCondition';
    scalpConditionSelect.name = 'scalpCondition';
    scalpConditionSelect.required = true;
    scalpConditionSelect.classList.add('form-select');

    // Пустое значение по умолчанию
    const defaultOptionScalp = document.createElement('option');
    defaultOptionScalp.textContent = 'Вы используете термозащиту?';
    defaultOptionScalp.disabled = true;
    defaultOptionScalp.selected = true;
    scalpConditionSelect.appendChild(defaultOptionScalp);

    const scalpConditions = ['Да', 'Нет'];
    scalpConditions.forEach(condition => {
        const option = document.createElement('option');
        option.value = condition;
        option.textContent = condition;
        scalpConditionSelect.appendChild(option);
    });
    hairForm.appendChild(scalpConditionSelect);

    // Добавление дополнительной информации
    const moreTrackingContainer = document.createElement('div');
    moreTrackingContainer.classList.add('more-tracking-options');

    // Частота мытья волос
    const hairWashFrequencyLabel = document.createElement('label');
    hairWashFrequencyLabel.setAttribute('for', 'hairWashFrequency');
    hairWashFrequencyLabel.textContent = 'Частота мытья волос:';
    hairWashFrequencyLabel.classList.add('form-label');
    moreTrackingContainer.appendChild(hairWashFrequencyLabel);

    const hairWashFrequencySelect = document.createElement('select');
    hairWashFrequencySelect.id = 'hairWashFrequency';
    hairWashFrequencySelect.name = 'hairWashFrequency';
    hairWashFrequencySelect.required = true;
    hairWashFrequencySelect.classList.add('form-select');

    // Пустое значение по умолчанию
    const defaultOptionFrequency = document.createElement('option');
    defaultOptionFrequency.textContent = 'Насколько часто вы моете голову?';
    defaultOptionFrequency.disabled = true;
    defaultOptionFrequency.selected = true;
    hairWashFrequencySelect.appendChild(defaultOptionFrequency);

    const washFrequencies = ['Ежедневно', '2-3 раза в неделю', 'Раз в неделю', 'Реже'];
    washFrequencies.forEach(frequency => {
        const option = document.createElement('option');
        option.value = frequency;
        option.textContent = frequency;
        hairWashFrequencySelect.appendChild(option);
    });
    moreTrackingContainer.appendChild(hairWashFrequencySelect);

    // Добавление контейнера дополнительных опций
    hairForm.appendChild(moreTrackingContainer);

    // Добавление поля для загрузки фотографии
    const hairPhotoLabel = document.createElement('label');
    hairPhotoLabel.setAttribute('for', 'hairPhoto');
    hairPhotoLabel.textContent = 'Загрузите фото ваших волос:';
    hairPhotoLabel.classList.add('form-label');
    hairForm.appendChild(hairPhotoLabel);

    const hairPhotoInput = document.createElement('input');
    hairPhotoInput.id = 'hairPhoto';
    hairPhotoInput.name = 'hairPhoto';
    hairPhotoInput.type = 'file';
    hairPhotoInput.accept = 'image/*';
    hairPhotoInput.classList.add('form-input');
    hairForm.appendChild(hairPhotoInput);

    // Кнопка для формы волос
    const hairButton = document.createElement('button');
    hairButton.type = 'submit';
    hairButton.textContent = 'Сохранить';
    hairButton.classList.add('form-button');
    hairForm.appendChild(hairButton);

    // История состояния волос
    const hairHistory = document.createElement('div');
    hairHistory.id = 'hairHistory';
    const hairHistoryHeading = document.createElement('h4');
    hairHistoryHeading.textContent = 'История состояния волос:';
    hairHistory.appendChild(hairHistoryHeading);
    hairForm.appendChild(hairHistory);


    // Куда добавить форму в DOM
    document.body.appendChild(hairForm);


    // Форма для состояния кожи
    const skinForm = document.createElement('form');
    skinForm.id = 'skinForm';
    skinForm.onsubmit = (event) => saveSkinData(event);

    const skinHeading = document.createElement('h3');
    skinHeading.textContent = 'Состояние кожи';
    skinForm.appendChild(skinHeading);

    // Состояние кожи
    const skinConditionLabel = document.createElement('label');
    skinConditionLabel.setAttribute('for', 'skinCondition');
    skinConditionLabel.textContent = 'Выберите состояние кожи:';
    skinConditionLabel.classList.add('form-label');
    skinForm.appendChild(skinConditionLabel);

    const skinConditionSelect = document.createElement('select');
    skinConditionSelect.id = 'skinCondition';
    skinConditionSelect.name = 'skinCondition';
    skinConditionSelect.required = true;
    skinConditionSelect.classList.add('form-select');
    const skinConditions = ['Сухая', 'Жирная', 'Нормальная', 'Чувствительная'];
    const defaultSkinOption = document.createElement('option');
    defaultSkinOption.textContent = 'Состояние';
    defaultSkinOption.disabled = true;
    defaultSkinOption.selected = true;
    skinConditionSelect.appendChild(defaultSkinOption);

    skinConditions.forEach(condition => {
        const option = document.createElement('option');
        option.value = condition;
        option.textContent = condition;
        skinConditionSelect.appendChild(option);
    });
    skinForm.appendChild(skinConditionSelect);

    // Уровень увлажненности
    const hydrationLabel = document.createElement('label');
    hydrationLabel.setAttribute('for', 'hydrationLevel');
    hydrationLabel.textContent = 'Выберите уровень увлажненности кожи:';
    hydrationLabel.classList.add('form-label');
    skinForm.appendChild(hydrationLabel);

    const hydrationSelect = document.createElement('select');
    hydrationSelect.id = 'hydrationLevel';
    hydrationSelect.name = 'hydrationLevel';
    hydrationSelect.required = true;
    hydrationSelect.classList.add('form-select');
    const hydrationLevels = ['Влажная', 'Нормальная', 'Сухая', 'Очень сухая'];
    const defaultHydrationOption = document.createElement('option');
    defaultHydrationOption.textContent = 'Увлажненность';
    defaultHydrationOption.disabled = true;
    defaultHydrationOption.selected = true;
    hydrationSelect.appendChild(defaultHydrationOption);

    hydrationLevels.forEach(level => {
        const option = document.createElement('option');
        option.value = level;
        option.textContent = level;
        hydrationSelect.appendChild(option);
    });
    skinForm.appendChild(hydrationSelect);

    // Наличие высыпаний
    const breakoutsLabel = document.createElement('label');
    breakoutsLabel.setAttribute('for', 'breakouts');
    breakoutsLabel.textContent = 'Высыпания на коже:';
    breakoutsLabel.classList.add('form-label');
    skinForm.appendChild(breakoutsLabel);

    const breakoutsSelect = document.createElement('select');
    breakoutsSelect.id = 'breakouts';
    breakoutsSelect.name = 'breakouts';
    breakoutsSelect.required = true;
    breakoutsSelect.classList.add('form-select');
    const breakoutOptions = ['Нет', 'Да'];
    const defaultBreakoutsOption = document.createElement('option');
    defaultBreakoutsOption.textContent = 'Имеются ли у вас высыпания?';
    defaultBreakoutsOption.disabled = true;
    defaultBreakoutsOption.selected = true;
    breakoutsSelect.appendChild(defaultBreakoutsOption);

    breakoutOptions.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        breakoutsSelect.appendChild(optionElement);
    });
    skinForm.appendChild(breakoutsSelect);

    // Макияж
    const makeupLabel = document.createElement('label');
    makeupLabel.setAttribute('for', 'makeup');
    makeupLabel.textContent = 'Носите ли вы макияж ежедневно?';
    makeupLabel.classList.add('form-label');
    skinForm.appendChild(makeupLabel);

    const makeupSelect = document.createElement('select');
    makeupSelect.id = 'makeup';
    makeupSelect.name = 'makeup';
    makeupSelect.required = true;
    makeupSelect.classList.add('form-select');
    const makeupOptions = ['Да', 'Нет'];
    const defaultMakeupOption = document.createElement('option');
    defaultMakeupOption.textContent = 'Макияж';
    defaultMakeupOption.disabled = true;
    defaultMakeupOption.selected = true;
    makeupSelect.appendChild(defaultMakeupOption);

    makeupOptions.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        makeupSelect.appendChild(optionElement);
    });
    skinForm.appendChild(makeupSelect);

    // Использование солнцезащитных средств
    const sunscreenLabel = document.createElement('label');
    sunscreenLabel.setAttribute('for', 'sunscreen');
    sunscreenLabel.textContent = 'Используете ли вы солнцезащитные средства?';
    sunscreenLabel.classList.add('form-label');
    skinForm.appendChild(sunscreenLabel);

    const sunscreenSelect = document.createElement('select');
    sunscreenSelect.id = 'sunscreen';
    sunscreenSelect.name = 'sunscreen';
    sunscreenSelect.required = true;
    sunscreenSelect.classList.add('form-select');
    const sunscreenOptions = ['Да', 'Нет', 'Только летом'];
    const defaultSunscreenOption = document.createElement('option');
    defaultSunscreenOption.textContent = 'Пользуетесь?';
    defaultSunscreenOption.disabled = true;
    defaultSunscreenOption.selected = true;
    sunscreenSelect.appendChild(defaultSunscreenOption);

    sunscreenOptions.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        sunscreenSelect.appendChild(optionElement);
    });
    skinForm.appendChild(sunscreenSelect);

    // Добавление поля для загрузки фотографии
    const skinPhotoLabel = document.createElement('label');
    skinPhotoLabel.setAttribute('for', 'skinPhoto');
    skinPhotoLabel.textContent = 'Загрузите фото вашей кожи:';
    skinPhotoLabel.classList.add('form-label');
    skinForm.appendChild(skinPhotoLabel);

    const skinPhotoInput = document.createElement('input');
    skinPhotoInput.id = 'skinPhoto';
    skinPhotoInput.name = 'skinPhoto';
    skinPhotoInput.type = 'file';
    skinPhotoInput.accept = 'image/*';
    skinPhotoInput.classList.add('form-input');
    skinForm.appendChild(skinPhotoInput);


    // Кнопка для формы кожи
    const skinButton = document.createElement('button');
    skinButton.type = 'submit';
    skinButton.textContent = 'Сохранить';
    skinButton.classList.add('form-button');
    skinForm.appendChild(skinButton);

    const skinHistory = document.createElement('div');
    skinHistory.id = 'skinHistory';
    const skinHistoryHeading = document.createElement('h4');
    skinHistoryHeading.textContent = 'История состояния кожи:';
    skinHistory.appendChild(skinHistoryHeading);
    skinForm.appendChild(skinHistory);

    // Добавляем формы в контейнер
    formContainer.appendChild(hairForm);
    formContainer.appendChild(skinForm);

    // Добавляем контейнер с формами в основной контейнер
    trackingFormsContainer.appendChild(formContainer);
}

function saveHairData(event) {
    event.preventDefault();
    console.log('Данные о волосах сохранены');
}

function saveSkinData(event) {
    event.preventDefault();
    console.log('Данные о коже сохранены');
}

document.addEventListener('DOMContentLoaded', generateTrackingForms);
