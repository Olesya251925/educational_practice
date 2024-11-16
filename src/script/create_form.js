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

            <label for="hairPhoto" class="form-label">Загрузите фото ваших волос:</label>
            <input id="hairPhoto" name="hairPhoto" type="file" accept="image/*" class="form-input">

            <button type="submit" class="form-button">Сохранить</button>
            <div id="hairHistory">
                <h4>История состояния волос:</h4>
            </div>
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

         <label for="usesSunscreen" class="form-label">Используете ли вы солнцезащитные средства?</label>
        <select id="usesSunscreen" name="usesSunscreen" required class="form-select">
            <option disabled selected></option>
            <option value="Да">Да</option>
            <option value="Нет">Нет</option>
            <option value="Только летом">Только летом</option>
        </select>

        <!-- Загрузка фото -->
        <label for="facePhoto" class="form-label">Загрузите фото вашей кожи:</label>
        <input id="facePhoto" name="facePhoto" type="file" accept="image/*" class="form-input" />

            <button type="submit" class="form-button">Сохранить</button>
            <div id="skinHistory">
                <h4>История состояния кожи:</h4>
            </div>
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

// Запускаем наблюдение при загрузке страницы
document.addEventListener('DOMContentLoaded', observeProfileContainer);
