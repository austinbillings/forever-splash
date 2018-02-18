const zaq = require('zaq').as('forever-splash');
const cors = require('cors');
const express = require('express');

const prodMode = process.env.NODE_ENV === 'production';
if (prodMode) zaq.flag('Running in PRODUCTION mode.');

const app = express();
const config = require('./config');
const { origin, port } = config;
const corsOptions = { origin, credentials: true };

function loadService (serviceName) {
  return require(`./services/${serviceName}Service`)(config);
};

const QuoteService = loadService('Quote');
const ReservationService = loadService('Reservation');

app.disable('x-powered-by');
app.use(cors(corsOptions));
app.use('/quote', QuoteService.mount());
app.use('/reservation', ReservationService.mount());
app.listen(port);
zaq.win(`Services listening on port: ${port}`);
