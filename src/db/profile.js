const CLIENT_ID = '983844239183-u2borqdd4bh68b4ohvmsq5pmlh5bmo16.apps.googleusercontent.com';

// Инициализация Google Auth
function initGoogleAuth() {
    gapi.load('auth2', function () {
        gapi.auth2.init({
            client_id: CLIENT_ID,
        }).then(() => {
            console.log('Google Auth инициализирован.');
        }).catch((error) => {
            console.error('Ошибка инициализации Google Auth:', error);
        });
    });
}

// Функция для перенаправления на страницу авторизации Google
function handleGoogleLogin() {
    const REDIRECT_URI = 'http://127.0.0.1:5500/profile.html'; // Ваш реальный URI
    const authUrl = `https://accounts.google.com/o/oauth2/auth?response_type=token&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=email%20profile&prompt=select_account`;
    window.location.href = authUrl;
}

// Проверка результата авторизации
function handleAuthResult() {
    const savedToken = localStorage.getItem('access_token');
    if (window.location.hash) {
        const fragment = new URLSearchParams(window.location.hash.slice(1));
        const accessToken = fragment.get('access_token');
        if (accessToken) {
            localStorage.setItem('access_token', accessToken);
            loadProfileData(accessToken);
            showProfile();
        }
    } else if (savedToken) {
        loadProfileData(savedToken);
        showProfile();
    } else {
        showAuthButtons();
    }
}

// Загрузка данных профиля пользователя
function loadProfileFromDatabase(email) {
    fetch(`http://localhost:3000/api/profile/${email}`)
        .then(response => response.json())
        .then(data => {
            if (data) {
                document.getElementById('profileEmail').textContent = data.email;
                document.getElementById('profileGivenName').textContent = data.givenName;
                document.getElementById('profileFamilyName').textContent = data.familyName;
                document.getElementById('city').value = data.city || ''; // Заполнение поля города
                document.getElementById('age').value = data.age || ''; // Заполнение поля возраста
                document.getElementById('profilePicture').src = data.picture || ''; // Подгрузка фото профиля
            }
        })
        .catch(error => {
            console.error('Ошибка подгрузки данных профиля из базы данных:', error);
        });
}

// Вызов функции при успешной авторизации
function loadProfileData(token) {
    fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + token)
        .then(response => response.json())
        .then(profile => {
            const email = profile.email;
            document.getElementById('profileContainer').innerHTML = `
                <img id="profilePicture" src="${profile.picture}" alt="Аватар пользователя">
                <div class="profile-details">
                    <p><strong>Email:</strong> <span id="profileEmail">${profile.email}</span></p>
                    <p><strong>Имя:</strong> <span id="profileGivenName">${profile.given_name}</span></p>
                    <p><strong>Фамилия:</strong> <span id="profileFamilyName">${profile.family_name}</span></p>
                    <p><label for="city">Город:</label>
                    <input type="text" id="city" placeholder="Введите ваш город"></p>
                    <p><label for="age">Возраст:</label>
                    <input type="number" id="age" placeholder="Введите ваш возраст"></p>
                    <p><label for="uploadPhoto">Изменить фото:</label>
                    <input type="file" id="uploadPhoto" accept="image/*" onchange="previewAndUploadPhoto(event)"></p>
                    <button class="save-button" onclick="saveProfileData()">Сохранить</button>
                    <button id="logoutButton" onclick="logout()">Выйти</button>
                </div>
            `;

            // Загружаем данные из базы данных
            loadProfileFromDatabase(email);
        })
        .catch(error => {
            console.error('Ошибка загрузки данных профиля:', error);
        });
}


function saveProfileData() {
    const email = document.getElementById('profileEmail').textContent;
    const givenName = document.getElementById('profileGivenName').textContent;
    const familyName = document.getElementById('profileFamilyName').textContent;
    const city = document.getElementById('city').value;
    const age = document.getElementById('age').value;
    const picture = document.getElementById('profilePicture').src;

    const profileData = {
        email,
        givenName,
        familyName,
        city,
        age,
        picture,
    };

    console.log('Данные для сохранения:', profileData); // Добавлено для отладки

    fetch('http://localhost:3000/api/profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Ответ сервера:', data); // Добавлено для отладки
            alert(data.message);
        })
        .catch(error => {
            console.error('Ошибка сохранения данных профиля:', error);
            alert('Ошибка сохранения данных профиля.');
        });
}

// Функция для выхода из аккаунта
function logout() {
    localStorage.removeItem('access_token');
    handleGoogleLogout();
}

function handleGoogleLogout() {
    localStorage.removeItem('access_token');
    sessionStorage.clear();
    showAuthButtons();
    document.getElementById('profileContainer').innerHTML = '';
    console.log('Вы вышли из аккаунта.');
}

// Показать профиль
function showProfile() {
    document.getElementById('registerButton').style.display = 'none';
    document.getElementById('logoutButton').style.display = 'block';
}

// Показать кнопки регистрации и входа
function showAuthButtons() {
    document.getElementById('registerButton').style.display = 'block';
    document.getElementById('logoutButton').style.display = 'none';
}

// Функция для предпросмотра и загрузки фото
function previewAndUploadPhoto(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('profilePicture').src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
}

// Привязка функции для выхода из аккаунта к кнопке "Выйти"
document.getElementById('logoutButton').onclick = function () {
    handleGoogleLogout();
};

// Привязка функции для регистрации к кнопке "Зарегистрироваться"
document.getElementById('registerButton').onclick = function () {
    handleGoogleLogin();
};

// Запуск авторизации при загрузке страницы
window.onload = function () {
    initGoogleAuth();
    handleAuthResult();
};
