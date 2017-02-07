'use strict';

const Webservice = require('../index.js').HTTP;

class MyService {
  constructor(options) {
    this.settings = options;
  }

  buildRequest(params) {
  }

  getRequest() {
  }

  getURL() {
    return `https://jsonplaceholder.typicode.com/posts?userId=${this.settings.userId}`;
  }

  getResponse(response) {
    return JSON.parse(response);
  }
};

const webservice = new Webservice({ userId: '1' });

webservice.execute(MyService)
  .then((res) => {
    console.log(res);
    process.exit(1);
  });

