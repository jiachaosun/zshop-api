'use strict'

const Controller = require('egg').Controller

class CartController extends Controller {
  /**
   * 加入购物车
   */
  async addCart() {
    const { ctx } = this
    const { request } = ctx
    const { body } = request
    const { specValues, goods_id, goods_no } = body //规格数据
    // const goodsDetail = await ctx.service.product.findById(goodsId)
    ctx.body = {
      code: 0,
      msg: 'ok',
      data: {},
    }
  }
}

module.exports = CartController
