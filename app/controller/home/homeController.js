"use strict";

const Controller = require("egg-gat-common-modules").BasicController;

class HomeController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.productService = ctx.service.product.productService;
  }

  async index() {
    const { ctx } = this;
    const allProducts = await this.productService.findAll();
    this.success(allProducts);
  }
}

module.exports = HomeController;
