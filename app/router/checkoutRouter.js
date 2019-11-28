"use strict";

module.exports = app => {
  const { router, controller } = app;
  router.get("/checkout", controller.checkout.checkoutController.checkout);
  router.post("/order/submit", controller.checkout.checkoutController.submitOrder);
};
