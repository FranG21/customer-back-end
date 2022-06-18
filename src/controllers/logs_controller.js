const express = require('express');
const Logs = require('../models/logs');

const router = new express.Router();

router.get('/logs', async (req, res) => {
    try {

        const logs = await Logs.collection().fetch();

        res.json({
            error: false,
            data: logs,
        });
    } catch (error) {
        res.status(400).json({
            error: true,
            data: error.message,
        });
    }
});

module.exports = router;