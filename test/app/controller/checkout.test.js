'use strict'

const { app, assert } = require('egg-mock/bootstrap')

describe('test/app/controller/checkout.test.js', () => {
  it('should POST /order/submit', () => {
    return (
      app
        .httpRequest()
        .post('/api/order/submit')
        .send({
          cityName: '广州市',
          countyName: '海珠区',
          detailInfo: '新港中路397号',
          errMsg: 'chooseAddress:ok',
          nationalCode: '510000',
          postalCode: '510000',
          provinceName: '广东省',
          telNumber: '020-81167888',
          userName: '张三',
        })
        // .expect('hi, egg')
        .expect(200)
    )
  })
})
