"use strict";

const Controller = require("egg-gat-common-modules").BasicController;

class OrderController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.orderService = ctx.service.order.orderService;
  }

  async list() {
    const { ctx } = this;
    const orders = await this.orderService.list();
    this.success(orders);
  }
}

module.exports = OrderController;
