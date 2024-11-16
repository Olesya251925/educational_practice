function generateTrackingForms() {
    const trackingFormsContainer = document.querySelector('.tracking-forms');

    // Контейнер для обеих форм
    const formContainer = document.createElement('div');
    formContainer.classList.add('form-container');
    formContainer.style.display = 'flex';
    formContainer.style.justifyContent = 'space-between';

    // Форма для состояния волос
    const hairForm = `
       <form id="hairForm" onsubmit="saveHairData(event)" style="width: 48%;">
    <h3>Состояние волос</h3>
    
    <label for="hairCondition" class="form-label">Выберите состояние волос:</label>
    <select id="hairCondition" name="hairCondition" required class="form-select">
        <option disabled selected></option>
        <option value="Здоровые">Здоровые</option>
        <option value="Сухие">Сухие</option>
        <option value="Поврежденные">Поврежденные</option>
        <option value="Тонкие">Тонкие</option>
        <option value="Жирные">Жирные</option>
    </select>

    <label for="hairType" class="form-label">Тип волос:</label>
    <select id="hairType" name="hairType" required class="form-select">
        <option disabled selected></option>
        <option value="Прямые">Прямые</option>
        <option value="Волнистые">Волнистые</option>
        <option value="Кудрявые">Кудрявые</option>
    </select>

    <label for="hairPorosity" class="form-label">Пористость волос:</label>
    <select id="hairPorosity" name="hairPorosity" required class="form-select">
        <option disabled selected></option>
        <option value="Низкая">Низкая</option>
        <option value="Средняя">Средняя</option>
        <option value="Высокая">Высокая</option>
    </select>

    <label for="scalpCondition" class="form-label">Вы используете термозащиту?</label>
    <select id="scalpCondition" name="scalpCondition" required class="form-select">
        <option disabled selected></option>
        <option value="Да">Да</option>
        <option value="Нет">Нет</option>
    </select>

    <div class="more-tracking-options">
        <label for="hairWashFrequency" class="form-label">Насколько часто вы моете голову?</label>
        <select id="hairWashFrequency" name="hairWashFrequency" required class="form-select">
            <option disabled selected></option>
            <option value="Ежедневно">Ежедневно</option>
            <option value="2-3 раза в неделю">2-3 раза в неделю</option>
            <option value="Раз в неделю">Раз в неделю</option>
            <option value="Реже">Реже</option>
        </select>
    </div>

     <label for="splitEnds" class="form-label">У вас сильно секутся кончики?</label>
    <select id="splitEnds" name="splitEnds" class="form-select">
        <option disabled selected></option>
        <option value="Да">Да</option>
        <option value="Нет">Нет</option>
    </select>

    <label for="coloredHair" class="form-label">У вас окрашенные волосы?</label>
    <select id="coloredHair" name="coloredHair" class="form-select">
        <option disabled selected></option>
        <option value="Да">Да</option>
        <option value="Нет">Нет</option>
    </select>

    <label for="hairLoss" class="form-label">Сильно ли у вас выпадают волосы?</label>
    <select id="hairLoss" name="hairLoss" class="form-select">
        <option disabled selected></option>
        <option value="Да">Да</option>
        <option value="Нет">Нет</option>
    </select>

    <label for="hairPhoto" class="form-label">Загрузите фото ваших волос:</label>
    <input id="hairPhoto" name="hairPhoto" type="file" accept="image/*" class="form-input" onchange="handleHairPhotoUpload(event)">
    <input type="hidden" id="hairPhotoDataUrl" name="hairPhotoDataUrl">
    <img id="hairPhotoPreview" style="display: none; max-width: 200px; margin-top: 10px;">

    <button type="submit" class="form-button">Сохранить</button>

    <div id="hairHistoryTitle" style="display: none;">
        <h4>История состояния волос:</h4>
        <ul id="hairHistoryList" style="margin: 0; padding: 0;"></ul> 
    </div>

    <button type="button" class="form-button history-button" onclick="toggleHistory()">История</button>
</form>
    `;

    // Форма для состояния кожи
    const skinForm = `
        <form id="skinForm" onsubmit="saveSkinData(event)" style="width: 48%;">
            <h3>Состояние кожи</h3>

            <label for="skinCondition" class="form-label">Выберите состояние кожи:</label>
            <select id="skinCondition" name="skinCondition" required class="form-select">
                <option disabled selected></option>
                <option value="Сухая">Сухая</option>
                <option value="Жирная">Жирная</option>
                <option value="Нормальная">Нормальная</option>
                <option value="Чувствительная">Чувствительная</option>
            </select>

            <label for="skinHydration" class="form-label">Выберите уровень увлажненности кожи:</label>
            <select id="skinHydration" name="skinHydration" required class="form-select">
                <option disabled selected></option>
                <option value="Влажная">Влажная</option>
                <option value="Нормальная">Нормальная</option>
                <option value="Сухая">Сухая</option>
                <option value="Очень сухая">Очень сухая</option>
            </select>

            <label for="hasRashes" class="form-label">Имеются ли высыпания?</label>
            <select id="hasRashes" name="hasRashes" required class="form-select">
                <option disabled selected></option>
                <option value="Да">Да</option>
                <option value="Нет">Нет</option>
            </select>

             <label for="wearsMakeup" class="form-label">Носите ли вы макияж ежедневно?</label>
        <select id="wearsMakeup" name="wearsMakeup" required class="form-select">
            <option disabled selected></option>
            <option value="Да">Да</option>
            <option value="Нет">Нет</option>
        </select>

         <label for="usesSunscreen" class="form-label">Имеются морщины?</label>
        <select id="usesSunscreen" name="usesSunscreen" required class="form-select">
            <option disabled selected></option>
            <option value="Да">Да</option>
            <option value="Нет">Нет</option>
            <option value="Только летом">Только летом</option>
        </select>

        <label for="facePhoto" class="form-label">Загрузите фото вашего лица:</label>
    <input id="facePhoto" name="facePhoto" type="file" accept="image/*" class="form-input" onchange="handleFacePhotoUpload(event)">
    <input type="hidden" id="facePhotoDataUrl" name="facePhotoDataUrl"> <!-- Скрытое поле для хранения Data URL -->
    <img id="facePhotoPreview" style="display: none; max-width: 200px; margin-top: 10px;"> <!-- Превью изображения -->

          <button type="submit" class="form-button">Сохранить</button>

    <!-- История состояния кожи перед кнопкой -->
    <div id="skinHistoryTitle" style="display: none;">
        <h4>История состояния кожи:</h4>
         <ul id="skinHistoryList"></ul>
    </div>

    <!-- Кнопка История -->
    <button type="button" class="form-button skin-historu-button" onclick="toggleSkinHistory()">История</button>
</form>
    `;

    // Добавление форм в контейнер
    formContainer.innerHTML = hairForm + skinForm;

    // Добавление контейнера в DOM
    trackingFormsContainer.appendChild(formContainer);
}


