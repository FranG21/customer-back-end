const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Token = require('../models/token');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded._id;

        const user = await User.findOne({ id: userId }, { require: false });

        const isExistToken = await Token.findOne(
            { token, user_id: userId },
            { require: false }
        );

        if (!isExistToken) {
            throw new Error();
        }

        req.user = user;
        req.token = token;

        next();
    } catch (e) {
        res.status(401).send({ error: 'Por favor autenticarse' });
    }
};

module.exports = auth;
