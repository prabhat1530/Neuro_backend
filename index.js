const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require("./routes/authRoutes")
const serviceRoutes = require('./routes/serviceRoute');
const bookingRoutes = require('./routes/bookingRoutes');



dotenv.config();

const app = express();
app.use(express.json());


app.use('/auth', authRoutes);
app.use('/services', serviceRoutes);
app.use('/bookings', bookingRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
