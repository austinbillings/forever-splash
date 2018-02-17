const zaq = require('zaq');

const unimplemented = (method, ...loggables) => {
  const message = `[ ${method}() ] called without implementation.`;
  zaq.warn(message, ...loggables);
  return message;
}

module.exports = { unimplemented };
