const db = require('../config/db');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');


// REGISTER
exports.register = async (req, res) => {

    try {

        const {
            name,
            email,
            password
        } = req.body;

        if (!name || !email || !password) {

            return res.status(400).json({
                message: 'Missing fields'
            });
        }

        // check email
        const checkSql = 'SELECT * FROM users WHERE email = ?';

        db.query(checkSql, [email], async (err, results) => {

            if (results.length > 0) {

                return res.status(400).json({
                    message: 'Email already exists'
                });
            }

            // hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            const sql = `
                INSERT INTO users
                (name, email, password)
                VALUES (?, ?, ?)
            `;

            db.query(
                sql,
                [
                    name,
                    email,
                    hashedPassword
                ],
                (err, result) => {

                    if (err) {

                        console.log(err);

                        return res.status(500).json({
                            message: 'Register failed'
                        });
                    }

                    res.json({
                        message: 'Register success'
                    });
                }
            );

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: 'Server error'
        });
    }
};


// LOGIN
exports.login = (req, res) => {

    const {
        email,
        password
    } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';

    db.query(sql, [email], async (err, results) => {

        if (results.length === 0) {

            return res.status(400).json({
                message: 'Email not found'
            });
        }

        const user = results[0];

        // compare password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {

            return res.status(400).json({
                message: 'Wrong password'
            });
        }

        // create token
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '7d'
            }
        );

        res.json({
            message: 'Login success',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    });
};
exports.getMe = (req, res) => {

    res.json({
        user: req.user
    });
};