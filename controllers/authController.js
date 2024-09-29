const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/db');


exports.signup = async (req, res) => {
    const { username, email, password } = req.body;

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
    db.query(sql, [username, email, hashedPassword], (err, result) => {
        if (err) return res.status(500).send('Error registering user');
        res.status(201).send('User registered successfully');
    });
};


exports.login = (req, res) => {
    const { email, password } = req.body;

    const sql = `SELECT * FROM users WHERE email = ?`;
    db.query(sql, [email], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).send('User not found');
        }

       
        const isMatch = await bcrypt.compare(password, results[0].password);
        if (!isMatch) return res.status(401).send('Invalid credentials');

     
        const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    });
};
