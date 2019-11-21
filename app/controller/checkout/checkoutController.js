'use strict'

const Controller = require('egg-gat-common-modules').BasicController

class CheckoutController extends Controller {
  constructor(ctx) {
    super(ctx)
    this.checkoutService = ctx.service.checkout.checkoutService
  }

  /**
   * 加入购物车
   */
  async checkout() {
    const { ctx } = this
    const { request } = ctx
    const { body } = request

    const checkoutInfo = await this.checkoutService.getCheckoutInfo()

    this.success(checkoutInfo)
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

    const cartInfo = await this.checkoutService.submitOrder(address)

    this.success()
  }
}

module.exports = CheckoutController