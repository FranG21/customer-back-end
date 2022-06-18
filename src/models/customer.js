const Joi = require('joi');
const bookshelf = require('../db/bookshelf');
bookshelf.plugin(require('bookshelf-modelbase').pluggable);
const Logs = require('./logs');

const Customer = bookshelf.model('Customer', {
    tableName: 'customer',
    hasTimestamps: true,
});

module.exports = Customer;