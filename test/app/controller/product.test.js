'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/product.test.js', () => {

  it('should GET /api/goods/:goodsId', () => {
    return app.httpRequest()
      .get('/api/goods/1')
      // .expect('hi, egg')
      .expect(200);
  });
});
