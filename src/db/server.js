const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/practice', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Успешное подключение к MongoDB'))
    .catch(err => console.error('Ошибка подключения к MongoDB:', err));

// Определение схемы и модели для аккаунта
const accountSchema = new mongoose.Schema({
    email: String,
    givenName: String,
    familyName: String,
    city: String,
    age: Number,
    picture: String,
});

const Account = mongoose.model('Account', accountSchema);

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '500mb' })); // Увеличиваем лимит для больших изображений

// Эндпоинт для сохранения данных профиля
app.post('/api/profile', async (req, res) => {
    console.log('Получены данные профиля:', req.body);
    const { email, givenName, familyName, city, age, picture } = req.body;

    // Создание нового аккаунта или обновление существующего
    try {
        let account = await Account.findOne({ email });
        if (account) {
            // Если аккаунт существует, обновляем его
            account.givenName = givenName;
            account.familyName = familyName;
            account.city = city;
            account.age = parseInt(age); // Преобразуем в число
            account.picture = picture;
            await account.save();
        } else {
            // Создаем новый аккаунт
            account = new Account({
                email,
                givenName,
                familyName,
                city,
                age: parseInt(age), // Преобразуем в число
                picture
            });
            await account.save();
        }
        console.log('Данные профиля успешно сохранены:', account);
        res.status(200).json({ message: 'Данные профиля успешно сохранены!' });
    } catch (error) {
        console.error('Ошибка при сохранении данных профиля:', error);
        res.status(500).json({ message: 'Ошибка при сохранении данных профиля.', error: error.message });
    }
});


// Эндпоинт для получения данных профиля по email
app.get('/api/profile/:email', async (req, res) => {
    const email = req.params.email;

    try {
        const account = await Account.findOne({ email });
        if (account) {
            res.status(200).json(account);
        } else {
            res.status(404).json({ message: 'Профиль не найден' });
        }
    } catch (error) {
        console.error('Ошибка при получении данных профиля:', error);
        res.status(500).json({ message: 'Ошибка при получении данных профиля.' });
    }
});


// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});