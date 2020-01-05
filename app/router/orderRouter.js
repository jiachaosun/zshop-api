"use strict";

module.exports = app => {
  const { router, controller } = app;
  router.get("/order/list", controller.order.orderController.list);
  router.get("/order/detail", controller.order.orderController.detail);
};
