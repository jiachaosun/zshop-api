"use strict";

const Controller = require("../../core/baseController");

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

  async detail() {
    const { ctx } = this;
    const { request } = ctx;
    const { query } = request;
    const detail = await this.orderService.getOrderDetail(query);
    this.success(detail);
  }
}

module.exports = OrderController;
