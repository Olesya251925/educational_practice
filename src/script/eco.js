let currentProduct = null; // Переменная для отслеживания открытого продукта
let currentProductCard = null; // Переменная для отслеживания открытой карточки
let detailsContainer = null; // Переменная для хранения контейнера деталей продукта

document.addEventListener("DOMContentLoaded", async () => {
    const productContainer = document.getElementById("product-container");

    try {
        const response = await fetch('http://localhost:3000/api/clean_products');

        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const products = await response.json();

        if (products.length === 0) {
            const noProductsMessage = document.createElement('p');
            noProductsMessage.textContent = 'Нет доступных продуктов.';
            productContainer.appendChild(noProductsMessage);
            return;
        }

        // Группировка продуктов по категориям
        const categories = {
            shampoos: [],
            conditioners: [],
            oils: [],
            masks: [] // Добавлена новая категория "Маски"
        };

        products.forEach(product => {
            switch (product.category) {
                case "Шампунь":
                    categories.shampoos.push(product);
                    break;
                case "Кондиционер":
                    categories.conditioners.push(product);
                    break;
                case "Масло":
                    categories.oils.push(product);
                    break;
                case "Маска": // Добавлен новый случай для категории "Маска"
                    categories.masks.push(product);
                    break;
            }
        });

        // Отображение продуктов для каждой категории
        for (const [categoryName, categoryProducts] of Object.entries(categories)) {
            if (categoryProducts.length > 0) {
                // Создаем контейнер для категории
                const categoryContainer = document.createElement('div');
                categoryContainer.className = 'category-container';

                // Создаем заголовок категории на русском языке
                const categoryHeader = document.createElement('h2');
                switch (categoryName) {
                    case 'shampoos':
                        categoryHeader.textContent = 'Шампуни';
                        break;
                    case 'conditioners':
                        categoryHeader.textContent = 'Кондиционеры';
                        break;
                    case 'oils':
                        categoryHeader.textContent = 'Масла';
                        break;
                    case 'masks': // Добавлен новый случай для заголовка категории "Маски"
                        categoryHeader.textContent = 'Маски';
                        break;
                }
                categoryContainer.appendChild(categoryHeader);

                // Создаем контейнер для продуктов
                const productList = document.createElement('div');
                productList.className = 'product-list';

                categoryProducts.forEach(product => {
                    const productCard = document.createElement('div');
                    productCard.className = 'product-card';
                    productCard.style.cursor = 'pointer';
                    productCard.style.marginRight = '10px';

                    // Создаем элемент изображения
                    const productImage = document.createElement('img');
                    productImage.src = product.image_url || 'default-image.jpg';
                    productImage.style.width = '100%';
                    productCard.appendChild(productImage);

                    // Создаем заголовок с именем продукта
                    const productTitle = document.createElement('h3');
                    productTitle.textContent = product.name || 'Без названия';
                    productCard.appendChild(productTitle);

                    // Добавляем обработчик событий для нажатия на карточку
                    productCard.addEventListener('click', () => {
                        if (currentProduct === product) {
                            return; // Если открыт, ничего не делаем
                        }
                        if (currentProduct) {
                            closeProductDetails(); // Закрываем текущее окно перед открытием нового
                        }
                        showProductDetails(product, productCard); // Передаем также карточку
                    });

                    // Добавление карточки продукта в список
                    productList.appendChild(productCard);
                });

                // Добавление списка продуктов в контейнер категории
                categoryContainer.appendChild(productList);
                productContainer.appendChild(categoryContainer);
            }
        }


    } catch (error) {
        console.error('Ошибка при загрузке продуктов:', error);
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Произошла ошибка при загрузке продуктов. Попробуйте позже.';
        productContainer.appendChild(errorMessage);
    }
});

function showProductDetails(product, productCard) {
    currentProduct = product;
    currentProductCard = productCard; // Сохраняем текущую карточку

    // Добавляем эффект тени к карточке
    currentProductCard.classList.add('selected-product');

    detailsContainer = document.createElement('div');
    detailsContainer.className = 'product-details';
    detailsContainer.style.position = 'fixed';
    detailsContainer.style.top = '130px'; // Начальное положение
    detailsContainer.style.right = '20px';
    detailsContainer.style.width = '350px';
    detailsContainer.style.maxHeight = 'calc(100vh - 100px)';
    detailsContainer.style.backgroundColor = '#fff';
    detailsContainer.style.padding = '20px';
    detailsContainer.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    detailsContainer.style.borderRadius = '8px';
    detailsContainer.style.zIndex = '1000';
    detailsContainer.style.overflowY = 'auto';
    detailsContainer.style.transition = 'transform 0.3s ease-in-out';
    detailsContainer.style.transform = 'translateX(100%)';

    setTimeout(() => {
        detailsContainer.style.transform = 'translateX(0)';
    }, 0);

    document.body.appendChild(detailsContainer);

    const closeImage = document.createElement('img');
    closeImage.src = 'src/photo/cancel.png';
    closeImage.alt = 'Закрыть';
    closeImage.className = 'close-button';
    closeImage.style.cursor = 'pointer';
    closeImage.style.width = '30px';
    closeImage.style.position = 'absolute';
    closeImage.style.top = '15px';
    closeImage.style.right = '20px';

    closeImage.onclick = (event) => {
        event.stopPropagation();
        closeProductDetails();
    };

    detailsContainer.appendChild(closeImage);
    detailsContainer.innerHTML += `
        <h3 style="margin: 20px 0 10px 0; color: #333;">${product.name}</h3> 
        <p style="margin: 5px 0;"><strong>Цена:</strong> ${product.price} руб.</p>
        <p style="margin: 5px 0;"><strong>Объем:</strong> ${product.volume} мл</p>
        <p style="margin: 5px 0;"><strong>Описание:</strong> ${product.description}</p>
        <p style="margin: 5px 0;"><strong>Состав:</strong> ${product.composition}</p>
        <p style="margin: 5px 0;"><strong>Применение:</strong> ${product.usage || 'Информация отсутствует'}</p>
    `;

    detailsContainer.onclick = (event) => {
        closeProductDetails();
    };

    // Добавляем обработчик прокрутки
    window.addEventListener('scroll', onScroll);
}

function closeProductDetails() {
    if (detailsContainer) {
        detailsContainer.remove();
        currentProductCard.classList.remove('selected-product'); // Убираем эффект тени с карточки
        currentProduct = null; // Сбрасываем текущий продукт после закрытия
        currentProductCard = null; // Сбрасываем текущую карточку
        window.removeEventListener('scroll', onScroll); // Удаляем обработчик прокрутки
    }
}

function onScroll() {
    const scrollY = window.scrollY; // Получаем текущую позицию прокрутки
    const newTop = Math.max(130 - scrollY, 20); // Изменяем позицию в зависимости от прокрутки, ограничиваем до 20px
    detailsContainer.style.top = newTop + 'px'; // Устанавливаем новое значение top
}
