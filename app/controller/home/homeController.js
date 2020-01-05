"use strict";

const Controller = require("../../core/baseController");

class HomeController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.productService = ctx.service.product.productService;
    this.homeService = ctx.service.home.homeService;
  }

  /**
   * 首页接口
   */
  async index() {
    const { ctx } = this;
    const homeData = await this.homeService.getHomeData();
    this.success(homeData);
  }
}

module.exports = HomeController;
