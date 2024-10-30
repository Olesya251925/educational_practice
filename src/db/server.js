const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

// Подключение к PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'practice',
    password: '251925',
    port: 5433,
});

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '500mb' }));

// Эндпоинт для сохранения данных профиля
app.post('/api/profile', async (req, res) => {
    const { email, first_name, surname, city, age, picture } = req.body;

    try {
        const client = await pool.connect();

        // Проверка, существует ли пользователь
        const result = await client.query('SELECT * FROM accounts WHERE email = $1', [email]);

        if (result.rows.length > 0) {
            // Если аккаунт существует, обновляем его
            await client.query(
                'UPDATE accounts SET first_name = $1, surname = $2, city = $3, age = $4, picture = $5 WHERE email = $6',
                [first_name, surname, city, age, picture, email]
            );
            res.status(200).json({ message: 'Данные профиля обновлены!' });
        } else {
            // Создаем новый аккаунт
            await client.query(
                'INSERT INTO accounts (email, first_name, surname, city, age, picture) VALUES ($1, $2, $3, $4, $5, $6)',
                [email, first_name, surname, city, age, picture]
            );
            res.status(200).json({ message: 'Данные профиля сохранены!' });
        }

        client.release();
    } catch (error) {
        console.error('Ошибка при сохранении данных профиля:', error);
        res.status(500).json({ message: 'Ошибка при сохранении данных профиля.', error: error.message });
    }
});

// Эндпоинт для получения данных профиля по email
app.get('/api/profile/:email', async (req, res) => {
    const email = req.params.email;

    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM accounts WHERE email = $1', [email]);

        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Профиль не найден' });
        }

        client.release();
    } catch (error) {
        console.error('Ошибка при получении данных профиля:', error);
        res.status(500).json({ message: 'Ошибка при получении данных профиля.' });
    }
});

// Эндпоинт для получения всех чистых продуктов
app.get('/api/clean_products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM clean_products');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        res.status(500).json({ message: 'Ошибка при получении данных.' });
    }
});

// Эндпоинт для получения изображения по URL
app.get('/image/:url', async (req, res) => {
    const imageUrl = req.params.url;

    // Отправляем HTML с изображением
    res.send(`
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Изображение</title>
            <style>
                body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background-color: #f5f5f5;
                }
                img {
                    max-width: 100%;
                    height: auto;
                }
            </style>
        </head>
        <body>
            <img src="${imageUrl}" alt="Продукт" />
            <p><a href="/">Вернуться на главную страницу</a></p>
        </body>
        </html>
    `);
});


// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
