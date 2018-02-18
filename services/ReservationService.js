const ReservationMailer = require('./app/ReservationMailer');

module.exports = (config) => {
  return new ReservationMailer(config);
};
