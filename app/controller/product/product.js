'use strict'

const Controller = require('egg').Controller

class ProductDetail extends Controller {
  async find() {
    const { ctx } = this
    const { params } = ctx
    const { goodsId } = params
    const goodsDetail = await ctx.service.product.findById(goodsId)
    ctx.body = {
      code: 0,
      msg: 'ok',
      data: goodsDetail,
    }
  }
}

module.exports = ProductDetail
