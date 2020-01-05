const Service = require("egg").Service;
const keys = require("lodash/keys");
const isNil = require("lodash/isNil");
const { getHomeConfigData } = require("../../utils/homeDataUtils");

class CategoryService extends Service {
  constructor(ctx) {
    super(ctx);
    this.productService = this.ctx.service.product.productService;
  }

  async getCategoryListAndFirstCategoryProducts() {

    //获取所有分类
    const categoryData = await this.app.mysql.select("zshop_tb_category", {
      where: { parent_category_id: null }
    });

    let products = [];
    if (categoryData.length > 0) {
      // 同时获取第一个分类的商品数据
      const { category_id } = categoryData[0];
      products = await this.productService.getProductsByCategoryId(category_id);
    }

    return {
      category: categoryData,
      products: products
    };
  }

  async getProductsByCategory(categoryId) {
    return this.productService.getProductsByCategoryId(categoryId);
  }

}

module.exports = CategoryService;
