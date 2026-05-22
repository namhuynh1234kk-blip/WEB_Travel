require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

// ROUTES
const tourRoutes = require('./routes/tourRoutes');
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());

// ===== API ROUTES =====
app.use('/api/tours', tourRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);

// ===== HOME =====
app.get('/', (req, res) => {
    res.send('TTC Travel Backend Running 🚀');
});

// ===== START SERVER =====
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});