"use strict";

const Controller = require("egg-gat-common-modules").BasicController;

class ProductController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.productService = ctx.service.product.productService;
  }

  async getProductDetail() {
    const { ctx, productService } = this;
    const { query } = ctx;
    const { goods_id } = query;
    const goodsDetail = await productService.findById(goods_id);
    this.success(goodsDetail);
  }
}

module.exports = ProductController;
