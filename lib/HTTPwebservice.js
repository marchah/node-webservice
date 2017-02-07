'use strict';

const Promise = require('bluebird');
const _ = require('lodash');

const request = Promise.promisify(require('request'));

/**
 * HTTP Webservice class
 */
class HTTPWebservice {
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
    let service;
    try {
      service = new Service(this.settings);
    }
    catch (err) {
      return Promise.reject(err);
    }
    return Promise
      .resolve(service.buildRequest(params))
      .then(() => {
        const options = _.assign({
          rejectUnauthorized: false,
          url: service.getURL(),
        }, service.getRequest());

        return request(options)
          .catch((err) => {
            throw service.getError(err);
          })
          .then((res) => {
            return Promise
              .resolve(service.getResponse(res.body));
          });
      });
  }
}

module.exports = HTTPWebservice;
