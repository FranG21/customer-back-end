const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const bookshelf = require('../db/bookshelf');
const Customer = require('./customer');
const Token = require('./token');
bookshelf.plugin(require('bookshelf-modelbase').pluggable);

const User = bookshelf.model(
    'User',
    {
        tableName: 'user',
        hasTimestamps: true,
        hidden: ['password'],
        customer() {
            return this.belongsTo('Customer', 'customer_id');
        },
        tokens() {
            return this.hasMany('Token', 'user_id');
        },
        initialize() {
            this.on('creating', async (model) => {
                const email = model.get('email');
                const exist = await User.findOne({ email }, { require: false });

                if (exist) {
                    throw new Error('Ya existe un usuario con esta direccion de correo');
                } else if (!validator.isEmail(email)) {
                    throw new Error('Correo invalido');
                }

                model.set('status', true);
                model.set('password', await bcrypt.hash(model.get('password'), 8));
            });

            this.on('updating', async (model, attributes) => {
                this.set(attributes);
                if (this.hasChanged('email')) {
                    const isEmailExists = await User.findOne(
                        { email: model.get('email') },
                        { require: false }
                    );

                    if (isEmailExists) {
                        throw new Error('Correo electronico ya esta registrado!');
                    } else if (!validator.isEmail(model.get('email'))) {
                        throw new Error('Correo invalido');
                    }
                }
                if (this.hasChanged('password')) {
                    this.set('password', await bcrypt.hash(this.get('password'), 8));
                }
            });
        },
    },
    {
        generarAuthToken: async (id) => {
            const user = await User.findOne({ id }, { require: false });

            const token = jwt.sign({ _id: user.get('id') }, process.env.JWT_SECRET, {
                expiresIn: '7 days',
            });

            const userToken = new Token({
                token,
                user_id: user.get('id'),
            });

            await userToken.save();
            return token;
        },
        validarCampos: async (user, id) => {
            const existe = await User.findOne(
                { correo: user.email },
                { require: false }
            );

            if (existe && id !== existe.get('id')) {
                throw new Error('Ya existe un usuario con esta direccion de correo');
            } else if (!validator.isEmail(user.email)) {
                throw new Error('Correo invalido');
            }
        },
        login: async (email, password) => {
            const user = await User.findOne({ email }, { require: false });

            if (!user) {
                throw new Error('Datos incorrectos');
            }

            const isMatch = await bcrypt.compare(password, user.get('password'));
            if (!isMatch) {
                throw new Error('Datos incorrectos!');
            }

            return user;
        },
        existeUsuario: async (correo, clave) => {
            const existe = await User.findOne({ correo }, { require: false });

            if (!existe) {
                const usuario = new User({
                    correo,
                    clave,
                });
                return await usuario.save();
            }

            return existe;
        },
    }
);

module.exports = User;
