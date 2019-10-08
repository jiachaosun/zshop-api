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
    const {
      specValues,
      goods_id,
      goods_no,
      sku_id,
      goods_name,
      price,
      amount,
    } = body //规格数据
    console.log(
      specValues,
      goods_id,
      goods_no,
      sku_id,
      goods_name,
      price,
      amount
    )
    const cartId = await ctx.service.cart.add({
      specValues,
      goods_id,
      goods_no,
      sku_id,
      goods_name,
      price,
      amount,
    })
    ctx.body = {
      code: 0,
      msg: 'ok',
      data: { cartId },
    }
  }
}

module.exports = CartController
