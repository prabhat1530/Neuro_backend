const express = require('express');
const router = express.Router();
const db = require('../models/db'); 

router.post('/', (req, res) => {
    const { service_id, user_id, booking_date, payment_status, total_price } = req.body;

    if (!service_id || !user_id || !booking_date || !total_price) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const insertQuery = 'INSERT INTO bookings (service_id, user_id, booking_date, payment_status, total_price) VALUES (?, ?, ?, ?, ?)';
    
    db.query(insertQuery, [service_id, user_id, booking_date, payment_status || 'pending', total_price], (err, results) => {
        if (err) {
            console.error('Error inserting booking:', err);
            return res.status(500).json({ message: 'Error adding booking' });
        }
        res.status(201).json({ message: 'Booking created successfully', booking_id: results.insertId });
    });
});

module.exports = router;
