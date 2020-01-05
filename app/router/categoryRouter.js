"use strict";

module.exports = app => {
  const { router, controller } = app;
  const categoryController = controller.category.categoryController;
  router.get("/category/list", categoryController.index); //首页
};
