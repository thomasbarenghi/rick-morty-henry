const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('../routes/index');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', routes);

module.exports = app;
