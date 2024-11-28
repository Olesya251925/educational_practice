document.addEventListener("DOMContentLoaded", async () => {
    const productContainer = document.getElementById("product-container");
    const categoryTitle = document.getElementById("category-title");
    const hairProductsBtn = document.getElementById("hair-products-btn");
    const faceProductsBtn = document.getElementById("face-products-btn");
    const brandsBtn = document.getElementById("brands-btn"); // Кнопка "О брендах"

    // Загрузка продуктов по умолчанию
    await loadProducts('hair');

    // Обработчик для кнопки "Средства для волос"
    hairProductsBtn.addEventListener("click", async () => {
        clearPage(); // Очистка страницы
        categoryTitle.textContent = "Средства для волос";
        setActiveButton(hairProductsBtn); // Устанавливаем активную кнопку
    });

    // Обработчик для кнопки "Средства для лица"
    faceProductsBtn.addEventListener("click", async () => {
        clearPage(); // Очистка страницы
        categoryTitle.textContent = "Средства для лица";
        setActiveButton(faceProductsBtn); // Устанавливаем активную кнопку
    });

    // Обработчик для кнопки "О брендах"
    brandsBtn.addEventListener("click", async () => {
        clearPage(); // Очистка страницы
        categoryTitle.textContent = "О брендах";
        showBrandsInfo(); // Показать информацию о брендах
        setActiveButton(brandsBtn); // Устанавливаем активную кнопку
    });
});

// Функция для очистки страницы
function clearPage() {
    const productContainer = document.getElementById("product-container");
    const categoryTitle = document.getElementById("category-title");

    // Удаляем содержимое контейнера продуктов
    if (productContainer) {
        productContainer.innerHTML = '';
    }

    // Сбрасываем заголовок (если нужно)
    if (categoryTitle) {
        categoryTitle.textContent = '';
    }
}

