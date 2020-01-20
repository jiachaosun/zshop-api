const Service = require("egg").Service;
const keys = require("lodash/keys");
const isNil = require("lodash/isNil");
const { getHomeConfigData } = require("../../utils/homeDataUtils");

const homeProductIds = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ];

class HomeService extends Service {
  constructor(ctx) {
    super(ctx);
    this.productService = this.ctx.service.product.productService;
  }

  async getHomeData() {
    // 获取首页商品数据
    const homeProducts = await this.productService.getHomePageProductList(homeProductIds);

    // 获取首页配置数据
    const homeConfigData = await this.getHomeConfigData();

    return {
      config: homeConfigData,
      products: homeProducts
    };
  }

  async getHomeConfigData() {
    return getHomeConfigData();
  }

}

module.exports = HomeService;
