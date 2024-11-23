document.addEventListener("DOMContentLoaded", async () => {
    const searchInput = document.getElementById("search-bar");
    const searchBtn = document.querySelector(".search-btn");

    searchBtn.addEventListener("click", async () => {
        const query = searchInput.value.trim().toLowerCase(); // Получаем введенный запрос в нижнем регистре
        if (query) {
            await searchProducts(query); // Выполняем поиск, если введен запрос
        }
    });

    // Функция для поиска продуктов
    async function searchProducts(query) {
        const productContainer = document.getElementById("product-container");
        productContainer.innerHTML = ''; // Очищаем контейнер перед загрузкой результатов

        try {
            const response = await fetch('http://localhost:3000/api/clean_products');
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }

            const products = await response.json();
            const filteredProducts = products.filter(product => {
                // Фильтруем по названию и описанию
                return product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query);
            });

            if (filteredProducts.length === 0) {
                productContainer.innerHTML = '<p>Продукты не найдены</p>';
            } else {
                displayProducts(filteredProducts); // Отображаем найденные продукты
            }

        } catch (error) {
            console.error('Ошибка при загрузке продуктов:', error);
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Произошла ошибка при загрузке продуктов. Попробуйте позже.';
            productContainer.appendChild(errorMessage);
        }
    }

    // Функция для отображения продуктов с сохранением категорий
    function displayProducts(products) {
        const productContainer = document.getElementById("product-container");
        productContainer.innerHTML = ''; // Очищаем контейнер перед добавлением новых данных

        // Группировка продуктов по категориям
        const categories = {
            shampoos: [],
            conditioners: [],
            oils: [],
            masks: [],
            creams: [],
            serums: [],
            gels: [],
            face_mask: []
        };

        // Группировка продуктов по категориям
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
                case "Маска":
                    categories.masks.push(product);
                    break;
                case "Крем":
                    categories.creams.push(product);
                    break;
                case "Сыворотка":
                    categories.serums.push(product);
                    break;
                case "Гель":
                    categories.gels.push(product);
                    break;
                case "Маска2":
                    categories.face_mask.push(product);
                    break;
            }
        });

        // Отображение продуктов для каждой категории
        for (const [categoryName, categoryProducts] of Object.entries(categories)) {
            if (categoryProducts.length > 0) {
                // Создаем контейнер для категории
                const categoryContainer = document.createElement('div');
                categoryContainer.className = 'category-container';

                // Создаем заголовок категории
                const categoryHeader = document.createElement('h2');
                categoryHeader.textContent = getCategoryHeader(categoryName);
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
    }

    // Функция для получения заголовка категории
    function getCategoryHeader(categoryName) {
        switch (categoryName) {
            case 'shampoos':
                return 'Шампуни';
            case 'conditioners':
                return 'Кондиционеры';
            case 'oils':
                return 'Масла';
            case 'masks':
                return 'Маски';
            case 'creams':
                return 'Крема';
            case 'serums':
                return 'Сыворотки';
            case 'gels':
                return 'Гель/пенка';
            case 'face_mask':
                return 'Маски';
            default:
                return '';
        }
    }
});
