const express = require('express');
const Customer = require('../models/customer');
const Logs = require('../models/logs');

//const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/customer', async (req, res) => {
    try {
        const customer = new Customer(req.body);
        await customer.save();

        const log = new Logs({
            description: `Se registro un nuevo cliente: ${req.body.first_name}`,
        });
        await log.save();

        res.status(201).json({
            error: false,
            data: customer,
        });
    } catch (error) {
        res.status(400).json({
            error: true,
            data: error.message,
        });
    }
});

router.patch('/customer/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const customerReq = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            birthday_date: req.body.birthday_date,
            phone_number: req.body.phone_number,
        };

        const customerUpdated = await Customer.update(customerReq, { id: id });

        const log = new Logs({
            description: `Se edito  un el cliente: ${req.body.first_name}`,
        });
        await log.save();

        res.json({
            error: false,
            data: customerUpdated,
        });
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.get('/customer/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await Customer.collection().where({ id: id, status: true }).fetchOne();

        res.json({
            error: false,
            data: customer,
        });
    } catch (error) {
        res.status(404).json({
            error: true,
            data: error.message,
        });
    }
});

router.get('/customer', async (req, res) => {
    try {
        const customers = await Customer.collection().where({ status: true }).orderBy('first_name', 'ASC').fetch();

        res.json({
            error: false,
            data: customers,

        });
    } catch (error) {
        res.status(400).json({
            error: true,
            data: error.message,
        });
    }
});

router.delete('/customer/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const customer = await Customer.update({ status: false }, { id: id });

        res.json({
            error: false,
            data: customer,
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            data: error.message,
        });
    }
});

module.exports = router;