// Функция для показа форм
function showForm() {
    document.querySelector('.form-container').style.display = 'flex';
    document.querySelector('#hairForm').style.display = 'block';
    document.querySelector('#skinForm').style.display = 'block';
}


// Функция для отслеживания появления элемента
function observeProfileContainer() {
    const observer = new MutationObserver((mutationsList, observer) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const profileContainer = document.querySelector('#profileContainer');
                if (profileContainer) {
                    // Элемент найден, показываем форму
                    showForm();
                    // Останавливаем наблюдатель, так как элемент уже найден
                    observer.disconnect();
                    break;
                }
            }
        }
    });

    // Наблюдаем за изменениями в body (или любом другом родительском элементе)
    observer.observe(document.body, { childList: true, subtree: true });
}

// Функция для получения email из элемента на странице
function getEmailFromProfile() {
    const emailElement = document.getElementById('profileEmail');
    if (emailElement) {
        const email = emailElement.textContent.trim();
        return email;
    }
    return null;
}


async function toggleHistory() {
    const historyButton = document.querySelector('.history-button');
    const historyTitle = document.getElementById('hairHistoryTitle');
    const hairHistoryList = document.getElementById('hairHistoryList');

    // Получаем email из профиля
    const email = getEmailFromProfile();
    if (!email) {
        hairHistoryList.innerHTML = '<li>Не удалось получить email.</li>';
        return;
    }

    // Логируем email, для которого ищем записи
    console.log('Ищем записи для email:', email);

    // Переключение текста на кнопке и отображение/скрытие истории
    if (historyTitle.style.display === 'none') {
        historyTitle.style.display = 'block';
        historyButton.textContent = 'Закрыть';

        // Получаем данные из API и отображаем их
        try {
            const response = await fetch(`http://localhost:3000/api/hair-profile?email=${encodeURIComponent(email)}`);

            if (!response.ok) {
                throw new Error('Ошибка при получении данных с сервера');
            }

            const data = await response.json(); // разбираем JSON

            // Очищаем список перед добавлением новых данных
            hairHistoryList.innerHTML = '';

            // Если данные есть, добавляем их в список
            if (data.length > 0) {
                let currentDate = '';

                data.forEach(record => {
                    const recordDate = new Date(record.created_at).toLocaleDateString();

                    // Проверяем, если дата изменилась, добавляем новый заголовок для этой даты
                    if (recordDate !== currentDate) {
                        const dateHeader = document.createElement('h4');
                        dateHeader.textContent = `История за ${recordDate}`;
                        dateHeader.style.fontWeight = 'bold';
                        dateHeader.style.marginTop = '20px';
                        hairHistoryList.appendChild(dateHeader);
                        currentDate = recordDate;
                    }

                    const listItem = document.createElement('div');
                    listItem.style.border = '1px solid #ddd';
                    listItem.style.padding = '10px';
                    listItem.style.marginBottom = '10px';
                    listItem.style.borderRadius = '8px';
                    listItem.style.backgroundColor = '#f9f9f9';

                    // Оформление данных
                    listItem.innerHTML = `
    <p><strong>Тип волос:</strong> ${record.hair_type}</p>
    <p><strong>Пористость:</strong> ${record.hair_porosity}</p>
    <p><strong>Термозащита:</strong> ${record.uses_heat_protection}</p>
    <p><strong>Частота мытья:</strong> ${record.hair_wash_frequency}</p>
    <p><strong>Секущиеся кончики:</strong> ${record.split_ends}</p>
    <p><strong>Окрашенные волосы:</strong> ${record.colored_hair}</p>
    <p><strong>Выпадение волос:</strong> ${record.hair_loss}</p>
    <p><strong>Фото волос:</strong> <img src="${record.hair_photo}" alt="Фото волос" style="max-width: 200px; height: auto;" /></p>
`;

                    hairHistoryList.appendChild(listItem);

                });
            } else {
                hairHistoryList.innerHTML = '<li>История пуста.</li>';
            }
        } catch (error) {
            hairHistoryList.innerHTML = '<li>Ошибка при загрузке данных.</li>';
        }

    } else {
        historyTitle.style.display = 'none';
        historyButton.textContent = 'История';
    }
}

