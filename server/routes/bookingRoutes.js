const express = require('express');

const router = express.Router();
const {
    isAdmin
} = require('../middleware/authMiddleware');
const {
    createBooking,
    getMyBookings,
    getAllBookings
} = require('../controllers/bookingController');

const {
    verifyToken
} = require('../middleware/authMiddleware');


// CREATE BOOKING
router.post(
    '/',
    verifyToken,
    createBooking
);


// GET MY BOOKINGS
router.get(
    '/my',
    verifyToken,
    getMyBookings
);
router.get(
    '/',
    verifyToken,
    isAdmin,
    getAllBookings
);
module.exports = router;