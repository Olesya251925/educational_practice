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

app.post('/api/save-hair-profile', async (req, res) => {
    const {
        email,
        hairCondition,
        hairType,
        hairPorosity,
        usesHeatProtection,
        hairWashFrequency,
        hairPhoto,
        splitEnds,
        coloredHair,
        hairLoss,
        ecoProducts // получаем новые данные о эко товарах
    } = req.body;

    // Логируем полученные данные
    console.log('Полученные данные для сохранения в базе данных:');
    console.log({
        email,
        hairCondition,
        hairType,
        hairPorosity,
        usesHeatProtection,
        hairWashFrequency,
        hairPhoto,
        splitEnds,
        coloredHair,
        hairLoss,
        ecoProducts // данные о эко товарах
    });



    try {
        const client = await pool.connect(); // Подключаемся к базе данных

        // SQL-запрос для вставки данных в таблицу hair_profile
        const query = `
            INSERT INTO hair_profile (email, hair_condition, hair_type, hair_porosity, uses_heat_protection, hair_wash_frequency, hair_photo, split_ends, colored_hair, hair_loss, eco_products)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        `;

        const values = [
            email,
            hairCondition,
            hairType,
            hairPorosity,
            usesHeatProtection,
            hairWashFrequency,
            hairPhoto,
            splitEnds,
            coloredHair,
            hairLoss,
            ecoProducts // сохраняем эко товары в базе данных
        ];

        // Выполняем запрос
        await client.query(query, values);
        client.release(); // Освобождаем соединение с базой данных

        res.status(200).json({ message: 'Данные успешно сохранены' }); // Ответ от сервера
    } catch (error) {
        console.error('Ошибка при сохранении данных в базу:', error);
        res.status(500).json({ message: 'Ошибка при сохранении данных' });
    }
});


// Эндпоинт для сохранения данных профиля кожи
app.post('/api/save-skin-profile', async (req, res) => {
    const {
        email,
        skinCondition,
        skinHydration,
        hasRashes,
        wearsMakeup,
        usesSunscreen,
        facePhoto,
        ecoProducts // Добавлен новый параметр
    } = req.body;

    try {
        const client = await pool.connect(); // Подключаемся к базе данных

        // Проверим корректность входных данных
        if (!email) {
            return res.status(400).json({ message: 'Email обязателен' });
        }

        // SQL-запрос для вставки данных в таблицу face_profile
        const query = `
            INSERT INTO face_profile (email, skin_condition, skin_hydration, has_rashes, wears_makeup, uses_sunscreen, face_photo, eco_products)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `;

        const values = [email, skinCondition, skinHydration, hasRashes, wearsMakeup, usesSunscreen, facePhoto, ecoProducts];

        // Выполняем запрос
        await client.query(query, values);
        client.release(); // Освобождаем соединение с базой данных

        res.status(200).json({ message: 'Данные успешно сохранены' }); // Ответ от сервера
    } catch (error) {
        console.error('Ошибка при сохранении данных в базу:', error);
        res.status(500).json({ message: 'Ошибка при сохранении данных' });
    }
});


// Эндпоинт для получения всех данных из таблицы hair_profile
app.get('/api/hair-profile', async (req, res) => {

    const email = req.query.email ? req.query.email.trim() : null;

    if (!email) {
        return res.status(400).json({ message: 'Email не предоставлен' });
    }

    console.log('Ищем записи для email:', email);

    try {
        const client = await pool.connect();

        // Запрос с фильтрацией по email
        const result = await client.query('SELECT * FROM hair_profile WHERE email = $1', [email]);

        client.release();
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Ошибка при получении данных из таблицы hair_profile:', error);
        res.status(500).json({ message: 'Ошибка при получении данных.' });
    }
});


// Эндпоинт для получения всех данных из таблицы face_profile
app.get('/api/face-profile', async (req, res) => {
    try {

        // Получаем email из параметров запроса
        const email = req.query.email ? req.query.email.trim() : null;

        if (!email) {
            return res.status(400).json({ message: 'Email не предоставлен' });
        }

        const client = await pool.connect();

        // Выполняем запрос с фильтрацией по email
        const result = await client.query('SELECT * FROM face_profile WHERE email = $1', [email]);

        client.release();

        console.log("Данные получены:", result.rows);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Ошибка при получении данных из таблицы face_profile:', error);
        res.status(500).json({ message: 'Ошибка при получении данных.' });
    }
});

