const db = require('../models/db'); 

exports.createBooking = (req, res) => {
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
};

exports.getAllBookings = (req, res) => {
    const selectQuery = 'SELECT * FROM bookings';

    db.query(selectQuery, (err, results) => {
        if (err) {
            console.error('Error fetching bookings:', err);
            return res.status(500).json({ message: 'Error fetching bookings' });
        }
        res.status(200).json(results);
    });
};


exports.getBookingById = (req, res) => {
    const { id } = req.params; 

    const selectQuery = 'SELECT * FROM bookings WHERE booking_id = ?';
    
    db.query(selectQuery, [id], (err, results) => {
        if (err) {
            console.error('Error fetching booking:', err);
            return res.status(500).json({ message: 'Error fetching booking' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(results[0]);
    });
};

// Function to update a booking (optional)
exports.updateBooking = (req, res) => {
    const { id } = req.params;
    const { service_id, user_id, booking_date, payment_status, total_price } = req.body;

    const updateQuery = 'UPDATE bookings SET service_id = ?, user_id = ?, booking_date = ?, payment_status = ?, total_price = ? WHERE booking_id = ?';

    db.query(updateQuery, [service_id, user_id, booking_date, payment_status, total_price, id], (err, results) => {
        if (err) {
            console.error('Error updating booking:', err);
            return res.status(500).json({ message: 'Error updating booking' });
        }
        res.status(200).json({ message: 'Booking updated successfully' });
    });
};


exports.deleteBooking = (req, res) => {
    const { id } = req.params;

    const deleteQuery = 'DELETE FROM bookings WHERE booking_id = ?';

    db.query(deleteQuery, [id], (err, results) => {
        if (err) {
            console.error('Error deleting booking:', err);
            return res.status(500).json({ message: 'Error deleting booking' });
        }
        res.status(200).json({ message: 'Booking deleted successfully' });
    });
};
