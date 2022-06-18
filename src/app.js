
const express = require('express');
const customerController = require('./controllers/customer_controller');
const addressController = require('./controllers/address_controller');
const stateController = require('./controllers/state_controller');
const cityController = require('./controllers/city_controller');
const logsController = require('./controllers/logs_controller');
const userController = require('./controllers/user_controller');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', customerController);
app.use('/api', addressController);
app.use('/api', stateController);
app.use('/api', cityController);
app.use('/api', logsController);
app.use('/api', userController);

module.exports = app;