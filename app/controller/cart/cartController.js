"use strict";

const Controller = require("../../core/baseController");

class CartController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.cartService = ctx.service.cart.cartService;
  }

  /**
   * 加入购物车
   */
  async addCart() {
    const { ctx } = this;
    const { request } = ctx;
    const { body } = request;
    const {
      specValues,
      goods_id,
      goods_no,
      sku_id,
      goods_name,
      price,
      amount
    } = body; //规格数据

    const cartId = await this.cartService.add({
      specValues,
      goods_id,
      goods_no,
      sku_id,
      goods_name,
      price,
      amount
    });
    this.success(cartId);
  }

  async getCart() {
    const { ctx } = this;

    const cartInfo = await this.cartService.getCart();
    this.success(cartInfo);
  }

  async updateCart() {
    const { ctx } = this;
    const { request } = ctx;
    const params = request.body;
    await this.cartService.updateCart(params);
    this.success(1);
  }
}

module.exports = CartController;
