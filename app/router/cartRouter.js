"use strict";

module.exports = app => {
  const { router, controller } = app;
  router.get("/cart/get_cart", controller.cart.cartController.getCart);
  router.post("/cart/add_cart", controller.cart.cartController.addCart);
};
