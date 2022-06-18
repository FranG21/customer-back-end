const Joi = require('joi');
const bookshelf = require('../db/bookshelf');
bookshelf.plugin(require('bookshelf-modelbase').pluggable);

const State = bookshelf.model('State', {
    tableName: 'state',
    hasTimestamps: false,
    city() {
        return this.hasMany('City');
    },
});

module.exports = State;
