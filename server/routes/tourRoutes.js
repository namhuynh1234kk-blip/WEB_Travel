const express = require('express');

const router = express.Router();

const {
    getTours,
    getTourById,
    createTour,
    deleteTour,
    updateTour
} = require('../controllers/tourController');

const {
    verifyToken,
    isAdmin
} = require('../middleware/authMiddleware');

// GET all tours
router.get('/', getTours);

// GET tour by id
router.get('/:id', getTourById);

// CREATE tour (admin only)
router.post(
    '/',
    verifyToken,
    isAdmin,
    createTour
);

// UPDATE tour (admin only)
router.put(
    '/:id',
    verifyToken,
    isAdmin,
    updateTour
);

// DELETE tour (admin only)
router.delete(
    '/:id',
    verifyToken,
    isAdmin,
    deleteTour
);

module.exports = router;