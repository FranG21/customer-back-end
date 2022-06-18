const Joi = require('joi');
const bookshelf = require('../db/bookshelf');
bookshelf.plugin(require('bookshelf-modelbase').pluggable);
const City = require('./city');

const Address = bookshelf.model('Address', {
    tableName: 'address',
    hasTimestamps: true,
    city() {
        return this.belongsTo('City', 'city_id');
    },
});

module.exports = Address;