// История для лица
async function toggleSkinHistory() {
    const skinHistoruButton = document.querySelector('.skin-historu-button');
    const SkinHistoryTitle = document.getElementById('skinHistoryTitle');
    const skinHistoryList = document.getElementById('skinHistoryList');

    // Получаем email из профиля
    const email = getEmailFromProfile();
    if (!email) {
        console.error('Email не найден.');
        skinHistoryList.innerHTML = '<li>Не удалось найти email.</li>';
        return;
    }

    // Переключение текста на кнопке и отображение/скрытие истории
    if (SkinHistoryTitle.style.display === 'none') {
        SkinHistoryTitle.style.display = 'block';
        skinHistoruButton.textContent = 'Закрыть';

        // Получаем данные из API и отображаем их
        try {
            const response = await fetch(`http://localhost:3000/api/face-profile?email=${encodeURIComponent(email)}`);

            // Лог ответа от сервера
            console.log("Ответ от сервера получен:", response);

            if (!response.ok) {
                throw new Error('Ошибка при получении данных с сервера');
            }

            const data = await response.json(); // разбираем JSON

            // Логируем полученные данные
            console.log("Полученные данные:", data);

            // Очищаем список перед добавлением новых данных
            skinHistoryList.innerHTML = '';

            // Если данные есть, добавляем их в список
            if (data.length > 0) {
                let currentDate = '';

                data.forEach(record => {
                    const recordDate = new Date(record.created_at).toLocaleDateString();

                    // Проверяем, если дата изменилась, добавляем новый заголовок для этой даты
                    if (recordDate !== currentDate) {
                        const dateHeader = document.createElement('h4');
                        dateHeader.textContent = `История за ${recordDate}`;
                        dateHeader.style.fontWeight = 'bold';
                        dateHeader.style.marginTop = '20px';
                        skinHistoryList.appendChild(dateHeader);
                        currentDate = recordDate;
                    }

                    const listItem = document.createElement('div');
                    listItem.style.border = '1px solid #ddd';
                    listItem.style.padding = '10px';
                    listItem.style.marginBottom = '10px';
                    listItem.style.borderRadius = '8px';
                    listItem.style.backgroundColor = '#f9f9f9';

                    // Оформление данных
                    listItem.innerHTML = `
                        <p><strong>Состояние кожи:</strong> ${record.skin_condition}</p>
                        <p><strong>Уровень увлажненности:</strong> ${record.skin_hydration}</p>
                        <p><strong>Высыпания:</strong> ${record.has_rashes}</p>
                        <p><strong>Макияж:</strong> ${record.wears_makeup}</p>
                        <p><strong>Солнцезащитные средства:</strong> ${record.uses_sunscreen}</p>
                         <p><strong>Фото лица:</strong> ${record.face_photo ? `<img src="${record.face_photo}" alt="Фото кожи" style="max-width: 200px; height: auto;"/>` : 'Нет фото'}</p>
                    `;
                    skinHistoryList.appendChild(listItem);
                });
            } else {
                skinHistoryList.innerHTML = '<li>История пуста.</li>';
            }
        } catch (error) {
            // Логируем ошибку
            console.error('Ошибка при получении данных из таблицы face_profile:', error);
            skinHistoryList.innerHTML = '<li>Ошибка при загрузке данных.</li>';
        }

    } else {
        SkinHistoryTitle.style.display = 'none';
        skinHistoruButton.textContent = 'История';
    }
}

// Запускаем наблюдение при загрузке страницы
document.addEventListener('DOMContentLoaded', observeProfileContainer);
