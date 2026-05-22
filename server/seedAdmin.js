require('dotenv').config();

const bcrypt = require('bcrypt');

const db = require('./config/db');

async function seedAdmin() {

    const hashedPassword = await bcrypt.hash(
        '123456',
        10
    );

    const sql = `
        INSERT INTO users
        (
            name,
            email,
            password,
            role
        )
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            'Super Admin',
            'admin@gmail.com',
            hashedPassword,
            'admin'
        ],
        (err, result) => {

            if (err) {

                console.log(err);

                return;
            }

            console.log('Admin created');

            process.exit();
        }
    );
}

seedAdmin();