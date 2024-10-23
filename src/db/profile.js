const CLIENT_ID = '983844239183-u2borqdd4bh68b4ohvmsq5pmlh5bmo16.apps.googleusercontent.com';
const REDIRECT_URI = 'http://127.0.0.1:5500/profile.html';

// Инициализация Google Auth
function initGoogleAuth() {
    gapi.load('auth2', function () {
        gapi.auth2.init({ client_id: CLIENT_ID })
            .then(() => console.log('Google Auth инициализирован.'))
            .catch(error => console.error('Ошибка инициализации Google Auth:', error));
    });
}

// Перенаправление на страницу авторизации Google
function handleGoogleLogin() {
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
        }
    } else if (savedToken) {
        loadProfileData(savedToken);
    } else {
        toggleProfileContainer(false);
        showAuthModal();
    }
}

// Вызов функции при успешной авторизации
function loadProfileData(token) {
    fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + token)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка загрузки данных профиля');
            }
            return response.json();
        })
        .then(profile => {
            const email = profile.email;
            document.getElementById('profileContainer').innerHTML = `
                <img id="profilePicture" src="${profile.picture}" alt="Аватар пользователя">
                <div class="profile-details">
                    <p><strong>Email:</strong> <span id="profileEmail">${profile.email}</span></p>
                    <p><strong>Имя:</strong> <span id="profileGivenName">${profile.given_name}</span></p>
                    <p><strong>Фамилия:</strong> <span id="profileFamilyName">${profile.family_name}</span></p>
                    <div id="editSection" style="display: none;">
                        <p><label for="city">Город:</label>
                        <input type="text" id="city" placeholder="Введите ваш город"></p>
                        <p><label for="age">Возраст:</label>
                        <input type="number" id="age" placeholder="Введите ваш возраст"></p>
                        <p><label for="uploadPhoto">Изменить фото:</label>
                        <input type="file" id="uploadPhoto" accept="image/*" onchange="previewAndUploadPhoto(event)"></p>
                        <div class="edit-buttons">
                            <button class="save-button" onclick="saveProfileData()">Сохранить</button>
                        </div>
                    </div>
                    <div class="profile-buttons">
                        <button id="backButton" onclick="goBack()" style="display: none;">Назад</button>
                        <button id="editButton" onclick="toggleEditProfile()">Редактировать профиль</button>
                        <button id="logoutButton" onclick="handleGoogleLogout()">Выйти из аккаунта</button>
                    </div>
                </div>
            `;

            const profileContainer = document.getElementById('profileContainer');
            profileContainer.classList.remove('hidden'); // Показываем контейнер профиля

            // Загружаем данные из базы данных
            loadProfileFromDatabase(email);
        })
        .catch(error => {
            console.error('Ошибка загрузки данных профиля:', error);
            const profileContainer = document.getElementById('profileContainer');
            profileContainer.classList.add('hidden'); // Скрываем контейнер профиля при ошибке
            showAuthModal(); // Открываем модальное окно
        });
}

// Загрузка данных профиля из базы данных
function loadProfileFromDatabase(email) {
    fetch(`http://localhost:3000/api/profile/${email}`)
        .then(response => response.json())
        .then(data => fillProfileData(data))
        .catch(error => console.error('Ошибка подгрузки данных профиля из базы данных:', error));
}

// Заполнение данных профиля
function fillProfileData(data) {
    document.getElementById('profileEmail').textContent = data.email || '';
    document.getElementById('profileGivenName').textContent = data.givenName || '';
    document.getElementById('profileFamilyName').textContent = data.familyName || '';
    document.getElementById('city').value = data.city || '';
    document.getElementById('age').value = data.age || '';
    document.getElementById('profilePicture').src = data.picture || '';
    toggleProfileContainer(true); // Показываем контейнер профиля после загрузки данных
}

// Управление видимостью контейнера профиля
function toggleProfileContainer(show) {
    document.getElementById('profileContainer').classList.toggle('hidden', !show);
}

// Модальные окна
function showAuthModal() {
    document.getElementById("loginModal").style.display = "block";
}

function closeModal() {
    document.getElementById("loginModal").style.display = "none";
}

function goBack() {
    window.location.href = 'profile.html'; // Перенаправляем на страницу профиля
}

// Переключение режима редактирования профиля
function toggleEditProfile() {
    const editSection = document.getElementById('editSection');
    const editButton = document.getElementById('editButton');
    const backButton = document.getElementById('backButton');
    const logoutButton = document.getElementById('logoutButton');

    const isEditVisible = editSection.style.display !== 'none';

    editSection.style.display = isEditVisible ? 'none' : 'block';
    editButton.style.display = isEditVisible ? 'block' : 'none';
    backButton.style.display = isEditVisible ? 'none' : 'block';
    logoutButton.style.display = isEditVisible ? 'block' : 'none';
}


// Сохранение данных профиля
function saveProfileData() {
    const profileData = {
        email: document.getElementById('profileEmail').textContent,
        givenName: document.getElementById('profileGivenName').textContent,
        familyName: document.getElementById('profileFamilyName').textContent,
        city: document.getElementById('city').value,
        age: document.getElementById('age').value,
        picture: document.getElementById('profilePicture').src
    };

    fetch('http://localhost:3000/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            toggleEditProfile();
        })
        .catch(error => console.error('Ошибка сохранения данных профиля:', error));
}

// Выход из аккаунта
function handleGoogleLogout() {
    localStorage.removeItem('access_token');
    closeModal();
    document.getElementById('profileContainer').innerHTML = '';
    toggleProfileContainer(false);
    showAuthModal();
}

// Инициализация при загрузке страницы
window.onload = function () {
    initGoogleAuth();
    handleAuthResult();
};
