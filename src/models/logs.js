const Joi = require('joi');
const bookshelf = require('../db/bookshelf');
bookshelf.plugin(require('bookshelf-modelbase').pluggable);

const Logs = bookshelf.model('Logs', {
    tableName: 'logs',
    hasTimestamps: true,
});

module.exports = Logs;