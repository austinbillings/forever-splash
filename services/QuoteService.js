const QuoteMailer = require('./app/QuoteMailer');

module.exports = (config) => {
  return new QuoteMailer(config);
};
