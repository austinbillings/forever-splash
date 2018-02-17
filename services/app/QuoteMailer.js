const zaq = require('zaq').as('QuoteMailer');
const Trolley = require('trolley')();
const FormMailer = require('./FormMailer');
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

class QuoteMailer extends FormMailer {
  constructor (config) {
    super(config);
  }

  isFormValid (request, res) {
    zaq.info("Got request body:", request.body);
    const { body } = request;
    const { date, name, phone, email } = body;
    if (![ date, name, phone, email ].every(prop => typeof prop === 'string'))
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
    const { name, date, phone, email } = request.body;
    return {
      subject: (siteName ? `${siteName} ` : '') + 'Quote Request',
      replyTo: email,
      text: `
        Name: ${name}
        Date: ${date}
        Phone: ${phone}
        Email: ${email}
      `,
      html: `
        <h2>Quote / Reservation Request</h2>
        <ul>
          <li><b>Name</b>: ${name}</li>
          <li><b>Date</b>: ${date}</li>
          <li><b>Phone</b>: ${phone}</li>
          <li><b>Email</b>: ${email}</li>
        </ul>
      `
    };
  }
};

module.exports = QuoteMailer;
