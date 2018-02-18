const prodMode = process.env.NODE_ENV === 'production';

module.exports = {
  origin: prodMode
    ? 'http://foreverphotobooths.us'
    : 'http://localhost:1235',
  port: 4331,
  siteName: 'Forever Photo Booths',
  recipients: 'austin@austinbillings.com',
  sendgridKey: process.env.ForeverSendgridKey,
  defaultFromAddress: 'no-reply@foreverphotobooths.us'
};
