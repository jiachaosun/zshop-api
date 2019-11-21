'use strict'

const Controller = require('egg').Controller

class CheckoutController extends Controller {
  /**
   * 加入购物车
   */
  async checkout() {
    const { ctx } = this
    const { request } = ctx
    const { body } = request

    const checkoutInfo = await this.ctx.service.checkout.getCheckoutInfo()

    ctx.body = {
      code: 0,
      msg: 'ok',
      data: { checkoutInfo },
    }
  }

  async submitOrder() {
    const { ctx } = this
    const { request } = ctx
    const { body } = request

    const {
      cityName,
      countyName,
      detailInfo,
      nationalCode,
      postalCode,
      provinceName,
      telNumber,
      userName,
    } = body

    const address = {
      cityName,
      countyName,
      detailInfo,
      nationalCode,
      postalCode,
      provinceName,
      telNumber,
      userName,
    }

    console.log(address)

    const cartInfo = await ctx.service.checkout.submitOrder(address)

    ctx.body = {
      code: 0,
      msg: 'ok',
      data: {},
    }
  }
}

module.exports = CheckoutController
