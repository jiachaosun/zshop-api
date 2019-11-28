"use strict";

module.exports = app => {
  const { router, controller } = app;
  router.get("/goods/detail", controller.product.productController.getProductDetail);
};
