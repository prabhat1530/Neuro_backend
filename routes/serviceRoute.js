const express = require('express');
const { getServices, addService, updateService, deleteService } = require('../controllers/serviceController');
const router = express.Router();


router.get('/', getServices);


router.post('/', addService);


router.put('/:id', updateService);


router.delete('/:id', deleteService);

module.exports = router;
