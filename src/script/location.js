var map = L.map('map').setView([54.7441, 86.8343], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

var salons = [
    {
        name: "Glow and Shine",
        coords: [55.355372, 86.144277],
        phone: "+7 (950) 456-7890",
        photo: "src/photo/salon1.png",
        address: "Притомский проспект, 29",
        description: "Салон красоты №1 в Кемерово."
    },
    {
        name: "Glow and Shine",
        coords: [55.349312, 86.088006],
        phone: "+7 (904) 123-4567",
        photo: "src/photo/salon2.png",
        address: "Красная улица, 13",
        description: "Лучший салон для волос и ногтей."
    },
    {
        name: "Glow and Shine",
        coords: [55.337703, 86.064425],
        phone: "+7 (908) 123-4567",
        photo: "src/photo/salon3.png",
        address: "улица Сибиряков-Гвардейцев, 3",
        description: "Индивидуальные услуги для каждого."
    }
];

// Добавляем маркеры на карту
salons.forEach(function (salon) {
    var marker = L.marker(salon.coords).addTo(map);

    var popupContent = `
        <h3 style = " text-align: center " >${salon.name}</h3>
        <img src="${salon.photo}" alt="${salon.name}" style="width: 100%; height: auto;">
        <p style = " text-align: center " >${salon.description}</p>
        <p style = " text-align: center " >Адрес: ${salon.address}</p> 
        <p style = " text-align: center " >Телефон: <a href="tel:${salon.phone}">${salon.phone}</a></p>
    `;

    marker.bindPopup(popupContent);
});

// Получение текущего местоположения пользователя
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError, {
            enableHighAccuracy: true
        });
    } else {
        alert("Геолокация не поддерживается этим браузером.");
    }
}

function showPosition(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    console.log("Текущее местоположение:", lat, lon);

    map.setView([lat, lon], 13);

    L.marker([lat, lon]).addTo(map)
        .bindPopup('Вы находитесь здесь')
        .openPopup();
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("Пользователь отклонил запрос на получение местоположения. Пожалуйста, предоставьте доступ к геолокации в настройках браузера.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Информация о местоположении недоступна. Пожалуйста, проверьте настройки вашего устройства.");
            break;
        case error.TIMEOUT:
            alert("Запрос на получение местоположения истек. Пожалуйста, попробуйте еще раз.");
            break;
        case error.UNKNOWN_ERROR:
            alert("Произошла неизвестная ошибка. Пожалуйста, попробуйте еще раз.");
            break;
    }
}

getLocation();
