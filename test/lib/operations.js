'use strict';

const expect = require('chai').expect;

class Operation1 {
  constructor(options) {
    expect(options).to.eql({ param: 'my options' });
    this.settings = options;
  }

  buildRequest(params) {
    expect(params).to.eql({ param: 'my params' });
    return Promise.resolve();
  }

  getRequest() {
    return Promise.resolve();
  }

  getURL() {
    return 'https://jsonplaceholder.typicode.com/posts/1';
  }

  getResponse(response) {
    expect(response).that.is.a('string');
    return Promise.resolve(JSON.parse(response));
  }
};

class Operation2 {
  constructor(options) {
    expect(options).to.eql({ param: 'my options' });
    this.settings = options;
  }

  buildRequest(params) {
    expect(params).to.eql({ param: 'my params' });
    return Promise.resolve();
  }

  getRequest() {
    return;
  }

  getURL() {
    return 'https://jsonplaceholder.typicode.com/posts/1';
  }

  getResponse(response) {
    expect(response).that.is.a('string');
    return JSON.parse(response);
  }
};

class Operation3 {
  constructor(options) {
    expect(options).to.eql({ param: 'my options' });
    this.settings = options;
  }

  buildRequest(params) {
    expect(params).to.eql({ service: 'my.service.path' });
    return Promise.resolve();
  }

  getRequest() {
    return Promise.resolve('REQUEST');
  }

  getURL() {
    return 'https://jsonplaceholder.typicode.com/posts/1';
  }

  getResponse(response) {
    expect(response).that.is.a('array');
    expect(response).to.eql(['RESULT'])
    return response[0];
  }
};

class Operation4 {
  constructor(options) {
    expect(options).to.eql({ param: 'my options' });
    this.settings = options;
  }

  buildRequest(params) {
    expect(params).to.eql({ service: 'my.service.path' });
    return '';
  }

  getRequest() {
    return 'REQUEST';
  }

  getURL() {
    return 'https://jsonplaceholder.typicode.com/posts/1';
  }

  getResponse(response) {
    expect(response).that.is.a('array');
    expect(response).to.eql(['RESULT'])
    return response[0];
  }
};

class OperationError1 {
  constructor() {
    throw new Error('OperationError constructor');
  }
};

class OperationError2 {
  constructor(options) {
    expect(options).to.eql({ param: 'my options' });
    this.settings = options;
  }

  buildRequest(params) {
    expect(params).to.eql({ param: 'my params' });
    return Promise.reject('My error');
  }

  getRequest() {
    return;
  }

  getURL() {
    return 'https://jsonplaceholder.typicode.com/posts/1';
  }
};

class OperationError3 {
  constructor(options) {
    expect(options).to.eql({ param: 'my options' });
    this.settings = options;
  }

  buildRequest(params) {
    expect(params).to.eql({ service: 'my.service.path' });
    return Promise.resolve();
  }

  getRequest() {
    return Promise.resolve('REQUEST');
  }

  getURL() {
    return 'https://jsonplaceholder.typicode.com/posts/1';
  }

  getResponse(response) {
    throw new Error('getResponse Error');
  }

  getError(err) {
    expect(err).to.be.an.instanceOf(Error);
    expect(err.message).to.eql('getResponse Error');
    return new Error('getError Error');
  }
};

module.exports = {
  Operation1,
  Operation2,
  Operation3,
  Operation4,
  OperationError1,
  OperationError2,
  OperationError3,
};