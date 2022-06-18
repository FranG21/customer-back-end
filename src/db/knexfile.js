require('dotenv').config();
// Update with your config settings.
//console.log('name:', process.env.HOST);

module.exports = {

    development: {
        client: 'pg',
        connection: {
            host: '127.0.0.1',
            user: 'postgres',
            password: 'root',
            database: 'customers_challenge'
        }
    },

};