'use strict'

module.exports = app => {
  const { router, controller } = app
  router.get('/v1/goods/:goodsId', controller.product.productController.find)
}
