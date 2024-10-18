const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Подключение к базе данных
mongoose.connect('mongodb://localhost:27017/practice', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Создание схемы и модели для коллекции account
const accountSchema = new mongoose.Schema({
    googleId: String,
    email: String,
    name: String,
    // Добавьте другие поля, если нужно
});

const Account = mongoose.model('Account', accountSchema);

// Эндпоинт для добавления аккаунта
app.post('/api/accounts', async (req, res) => {
    const { googleId, email, name } = req.body;
    const newAccount = new Account({ googleId, email, name });

    try {
        await newAccount.save();
        res.status(201).send(newAccount);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
