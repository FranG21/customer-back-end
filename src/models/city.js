const Joi = require('joi');
const bookshelf = require('../db/bookshelf');
bookshelf.plugin(require('bookshelf-modelbase').pluggable);
const Address = require('./address');

const City = bookshelf.model('City', {
    tableName: 'city',
    hasTimestamps: false,
    address() {
        return this.belongsTo('Address', 'city_id');
    },
    state() {
        return this.belongsTo('State', 'state_id');
    }
});

module.exports = City;