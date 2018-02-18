const zaq = require('zaq').as('ReservationMailer');
const Trolley = require('trolley')();
const FormMailer = require('./FormMailer');
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

class ReservationMailer extends FormMailer {
  constructor (config) {
    super(config);
  }

  isFormValid (request, res) {
    zaq.info("Got request body:", request.body);
    const { body } = request;
    const { name, address, hours, date, phone, email, graphics } = body;
    if (![ date, name, phone, email, address, hours, graphics ].every(prop => typeof prop === 'string'))
      return false;
    if (!emailPattern.test(email)) {
      zaq.warn('Invalid email provided.');
      Trolley.crash(res, { message: 'Invalid Email Provided.' });
      return false;
    }
    return true;
  }

  getMessageContent (request) {
    const { siteName } = this.config;
    const { name, date, phone, email, hours, address, graphics } = request.body;
    return {
      subject: (siteName ? `${siteName} ` : '') + 'Reservation Submission',
      replyTo: email,
      text: `
        Name: ${name}
        Phone: ${phone}
        Email: ${email}
        Duration: ${hours}
        Event Date: ${date}
        Event Address: ${address}
        Title & Date for Graphics: ${graphics}
      `,
      html: `
        <h2>Reservation Submission</h2>
        <ul>
          <li><b>Name</b>: ${name}</li>
          <li><b>Phone</b>: ${phone}</li>
          <li><b>Email</b>: ${email}</li>
          <li><b>Duration</b>: ${hours}</li>
          <li><b>Event Date</b>: ${date}</li>
          <li><b>Event Address</b>: ${address}</li>
          <li><b>Title & Date for Graphics</b>: ${graphics}</li>
        </ul>
      `
    };
  }
};

module.exports = ReservationMailer;
