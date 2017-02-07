'use strict';

const _ = require('lodash');
const sinon = require('sinon');
const expect = require('chai').expect;

const webservice = require('../index.js');

describe('Unit Testing', () => {

  beforeEach('create sinon sandbox', () => {
    global.sandbox = sinon.sandbox.create();
  });

  afterEach('restore sinon sandbox and deallocate', () => {
    global.sandbox.restore();

    delete global.sandbox;
  });

  it('should have HTTP and SOAP methods', () => {
    expect(webservice).to.have.all.keys(['HTTP', 'SOAP']);
    expect(webservice.HTTP).to.be.a('function');
    expect(webservice.SOAP).to.be.a('function');
  });

  describe('Lib ->', () => {
    require('./lib/HTTPwebservice.spec.js');
    require('./lib/SOAPwebservice.spec.js');
  });
});
