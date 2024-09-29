const db = require('../models/db');


exports.getServices = (req, res) => {
    const sql = 'SELECT * FROM services';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send('Error fetching services');
        res.status(200).json(results);
    });
};


exports.addService = (req, res) => {
    const { name, description, price } = req.body;
    const sql = `INSERT INTO services (name, description, price) VALUES (?, ?, ?)`;

    db.query(sql, [name, description, price], (err, result) => {
        if (err) return res.status(500).send('Error adding service');
        res.status(201).send('Service added successfully');
    });
};


exports.updateService = (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;

    const sql = `UPDATE services SET name = ?, description = ?, price = ? WHERE id = ?`;
    db.query(sql, [name, description, price, id], (err, result) => {
        if (err) return res.status(500).send('Error updating service');
        res.status(200).send('Service updated successfully');
    });
};


exports.deleteService = (req, res) => {
    const { id } = req.params;

    const sql = `DELETE FROM services WHERE id = ?`;
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send('Error deleting service');
        res.status(200).send('Service deleted successfully');
    });
};
