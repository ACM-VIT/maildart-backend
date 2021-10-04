const express = require('express');

/** load middlewares */
const cors = require('cors');
const { HttpExceptionTransformer } = require('http-exception-transformer');

/** load services */
const { initializeMongoDB } = require('./services/database');
const routes = require('./routes/index.routes');

/** declare application and load middleware */
const app = express();
app.use(cors());

/** initialize services */
initializeMongoDB();

/** show alive status on server root */
app.get('/', (req, res) => {
  res.json({ alive: true });
});

app.use(routes);

/** transform all errors into standard messages */
app.use(HttpExceptionTransformer);

/** export application to be served or tested */
module.exports = { app };
