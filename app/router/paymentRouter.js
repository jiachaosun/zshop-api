"use strict";

module.exports = app => {
  const { router, controller } = app;
  const paymentController = controller.payment.paymentController;
  router.post("/pay/prepay", paymentController.prepay);
  router.post("/pay/notify", paymentController.notifyCallback);
};
