const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./user');
const bookshelf = require('../db/bookshelf');
bookshelf.plugin(require('bookshelf-modelbase').pluggable);

const Token = bookshelf.model('Token', {
    tableName: 'token',
    hasTimestamps: false
}, {
    findByCredentials: async (email, password) => {
        const user = JSON.parse(JSON.stringify(await User.findOne({ email }, { require: false })));

        if (!user) {
            throw new Error('No existe ningun usuario con este correo');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error('Verifique su correo y contraseña');
        }

        return user;
    },
    generarAuthToken: async (user) => {

        const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET);
        const tokens = new Token({ token, user_id: user.id });


        await tokens.save();
        return tokens;
    }

})

module.exports = Token;