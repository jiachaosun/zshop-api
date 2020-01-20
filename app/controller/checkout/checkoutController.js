"use strict";

const Controller = require("../../core/baseController");

class CheckoutController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.checkoutService = ctx.service.checkout.checkoutService;
  }

  /**
   * 加入购物车
   */
  async checkout() {
    const { ctx } = this;
    const { request } = ctx;
    const params = request.query;

    const checkoutInfo = await this.checkoutService.getCheckoutInfo(params);
    this.success(checkoutInfo);
  }

  /**
   * 提交订单
   */
  async submitOrder() {
    const { ctx } = this;
    const { request } = ctx;
    const params = request.body;
    const orderInfo = await this.checkoutService.submitOrder(params);
    this.success(orderInfo);
  }
}

module.exports = CheckoutController;
