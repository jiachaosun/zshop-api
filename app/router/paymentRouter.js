"use strict";

module.exports = app => {
  const { router, controller } = app;
  router.post("/pay/prepay", controller.payment.paymentController.prepay);
  router.post("/pay/notify", controller.payment.paymentController.notifyCallback);
};
