const express = require('express');
const Address = require('../models/address');
const Logs = require('../models/logs');

const router = new express.Router();

router.post('/address', async (req, res) => {
    try {
        const address = new Address(req.body);
        await address.save();

        const log = new Logs({
            description: `Se asigno una direccion a un cliente`,
        });
        await log.save();

        res.status(201).json({
            error: false,
            data: address,
        });
    } catch (error) {
        res.status(400).json({
            error: true,
            data: error.message,
        });
    }
});

router.patch('/address/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const addressReq = {
            description: req.body.description,
            city_id: req.body.city_id,
        };

        const addreesUpdated = await Address.update(addressReq, { id: id });

        const log = new Logs({
            description: `Se modifico una direccion a un cliente`,
        });
        await log.save();

        res.json({
            error: false,
            data: addreesUpdated,
        });
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.get('/address/customer/:customer_id', async (req, res) => {
    try {
        const { customer_id } = req.params;

        const address = await Address.collection().where({ customer_id: customer_id, status: true }).orderBy('description', 'ASC').fetchPage({
            withRelated: ['city.state'],
        });

        res.json({
            error: false,
            data: address,
        });
    } catch (error) {
        res.status(404).json({
            error: true,
            data: error.message,
        });
    }
});

router.get('/address/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const address = await Address.collection().where({ id: id, status: true }).fetchOne({
            withRelated: ['city.state']
        });

        res.json({
            error: false,
            data: address
        });
    } catch (error) {
        res.status(400).json({
            error: true,
            data: error.message,
        });
    }
});

router.delete('/address/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const address = await Address.update({ status: false }, { id: id });

        res.json({
            error: false,
            data: address,
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            data: error.message,
        });
    }
});

module.exports = router;