const db = require('../config/db');


// CREATE BOOKING
exports.createBooking = (req, res) => {

    const userId = req.user.id;

    const {
        tour_id,
        full_name,
        phone,
        people_count,
        note
    } = req.body;

    const sql = `
        INSERT INTO bookings
        (
            user_id,
            tour_id,
            full_name,
            phone,
            people_count,
            note
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            userId,
            tour_id,
            full_name,
            phone,
            people_count,
            note
        ],
        (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    message: 'Booking failed'
                });
            }

            res.json({
                message: 'Booking success'
            });
        }
    );
};


// GET MY BOOKINGS
exports.getMyBookings = (req, res) => {

    const userId = req.user.id;

    const sql = `
        SELECT
            bookings.*,
            tours.title,
            tours.image,
            tours.price

        FROM bookings

        JOIN tours
        ON bookings.tour_id = tours.id

        WHERE bookings.user_id = ?

        ORDER BY bookings.id DESC
    `;

    db.query(sql, [userId], (err, results) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                message: 'Database error'
            });
        }

        res.json(results);
    });
};
// ADMIN GET ALL BOOKINGS
exports.getAllBookings = (req, res) => {

    const sql = `
        SELECT
            bookings.*,
            users.name AS user_name,
            tours.title,
            tours.image,
            tours.price

        FROM bookings

        JOIN users
        ON bookings.user_id = users.id

        JOIN tours
        ON bookings.tour_id = tours.id

        ORDER BY bookings.id DESC
    `;

    db.query(sql, (err, results) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                message: 'Database error'
            });
        }

        res.json(results);
    });
};