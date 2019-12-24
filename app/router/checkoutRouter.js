"use strict";

module.exports = app => {
  const { router, controller } = app;
  const checkoutController = controller.checkout.checkoutController;
  router.get("/checkout", checkoutController.checkout);
  router.post("/order/submit", checkoutController.submitOrder);
};