function showBrandsInfo() {
    const productContainer = document.getElementById("product-container");

    const brandsInfo = document.createElement('div');
    brandsInfo.className = 'brands-info';
    brandsInfo.innerHTML = `
        <div class="brand-description-container">
            <div class="brand-container">
                <div class="brand-text">
                    <h3 class="brand-title">COSMOS</h3>
                    <p class="brand-description">
                        В 2010 году некоммерческую организацию основали ведущие европейские сертификационные организации: 
                        <strong>BDIH</strong> (Германия), <strong>Soil Association</strong> (Англия), <strong>ICEA</strong> (Италия), <strong>Cosmebio</strong> (Франция).
                    </p>
                    <p class="brand-description">
                        Ассоциация разработала единый международный стандарт для натуральной и органической косметики, который называется <strong>COSMOS Standard</strong>.
                    </p>
                    <section class="important-factors">
                        <h4 class="sub-heading"><strong>Что важно (кроме базовых принципов):</strong></h4>
                        <ul class="brand-list">
                            <li>Как продукт был получен.</li>
                            <li>Как он будет разлагаться в природе.</li>
                            <li>Какие промежуточные стадии были пройдены при производстве.</li>
                        </ul>
                    </section>
                    <section class="cosmos-standard">
                        <h4 class="sub-heading"><strong>Стандарты для COSMOS-ORGANIC:</strong></h4>
                        <ul class="brand-list">
                            <li>Не менее 95% натуральных ингредиентов в составе.</li>
                            <li>5% компонентов могут быть синтетическими, но из списка разрешенных.</li>
                            <li>Не менее 95% растительных ингредиентов должны быть органическими.</li>
                            <li>Для несмываемых средств – не менее 20% органических ингредиентов, для смываемых – не менее 10%.</li>
                            <li>Обязательно указывать процент органических компонентов от общей массы продукта.</li>
                        </ul>
                    </section>
                    <section class="cosmos-standard">
                        <h4 class="sub-heading"><strong>Стандарты для COSMOS-NATURAL:</strong></h4>
                        <ul class="brand-list">
                            <li>Органические ингредиенты обязательно должны присутствовать, но их количество может быть любым.</li>
                            <li>По желанию производитель может указать на задней части упаковки процент органических компонентов от общей массы продукта.</li>
                        </ul>
                    </section>
                    <section class="audit-process">
                        <p class="brand-description">
                            Чтобы подтвердить, что наша компания соответствует стандартам, мы проходим ежегодные аудиты:
                        </p>
                        <ul class="brand-list">
                            <li>BDIH (Германия)</li>
                            <li>ICEA (Италия)</li>
                        </ul>
                    </section>
                </div>
                <div class="brand-logo-container">
                    <img src="src/logo/cosmos_organic.png" alt="COSMOS Organic Logo" class="brand-logo">
                    <img src="src/logo/cosmos_natural.png" alt="COSMOS Natural Logo" class="brand-logo">
                </div>
            </div>

            <div class="brand-container">
                <div class="brand-text">
                    <h3 class="brand-title">ICEA (Istituto per la Certificazione Etica e Ambientale)</h3>
                    <p class="brand-description">ICEA – итальянский институт сертификации в области этики и охраны окружающей среды, твердо отстаивающий ценность сертификации как оплота прав потребителей и гарантий для работников. Организация проверяет и выдает сертификаты по этическим и экологическим стандартам, чтобы улучшить производство компаний, ориентированных на «зеленую» экономику и следующих устойчивому и этическому подходам.</p>
                    <p class="brand-description">Основная цель ICEA – проводить исследования и разработки, чтобы создать экономическую ценность для компаний и территорий в различных областях. ICEA тесно сотрудничает с частными лицами, профессионалами, местными властями, торговыми ассоциациями, университетами и исследовательскими центрами, как в Италии, так и за рубежом.</p>
                </div>
                <div class="brand-logo-container">
                    <img src="src/logo/eco_cosmetics.png" alt="Eco Bio Cosmetics Logo" class="brand-logo">
                </div>
            </div>

            <div class="brand-container">
                <div class="brand-text">
                    <h3 class="brand-title">ICE Professional</h3>
                    <p class="brand-description">
                        <strong>Природные компоненты</strong>: 
                    </p>
                    <p class="brand-description">
                        В составе – максимум природных компонентов: растительных масел, экстрактов, целебных грязей, солей, глубоководных водорослей, свежих овощей и фруктов. Происхождение сырья имеет значение – мы контролируем каждого поставщика. Мы любим животных и заботимся об их безопасности, поэтому не тестируем на них средства и полностью отказываемся от компонентов, которые получают с причинением им вреда. Упаковка средств биоразлагаемая или ее можно переработать. Безопасность компонентов в составе подтверждена экоассоциациями и институтами.
                    </p>
                    <p class="brand-description">
                        Стандарт появился в 1990-м году. Маркировка значит, что в составе нет ингредиентов животного происхождения. Стандарт распространяется не только на косметику, но и на одежду, продукты питания, напитки, предметы домашнего обихода и многое другое.
                    </p>
                    <p class="brand-description">
                        <strong>Требования к средствам:</strong>
                    </p>
                    <ul class="brand-list">
                        <li>Не допускается проведение опытов над животными при разработке, тестировании и регистрации продуктов.</li>
                        <li>Запрещено использование сырья животного происхождения.</li>
                        <li>Ингредиенты не должны содержать гены животных (ГМО).</li>
                    </ul>
                </div>
                <div class="brand-logo-container">
                    <img src="src/logo/vegan.png" alt="Vegan Logo" class="brand-logo">
                </div>
            </div>
        </div>
    `;
    productContainer.appendChild(brandsInfo);
}











// Функция для установки активной кнопки
function setActiveButton(activeButton) {
    // Находим все кнопки
    const buttons = document.querySelectorAll('.category-btn');

    // Убираем класс "active" с всех кнопок
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    // Добавляем класс "active" только к активной кнопке
    activeButton.classList.add('active');
}