app.get('/api/eco-goods', async (req, res) => {
    const hairCondition = req.query.hairCondition;
    const coloredHair = req.query.coloredHair;
    const splitEnds = req.query.splitEnds;
    const hairLoss = req.query.hairLoss;
    const hairWashFrequency = req.query.hairWashFrequency;
    const skinCondition = req.query.skinCondition;
    const skinHydration = req.query.skinHydration;
    const hasRashes = req.query.hasRashes;
    const usesSunscreen = req.query.usesSunscreen;

    console.log('Полученные параметры:', { hairCondition, coloredHair, splitEnds });

    try {
        const conditions = [];

        // Добавляем фильтрацию по состоянию волос
        if (hairCondition === 'Здоровые') {
            conditions.push('id IN (9, 11, 22, 26)');
        } else if (hairCondition === 'Сухие') {
            conditions.push('id IN (4, 10)');
        } else if (hairCondition === 'Поврежденные') {
            conditions.push('id IN (1, 4, 6, 19, 24)');
        } else if (hairCondition === 'Тонкие') {
            conditions.push('id IN (2, 5, 10, 20, 21)');
        } else if (hairCondition === 'Жирные') {
            conditions.push('id IN (2, 8)');
        }

        // Добавляем фильтрацию по окрашенным волосам
        if (coloredHair === 'Да') {
            conditions.push('id IN (16, 7, 17, 23)');
        } else if (coloredHair === 'Нет') {
            conditions.push('id = 27');
        }

        // Добавляем фильтрацию по секущимся кончикам
        if (splitEnds === 'Да') {
            conditions.push('id IN (13, 14, 15)');
        } else if (splitEnds === 'Нет') {
            conditions.push('id = 11');
        }

        // Добавляем фильтрацию по выпадению волос
        if (hairLoss === 'Да') {
            conditions.push('id IN (18, 25)');
        } else if (hairLoss === 'Нет') {

        }

        // Добавляем фильтрацию по частоте мытья волос
        if (hairWashFrequency === 'Ежедневно') {
            conditions.push('id IN (5, 8 )');
        }

        // Добавляем фильтрацию по состоянию кожи
        if (skinCondition === 'Сухая') {
            conditions.push('id = 35');
        } else if (skinCondition === 'Жирная') {
            conditions.push('id = 52');
        } else if (skinCondition === 'Нормальная') {
            conditions.push('id IN (38, 47)');
        } else if (skinCondition === 'Чувствительная') {
            conditions.push('id IN (34, 29)');
        }

        //Уровень увлажненности
        if (skinHydration === 'Влажная') {
            conditions.push('id IN (52, 46)');
        } else if (skinHydration === 'Сухая' || skinHydration === 'Очень сухая') {
            conditions.push('id IN (31, 53)');
        } else if (skinHydration === 'Нормальная') {
            conditions.push('id = 54');
        }

        //Проблемная кожа
        if (hasRashes === 'Да') {
            conditions.push('id IN (41, 46, 40)');
        }

        //Имеются ли у вас морщины
        if (usesSunscreen === 'Да') {
            conditions.push('id IN (42, 43, 36, 49)');
        }

        // Если нет условий, возвращаем ошибку
        if (conditions.length === 0) {
            return res.status(400).json({ message: 'Не указаны параметры фильтрации' });
        }

        // Формируем запрос
        const query = `
            SELECT image_url, name, composition, usage 
            FROM clean_products 
            WHERE ${conditions.join(' OR ')}
        `;

        console.log('Сформированный запрос:', query);

        // Выполняем запрос к БД
        const result = await pool.query(query);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Товары не найдены для указанных условий' });
        }

        res.json(result.rows);
    } catch (error) {
        console.error('Ошибка при получении данных из БД:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});



// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});

