'use strict';

const _ = require('lodash');
const rewire = require('rewire');
const expect = require('chai').expect;

const soap = require('soap');

const SOAPwebservice = rewire('../../lib/SOAPwebservice.js');

const operations = require('./operations');

describe('SOAPwebservice ->', () => {
  it('should be a function', () => {
    expect(SOAPwebservice).to.be.a('function');
  });

  describe('constructor #', () => {
    it('should create SOAPwebservice and set settings as empty object', () => {
      const obj = new SOAPwebservice();

      expect(obj).to.eql({
        settings: { },
      });
    });

    it('should create SOAPwebservice and set settings', () => {
      const obj = new SOAPwebservice({ param1: 'param1', object: { param2: 'param2' }});

      expect(obj).to.eql({
        settings: {
          param1: 'param1',
          object: { param2: 'param2' },
        },
      });
    });
  });

  describe('execute #', () => {
    it('should reject error when new Operation throw error', (next) => {
      const obj = new SOAPwebservice();

      sandbox.spy(operations.OperationError1, 'constructor');

      obj.execute(operations.OperationError1)
        .then(() => {
          next('Not supposed to happend');
        })
        .catch((err) => {
          expect(err).to.be.an.instanceOf(Error);
          expect(err.message).to.eql('OperationError constructor');

          expect(operations.OperationError1.constructor).to.be.calledOnce;
          next();
        });
    });

    it('should throw error new `params` is missing', (next) => {
      const obj = new SOAPwebservice({ param: 'my options' });

      sandbox.spy(operations.Operation1, 'constructor');

      obj.execute(operations.Operation1)
        .then(() => {
          next('Not supposed to happend');
        }).catch((err) => {
          expect(err).to.be.an.instanceOf(Error);
          expect(err.message).to.eql('Service name missing');

          expect(operations.Operation1.constructor).to.be.calledOnce;
          next();
        });
    });

    it('should throw error new `params.service` is missing', (next) => {
      const obj = new SOAPwebservice({ param: 'my options' });

      sandbox.spy(operations.Operation1, 'constructor');

      obj.execute(operations.Operation1)
        .then(() => {
          next('Not supposed to happend');
        }).catch((err) => {
          expect(err).to.be.an.instanceOf(Error);
          expect(err.message).to.eql('Service name missing');

          expect(operations.Operation1.constructor).to.be.calledOnce;
          next();
        });
    });

    it('should process `Operation3`', (next) => {
      const obj = new SOAPwebservice({ param: 'my options' });

      sandbox.spy(operations.Operation3, 'constructor');

      sandbox.stub(soap);
      soap.createClient.callsArgWith(1, null, {
        my: {
          service: {
            path: (request, callback) => {
              return request
                .then((req) => {
                  expect(req).to.eql('REQUEST');
                  callback(null, { result: ['RESULT'] });
                });
            },
          },
        },
      });

      obj.execute(operations.Operation3, { service: 'my.service.path' })
        .then((res) => {
          expect(res).to.eql('RESULT');

          expect(operations.Operation3.constructor).to.be.calledOnce;
          expect(soap.createClient).to.be.calledOnce;
          next();
        }).catch(next);
    });

    it('should process `Operation4`', (next) => {
      const obj = new SOAPwebservice({ param: 'my options' });

      sandbox.spy(operations.Operation4, 'constructor');

      sandbox.stub(soap);
      soap.createClient.callsArgWith(1, null, {
        my: {
          service: {
            path: (request, callback) => {
              expect(request).to.eql('REQUEST');
              callback(null, { result: ['RESULT'] });
            },
          },
        },
      });

      obj.execute(operations.Operation4, { service: 'my.service.path' })
        .then((res) => {
          expect(res).to.eql('RESULT');

          expect(operations.Operation4.constructor).to.be.calledOnce;
          expect(soap.createClient).to.be.calledOnce;
          next();
        }).catch(next);
    });

    it('should reject `soap.createClient` error', (next) => {
      const obj = new SOAPwebservice({ param: 'my options' });

      sandbox.spy(operations.Operation3, 'constructor');

      sandbox.stub(soap);
      soap.createClient.callsArgWith(1, new Error('createClient error'));

      obj.execute(operations.Operation3, { service: 'my.service.path' })
        .then(() => {
          next('Not supposed to happend');
        }).catch((err) => {
          expect(err).to.be.an.instanceOf(Error);
          expect(err.message).to.eql('createClient error');
          expect(operations.Operation3.constructor).to.be.calledOnce;
          next();
        });
    });

    it('should reject invalid service', (next) => {
      const obj = new SOAPwebservice({ param: 'my options' });

      sandbox.spy(operations.Operation3, 'constructor');

      sandbox.stub(soap);
      soap.createClient.callsArgWith(1, null, {
        my: {
          service: {
            wrong_path: (request, callback) => {
              return request
                .then((req) => {
                  expect(req).to.eql('REQUEST');
                  callback(null, { result: ['RESULT'] });
                });
            },
          },
        },
      });

      obj.execute(operations.Operation3, { service: 'my.service.path' })
        .then(() => {
          next('Not supposed to happend');
        }).catch((err) => {
          expect(err).to.be.an.instanceOf(Error);
          expect(err.message).to.eql('Invalid Service');
          expect(operations.Operation3.constructor).to.be.calledOnce;
          expect(soap.createClient).to.be.calledOnce;
          next();
        });
    });

    it('should reject service error', (next) => {
      const obj = new SOAPwebservice({ param: 'my options' });

      sandbox.spy(operations.Operation3, 'constructor');

      sandbox.stub(soap);
      soap.createClient.callsArgWith(1, null, {
        my: {
          service: {
            path: (request, callback) => {
              return request
                .then((req) => {
                  expect(req).to.eql('REQUEST');
                  callback(new Error('Service Error'));
                });
            },
          },
        },
      });

      obj.execute(operations.Operation3, { service: 'my.service.path' })
        .then(() => {
          next('Not supposed to happend');
        }).catch((err) => {
          expect(err).to.be.an.instanceOf(Error);
          expect(err.message).to.eql('Service Error');
          expect(operations.Operation2.constructor).to.be.calledOnce;
          expect(soap.createClient).to.be.calledOnce;
          next();
        });
    });

    it('should reject `operation.getResponse` error', (next) => {
      const obj = new SOAPwebservice({ param: 'my options' });

      sandbox.spy(operations.OperationError3, 'constructor');

      sandbox.stub(soap);
      soap.createClient.callsArgWith(1, null, {
        my: {
          service: {
            path: (request, callback) => {
              return request
                .then((req) => {
                  expect(req).to.eql('REQUEST');
                  callback(null, { result: ['RESULT'] });
                });
            },
          },
        },
      });

      obj.execute(operations.OperationError3, { service: 'my.service.path' })
        .then(() => {
          next('Not supposed to happend');
        }).catch((err) => {
          expect(err).to.be.an.instanceOf(Error);
          expect(err.message).to.eql('getError Error');
          expect(operations.OperationError3.constructor).to.be.calledOnce;
          expect(soap.createClient).to.be.calledOnce;
          next();
        });
    });
  });
});
