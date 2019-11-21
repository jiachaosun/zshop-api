'use strict'

const Controller = require('egg-gat-common-modules').BasicController

class ProductDetail extends Controller {
  constructor(ctx) {
    super(ctx)
    this.productService = ctx.service.product.productService
  }

  async find() {
    const { ctx, productService } = this
    const { params } = ctx
    const { goodsId } = params
    const goodsDetail = await productService.findById(goodsId)
    this.success(goodsDetail)
  }
}

module.exports = ProductDetail
