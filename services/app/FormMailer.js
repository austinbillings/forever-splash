const Mailer = require('./Mailer');
const Resource = require('./Resource');
const zaq = require('zaq').as('FormMailer');
const Trolley = require('trolley')();

class FormMailer extends Resource {
  constructor (config) {
    super(config);
    this.config = config;
    this.mailer = new Mailer(config);
    this.handlePost = this.handlePost.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
    this.getMessageContent = this.getMessageContent.bind(this);
    return this;
  }

  isFormValid (request) {
    zaq.warn('No isFormValid overridden: assuming form is invalid.');
    return false;
  }

  getMessageContent (request) {
    zaq.warn('No getMessageContent overridden: using default message.');
    return {
      text: 'Example Message',
      subject: 'Example Message',
      html: `
        <div style="max-width: 500px;">
          <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
          <h2>Fusce vel ullamcorper lectus.</h2>
          <p>Fusce sollicitudin diam quis risus congue, vitae dapibus ante molestie. Praesent porttitor purus et augue faucibus laoreet. </p>
        </div>`
    };
  }

  handlePost (req, res) {
    if (!this.isFormValid(req, res)) {
      zaq.warn('Invalid form submitted.', req.body);
      return res.headersSent
        ? null
        : Trolley.crash(res, { message: 'Invalid form submission.', code: 400 });
    }

    const messageContent = this.getMessageContent(req);
    if (!messageContent || typeof messageContent !== 'object') {
      zaq.warn('Error building message.', messageContent);
      return Trolley.crash(res, { message: 'Error building message.', code: 500 });
    }

    this.mailer.sendMail(messageContent)
      .then(() => zaq.win('Sent Mail:', messageContent) || Trolley.deliver(res, { sent: true }))
      .catch(err => zaq.err('Failed To send Message', err) || Trolley.crash(res, { message: err.message }));
  }
};

module.exports = FormMailer;
