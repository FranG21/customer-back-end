const express = require('express');
const City = require('../models/city');

const router = new express.Router();

router.get('/city/:state_id', async (req, res) => {
    try {
        const { state_id } = req.params;

        const cities = await City.collection().where({ state_id }).orderBy('name', 'ASC').fetch();

        res.json({
            error: false,
            data: cities
        });
    } catch (error) {
        res.status(400).json({
            error: true,
            data: error.message,
        });
    }
});

module.exports = router;