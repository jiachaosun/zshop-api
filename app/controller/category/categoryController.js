"use strict";

const Controller = require("../../core/baseController");

class CategoryController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.productService = ctx.service.product.productService;
    this.categoryService = ctx.service.category.categoryService;
  }

  /**
   * 分类页
   */
  async index() {
    const { ctx, productService } = this;
    const { query } = ctx;
    const { category_id } = query;
    let categoryResult = {};
    if (category_id === "-1") {
      categoryResult = await this.categoryService.getCategoryListAndFirstCategoryProducts();
    } else {
      let products = await this.categoryService.getProductsByCategory(category_id);
      categoryResult = {
        products
      };
    }
    this.success(categoryResult);
  }
}

module.exports = CategoryController;
