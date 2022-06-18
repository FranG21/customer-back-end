const express = require('express');
const State = require('../models/state');

const router = new express.Router();

router.get('/state', async (req, res) => {
    try {
        const states = await State.collection().fetch();

        res.json({
            error: false,
            data: states
        });
    } catch (error) {
        res.status(400).json({
            error: true,
            data: error.message,
        });
    }
});

module.exports = router;