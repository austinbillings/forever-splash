const zaq = require('zaq').as('Mailer');
const Resource = require('./Resource');
const sgMail = require('@sendgrid/mail');

class Mailer {
  constructor (config = {}) {
    const { recipients, sendgridKey } = config;
    if (typeof sendgridKey !== 'string' || sendgridKey.length !== 69) {
      zaq.err('No Sengrid Key Provided. Key is required to send mail.');
      process.exit();
    }
    if (typeof recipients !== 'string' && !Array.isArray(recipients)) {
      zaq.err('No or Invalid Recipients Provided: Set `recipients` in your config file.');
      process.exit();
    }
    this.recipients = Array.isArray(recipients)
      ? recipients
      : recipients.indexOf(',') !== -1
        ? recipients.split(',')
        : [ recipients ];
    zaq.info('Mailer Initialized. Recipients:', recipients);
    this.sendMail = this.sendMail.bind(this);
    this.config = config;
    return this;
  }

  sendMail ({ to, from, html, text, subject = 'No Subject' } = {}) {
    return new Promise ((resolve, reject) => {
      const { sendgridKey, defaultFromAddress } = this.config;
      sgMail.setApiKey(sendgridKey);

      const email = {};
      if (typeof to === 'string' || Array.isArray(to)) email.to = to;
      else email.to = this.recipients;

      if (from) email.from = from;
      else if (defaultFromAddress) email.from = defaultFromAddress;
      else return reject('No Sender ("From") Address Given. Set `defaultFromAddress` in config, OR set `to` in method call.');

      if (html) email.html = html;
      if (text) email.text = text;
      if (subject) email.subject = subject;
      sgMail.send(email)
        .then(() => { resolve() })
        .catch(err => { reject(err) });
    });
  }
};

module.exports = Mailer;
