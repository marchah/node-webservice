# node-webservice

Webservice helper for api requests

## Installation

Install via [npm](https://www.npmjs.com/):

```
$ npm install node-webservice
```

## Documentation

## SOAP

### Usage

```javascript
const Webservice = require('node-webservice').SOAP;

const webservice = new Webservice(options<Object>);

webservice.execute(Service<Class>, params<Object>) => Promise;
```

#### Constructor
`options` object will be pass as argument for `Service` constructor

#### execute
- `Service`: see below for explaination
- `params`: object will be pass as argument for `Service` method `buildRequest` (require `service` key containing client path in soap object)


## HTTP

### Usage

```javascript
const Webservice = require('node-webservice').HTTP;

const webservice = new Webservice(options<Object>);

webservice.execute(Service<Class>, params<Object>) => Promise;
```

#### Constructor
`options` object will be pass as argument for `Service` constructor

#### execute
- `Service`: see below for explaination
- `params`: object will be pass as argument for `Service` method `buildRequest`


## Service Class
First argument for webservice `execute` function

### Skeleton

```javascript
/**
 * Ocean schedule template
 *
 * @type {Object}
 */
const template = {
  schedules: {
    path: 'ns2:RequestServiceSchedulesResponse.Transactions.Transaction.Details.ServiceSchedule',
    nested: {
      carrier: {
        path: 'CarrierID.$t',
        formatting: getCarrier,
      },
      departure_port: {
        path: 'Origin.Code',
        formatting: getPort,
      },
      arrival_port: {
        path: 'Destination.Code',
        formatting: getPort,
      },
      departure_at: {
        path: 'Origin.Departs.$t',
      },
      arrival_at: {
        path: 'Destination.Arrives.$t',
      },
      vessel: {
        path: 'Vessel',
      },
      voyage: {
        path: 'VoyageNumber',
      },
    },
  },
};

class MyService {

  /**
   * Initialize the operation
   *
   * @param {Object} options
   */
  constructor(options) {
    // do your stuff
  }

  /**
   * Build the JSON request
   *
   * @param {Object} params Request query params
   * @return {Promise/undefined}
   */
  buildRequest(params) {
    // do your stuff
  }

  /**
   * Get the JSON request
   *
   * @return {Object} JSON request
   */
  getRequest() {
    // do your stuff
  }


  /**
   * Parse webservice response
   *
   * @param {String} response XML response from the webservice
   * @return {???} your parse response
   */
  getResponse(response) {
    // do your stuff
  }

  /**
   * Parse webservice error
   *
   * @param  {Object} error
   * @return {???} your parse error
   */
  getError(error) {
    // do your stuff
  }

  /**
   * Return service URL
   *
   * @return {String} URL
   */
  getURL() {
    return 'https://google.com';
  }
}
```

## Examples

See [examples](https://github.com/marchah/node-webservice/tree/master/example)

## Contributing

This project is a work in progress and subject to API changes, please feel free to contribute
