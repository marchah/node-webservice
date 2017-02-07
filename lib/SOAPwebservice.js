'use strict';

const _ = require('lodash');
const Promise = require('bluebird');
const soap = require('soap');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

/**
 * SOAP Webservice class
 */
class SOAPWebservice {
  /**
   * @param {Object} options Settings data
   */
  constructor(options) {
    this.settings = options || {};
  }

  /**
   * Build the request, execute it, parse the response/error and return the result
   * @param {Object} `Service` Service class to call
   * @param {Object} params Request query params
   * @return {Promise} Result of parsing
   */
  execute(Service, params) {
    return new Promise((resolve, reject) => {
      let service;
      try {
        service = new Service(this.settings);
      }
      catch (err) {
        return reject(err);
      }

      if (!params || !params.service) return reject(new Error('Service name missing'));

      return Promise
        .resolve(service.buildRequest(params))
        .then(() => {
          soap.createClient(service.getURL(), (err, client) => {
            if (err) return reject(err);

            const clientService = _.get(client, params.service);
            if (!clientService) return reject(new Error('Invalid Service'));

            clientService(service.getRequest(), (err, result) => {
              if (err) return reject(err);

              try {
                resolve(service.getResponse(result.result));
              }
              catch (err) {
                reject(service.getError(err));
              }
            });
          });
        }).catch(reject);
    });
  }
}

module.exports = SOAPWebservice;
