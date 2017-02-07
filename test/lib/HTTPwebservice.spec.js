'use strict';

const _ = require('lodash');
const rewire = require('rewire');
const expect = require('chai').expect;

const HTTPwebservice = rewire('../../lib/HTTPwebservice.js');

const operations = require('./operations');

describe('HTTPwebservice ->', () => {
  it('should be a function', () => {
    expect(HTTPwebservice).to.be.a('function');
  });

  describe('constructor #', () => {
    it('should create HTTPwebservice and set settings as empty object', () => {
      const obj = new HTTPwebservice();

      expect(obj).to.eql({
        settings: { },
      });
    });

    it('should create HTTPwebservice and set settings', () => {
      const obj = new HTTPwebservice({ param1: 'param1', object: { param2: 'param2' }});

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
      const obj = new HTTPwebservice();

      obj.execute(operations.OperationError1)
        .then(() => {
          next('Not supposed to happend');
        })
        .catch((err) => {
          expect(err).to.be.an.instanceOf(Error);
          expect(err.message).to.eql('OperationError constructor');
          next();
        });
    });

    it('should process `Operation1`', (next) => {
      const obj = new HTTPwebservice({ param: 'my options' });

      sandbox.spy(operations.Operation1, 'constructor');

      obj.execute(operations.Operation1, { param: 'my params' })
        .then((res) => {

          expect(res).to.eql({
            userId: 1,
            id: 1,
            title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
            body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
          });
          expect(operations.Operation1.constructor).to.be.calledOnce;
          next();
        })
        .catch(next);
    });

    it('should process `Operation2`', (next) => {
      const obj = new HTTPwebservice({ param: 'my options' });

      sandbox.spy(operations.Operation2, 'constructor');

      obj.execute(operations.Operation2, { param: 'my params' })
        .then((res) => {

          expect(res).to.eql({
            userId: 1,
            id: 1,
            title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
            body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
          });
          expect(operations.Operation2.constructor).to.be.calledOnce;
          next();
        })
        .catch(next);
    });

    it('should process `OperationError2` and catch error', (next) => {
      const obj = new HTTPwebservice({ param: 'my options' });

      sandbox.spy(operations.OperationError2, 'constructor');

      obj.execute(operations.OperationError2, { param: 'my params' })
        .then(() => {
          next('Not supposed to happend');
        })
        .catch((err) => {
          expect(err).to.eql('My error');
          expect(operations.Operation2.constructor).to.be.calledOnce;
          next();
        });
    });

    it('should catch request package error');
  });
});