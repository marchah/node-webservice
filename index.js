'use strict';

const SOAPWebservice = require('./lib/SOAPwebservice.js');
const HTTPWebservice = require('./lib/HTTPwebservice.js');

module.exports = {
  SOAP: SOAPWebservice,
  HTTP: HTTPWebservice,
};
