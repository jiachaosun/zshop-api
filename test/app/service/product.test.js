"use strict";

const { app, assert } = require("egg-mock/bootstrap");

describe("test for product service", () => {
  it("获取首页商品数据", async () => {
    const ctx = app.mockContext();
    const homeProductIds = [ 3, 4 ];
    const goods = await ctx.service.product.productService.getHomePageProductList(homeProductIds);
    assert(goods);
  });
});
