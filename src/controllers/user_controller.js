const express = require('express');
const User = require('../models/user');
const Customer = require('../models/customer');
const Token = require('../models/token');
const auth = require('../middlewares/auth');

const router = new express.Router();

router.post('/users/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.login(email, password);
        const token = await User.generarAuthToken(user.get('id'));

        res.status(201).json({
            error: false,
            data: { user, token },
        });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.delete('/users/logout', auth, async (req, res) => {
    try {
        const { token, user } = req;

        const tokenUser = await Token.findOne(
            { token, user_id: user.id },
            { require: false }
        );

        await tokenUser.destroy();

        res.status(200).json({
            error: false,
            data: { tokenUser },
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);

        await user.save();

        const token = await User.generarAuthToken(user.get('id'));

        res.status(201).json({
            error: false,
            data: { user, token },
        });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

router.get('/users', auth, async (req, res) => {
    try {
        const { limit, skip, column, order = 'ASC' } = req.query;

        const pageSize = limit ? parseInt(limit) : 10;
        const page = skip ? parseInt(skip) : 1;

        const validColumns = ['id', 'email', 'status'];
        const isValidColumn = validColumns.includes(column);

        let field = 'email';

        if (isValidColumn) field = column;

        const users = await new User().orderBy(field, order).fetchPage({
            pageSize,
            page,
        });

        res.status(200).json({
            error: false,
            data: {
                users,
                pagination: users.pagination,
            },
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/users/me', auth, async (req, res) => {
    try {
        const { user } = req;

        const info = await await Customer.findOne(
            { id: user.get('customer_id') },
            { require: false }
        );

        res.status(200).json({
            error: false,
            data: { user, info },
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.get('/users/:id', auth, async (req, res) => {
    try {
        const user = await User.findOne({ id: req.params.id }, { require: false });

        res.status(200).json({
            error: false,
            data: { user },
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.patch('/users/me', auth, async (req, res) => {
    try {
        const { user, body } = req;

        const updates = Object.keys(body);
        const allowedUpdates = ['email', 'password'];
        const isvalidOperation = updates.every((update) =>
            allowedUpdates.includes(update)
        );

        if (!isvalidOperation) {
            return res.status(400).send({ error: 'actualizaciones invalidas!' });
        }

        updates.forEach((update) => user.set(update, body[update]));

        await user.save();

        res.status(200).json({
            error: false,
            data: { user },
        });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

module.exports = router;
