const db = require('../config/db');

// GET all tours
exports.getTours = (req, res) => {
    const sql = 'SELECT * FROM tours ORDER BY id DESC';

    db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.json(results);
    });
};

// GET tour by ID
exports.getTourById = (req, res) => {
    const { id } = req.params;

    const sql = 'SELECT * FROM tours WHERE id = ?';

    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Tour not found' });
        }

        res.json(results[0]);
    });
};

// CREATE tour
exports.createTour = (req, res) => {
    const {
        title,
        subtitle,
        description,
        country,
        price,
        image,
        date
    } = req.body;

    const sql = `
        INSERT INTO tours
        (title, subtitle, description, country, price, image, date)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [title, subtitle, description, country, price, image, date],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: 'Create failed' });
            }

            res.json({
                message: 'Tour created',
                id: result.insertId
            });
        }
    );
};

// UPDATE tour
exports.updateTour = (req, res) => {
    const { id } = req.params;

    const {
        title,
        subtitle,
        description,
        country,
        price,
        image,
        date
    } = req.body;

    const sql = `
        UPDATE tours
        SET
            title = ?,
            subtitle = ?,
            description = ?,
            country = ?,
            price = ?,
            image = ?,
            date = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [title, subtitle, description, country, price, image, date, id],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: 'Update failed' });
            }

            res.json({ message: 'Tour updated' });
        }
    );
};

// DELETE tour
exports.deleteTour = (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM tours WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Delete failed' });
        }

        res.json({ message: 'Tour deleted' });
    });
};