let currentProduct = null; // Переменная для отслеживания открытого продукта

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

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.style.cursor = 'pointer'; // Указатель на то, что карточка кликабельная

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
                // Проверяем, открыт ли уже текущий продукт
                if (currentProduct === product) {
                    return; // Если открыт, ничего не делаем
                }
                // Если другой продукт открыт, закрываем его
                if (currentProduct) {
                    closeProductDetails(); // Закрываем текущее окно перед открытием нового
                }
                showProductDetails(product);
            });

            // Добавляем анимацию наведения
            productCard.addEventListener('mouseenter', () => {
                productCard.classList.add('hover');
            });

            productCard.addEventListener('mouseleave', () => {
                productCard.classList.remove('hover');
            });

            // Добавление карточки продукта в контейнер
            productContainer.appendChild(productCard);
        });

    } catch (error) {
        console.error('Ошибка при загрузке продуктов:', error);
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Произошла ошибка при загрузке продуктов. Попробуйте позже.';
        productContainer.appendChild(errorMessage);
    }
});

function showProductDetails(product) {
    currentProduct = product;

    const detailsContainer = document.createElement('div');
    detailsContainer.className = 'product-details';
    detailsContainer.style.position = 'fixed';
    detailsContainer.style.top = '130px';
    detailsContainer.style.right = '0';
    detailsContainer.style.width = '350px';
    detailsContainer.style.height = 'auto';
    detailsContainer.style.maxHeight = 'calc(100vh - 165px)';
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
        closeProductDetails(); // Закрываем окно через функцию
    };

    detailsContainer.appendChild(closeImage);
    detailsContainer.innerHTML += `
        <h3 style="margin: 35px 0 10px 0; color: #333;">${product.name}</h3> 
        <p style="margin: 5px 0;"><strong>Цена:</strong> ${product.price} руб.</p>
        <p style="margin: 5px 0;"><strong>Объем:</strong> ${product.volume} мл</p>
        <p style="margin: 5px 0;"><strong>Описание:</strong> ${product.description}</p>
        <p style="margin: 5px 0;"><strong>Состав:</strong> ${product.composition}</p>
    `;

    detailsContainer.onclick = (event) => {
        closeProductDetails(); // Закрываем при клике на область
    };
}

function closeProductDetails() {
    const detailsContainer = document.querySelector('.product-details');
    if (detailsContainer) {
        detailsContainer.remove();
        currentProduct = null; // Сбрасываем текущий продукт после закрытия
    }
}
